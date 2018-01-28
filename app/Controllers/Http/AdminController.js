'use strict';

const Database = use('Database');

const Student = use('App/Models/Student');
const Questions = use('App/Models/Question');
const Dept = use('App/Models/Department');
const Time = use('App/Models/Time');
const Course = use('App/Models/Course');

const Helpers = use('Helpers');

let csvtojson = require('convert-csv-to-json');

class AdminController {

  /************************* Admin Login *****************************************/

  async login({request, response}){
    const adminDetails = request.only(['email', 'password']);
    let result = {};
    const admin_info = await Database.from('admin')
      .where({'email': adminDetails.email, 'pwd': adminDetails.password});

    if(admin_info.length > 0){
      result = {'data': admin_info, 'success': 1};
    }
    else{
      result = {'message': 'Invalid Login Details. Check details to proceed', 'success': 0};
    }

    return response.json(result)
  }

  async manualquestion({request, response}){
    const data = request.only(['dept', 'course', 'question', 'optA', 'optB', 'optC', 'optD', 'ans', 'level', 'programme']);

    const quest = new Questions();

    quest.dept = data.dept;
    quest.course = data.course;
    quest.question = data.question;
    quest.optA = data.optA;
    quest.optB = data.optB;
    quest.optC = data.optC;
    quest.optD = data.optD;
    quest.ans = data.ans;
    quest.level = data.level;
    quest.programme = data.programme;

    await quest.save();

    return response.status(200).json({'message': 'Question has been saved successfully'});
  }

  async uploadquestion({request, response}){
    const data = request.only(['dept', 'course', 'level', 'programme']);

    const question_file = request.file('question', {
      types: ['file'],
      size: '5mb'
    });

    let tmp_file = `${new Date().getTime()}.${question_file.subtype}`;

    await question_file.move(Helpers.tmpPath('uploads'), {
      name: tmp_file
    });

    let question_json = csvtojson.getJsonFromCsv(Helpers.tmpPath('uploads') + tmp_file);
    for(let i = 0; i < question_json.length; i++){
      const quest = new Questions();
      let single_data = question_json[i];

      quest.dept = data.dept;
      quest.course = data.course;
      quest.question = single_data.question;
      quest.optA = single_data.optA;
      quest.optB = single_data.optB;
      quest.optC = single_data.optC;
      quest.optD = single_data.optD;
      quest.ans = single_data.ans;
      quest.level = data.level;
      quest.programme = data.programme;

      await quest.save();
    }

    return response.status(200).json({'message': 'Data Insertion Successful', 'success': 1})
  }

  async retrievequestion({request, response}){

    const responseDetails = request.only(['course']);

    let result = {};
    let questions = await Database.from('questions').
      where({'course': responseDetails.course});

    if(questions.length > 0){
      result = {'data': questions, 'success': 1};
    }
    else{
      result = {'message': 'No questions was found for the selected course', 'success': 0};
    }

    return response.status(200).json(result)
  }

  async updatequestion({params, request, response}){
    const questionInfo = request.only(['question', 'optA', 'optB', 'optC', 'optD', 'ans']);
    let result = {};

    const quest = await Questions.find(params.id);
    if(!quest){
      result = {'message': 'Unable to delete Question. Reason: Invalid ID', 'success': 0}
    }
    else{
      quest.question = questionInfo.question;
      quest.optA = questionInfo.optA;
      quest.optB = questionInfo.optB;
      quest.optC = questionInfo.optC;
      quest.optD = questionInfo.optD;
      quest.ans = questionInfo.ans;

      await quest.save();

      result = {'message': 'Update Successful', 'success': 1}
    }

    return response.json(result)
  }

  async fileupload({request, response}){
    const file_upload = request.file('myFile', {
      types: ['image'],
      size: '2mb'
    });

    // await file_upload.moveAll(Helpers.tmpPath('uploads'));
    await file_upload.move(Helpers.tmpPath('uploads'), {
      name: 'file.csv'
    });

    return response.json({'message': 'file upload successful', 'success': 1})
  }


  /******************************* Student Details Function ********************************/

  async manualStudent({request, response}){
    const data = request.only(['matric_num', 'surname', 'other_names', 'dept', 'level', 'programme']);

    const student = new Student();
    student.surname = data.surname;
    student.other_names = data.other_names;
    student.dept = data.dept;
    student.matric_num = data.matric_num;
    student.level = data.level;
    student.programme = data.programme;

    await student.save();
    return response.json({'message': 'Success Inserting Student Info', 'success': 1})
  }

  async insertStudent({request, response}){
    const data = request.only(['dept', 'level', 'programme']);

    const student_file = request.file('students', {
      types: ['file'],
      size: '5mb'
    });

    let tmp_file = `${new Date().getTime()}.${student_file.subtype}`;

    await student_file.move(Helpers.tmpPath('uploads'), {
      name: tmp_file
    });

    let student_json = csvtojson.getJsonFromCsv(Helpers.tmpPath('uploads') + tmp_file);

    for(let i = 0; i < student_json.length; i++){
      const student = new Student();
      let single_data = student_json[i];

      student.surname = single_data.surname;
      student.other_names = single_data.other_names;
      student.dept = data.dept;
      student.matric_num = single_data.matric_num;
      student.level = data.level;
      student.programme = data.programme;

      await student.save()
    }

    return response.json({'message': 'Success Inserting Student Info', 'success': 1})
  }

  async retrieveStudent({request, response}){
    const studentInfo = request.only(['dept', 'level', 'programme']);
    let result = {};

    const student_query = Database.from('students')
      .where({'dept':studentInfo.dept, 'level':studentInfo.level, 'programme':studentInfo.programme});

    if(student_query.length > 0){
      result = {'data': student_query, 'success': 1};
    }
    else{
      result = {'message': 'No data was found for the selected Parameters', 'success': 0};
    }

    return response.json(result)
  }

  async allstudent({request, response}){
    let student = await Student.all();
    let result = {};
    if(student.length <= 0){
      result = {'message': 'No Department Uploaded yet', 'success': 0}
    }
    else{
      result = {'data': student, 'success': 1}
    }
    return response.json(result)
  }

  async updateStudent({params, request, response}){
    const studentInfo = request.only(['surname', 'other_names', 'dept', 'matric_num', 'level', 'programme']);
    const student = await Student.find(params.id);
    let result = {};

    if(!student){
      result = {'message': 'No student record was found', 'success': 0}
    }
    else{
      student.surname = studentInfo.surname;
      student.other_names = studentInfo.other_names;
      student.dept = studentInfo.dept;
      student.matric_num = studentInfo.matric_num;
      student.level = studentInfo.level;
      student.programme = studentInfo.programme;

      await student.save();

      result = {'message': 'Update was successful', 'success': 1}
    }

    return response.json(result)
  }

  async insertTime({request, response}){
    const data = request.only(['hr', 'min', 'sec', 'course', 'qtotal']);
    // let result = {};

    let time_data = await Time.find(data.course);

    if(!time_data){
      time_data = new Time()
    }

    let hr = parseInt(data.hr.toString());
    let min = parseInt(data.min.toString());
    let sec = parseInt(data.sec.toString());

    let total_sec = ((hr * 3600) + (min * 60) + sec);

    time_data.tme = total_sec;
    time_data.course = data.course;
    time_data.qtotal = data.qtotal;

    await time_data.save();

    return response.json({'message': 'Success Inserting into Database', 'success': 1})
  }

  async retrieveTime({request, response}){
    let data = request.only(['course']);
    let time_data = await Database.from('times')
      .where({'course': data.course});
    let result = {};

    // console.log(time_data);

    if(time_data.length <= 0){
      result = {'message': 'Unable to retrieve result. Not yet updated', 'success': 0};
    }
    else{

      let total_sec = parseInt(time_data[0].tme.toString());
      let hrs = Math.floor( total_sec / 3600);
      total_sec %= 3600;
      let min = Math.floor(total_sec / 60);
      let sec = total_sec % 60;

      result = {'data': time_data, 'time': {'hr': hrs, 'min': min, 'sec': sec}, 'success': 1};
    }

    return response.json(result);
  }

  async insertDept({request, response}) {
    let dept = request.only(['dept'])

    let dept_data = await Database.from('departments')
      .where({'dept': dept.dept});
    if (dept_data.length <= 0) {
      dept_data = new Dept();
    }

    dept_data.dept = dept.dept;

    await dept_data.save();
    return response.json({'message': 'Department Update successful', 'success': 1, 'data': dept})
  }

  async retrieveDept({request, response}){
    let dept = await Dept.all();
    let result = {}
    if(dept.length <= 0){
      result = {'message': 'No Department Uploaded yet', 'success': 0}
    }
    else{
      result = {'data': dept, 'success': 1}
    }
    return response.json(result)
  }

  async giveTime({request, response}){
    let data = request.only(['matric_num', 'course', 'level', 'programme', 'time']);

    const affected_rows = await Database.table('user_logs')
      .where({'matric_num': data.matric_num, 'course': data.course, 'level': data.level, 'programme': data.programme})
      .update({'time_remain': data.time, 'status': 0});

    if(affected_rows > 0){
      return response.json({'message': 'Time has been updated successfully', 'success': 1})
    }
    else{
      return response.json({'message': 'An Error Occurred assigning time', 'success': 0})
    }
  }

  async courses({request, response}){
    let data = request.only(['title', 'code', 'dept', 'level', 'programme']);

    let course_data = await Course.find(data.code);
    if(!course_data){
      course_data = new Course();
    }

    course_data.title = data.title;
    course_data.code = data.code;
    course_data.dept = data.dept;
    course_data.level = data.level;
    course_data.programme = data.programme

    await course_data.save();

    return response.json({'message': 'Course Details Updated Successfully', 'success': 1, 'data': course_data})
  }

  async retrievecourse({request, response}){
    let course = await Course.all();
    return response.json({'data': course, 'success': 1})
  }

  async retrievecoursesingle({request, response}){
    let data = request.only(['dept', 'programme', 'level'])
    let result = {}

    const course_data = await Database.from('courses')
      .where({'dept': data.dept, 'programme': data.programme, 'level': data.level})

    if(course_data.length > 0){
      result = {'data': course_data, 'success': 1}
    }
    else{
      result = {'message': 'No course was found', 'success': 0}
    }

    return response.json(result)
  }

}

module.exports = AdminController;
