'use strict';

const  Database = use('Database');
const Student = use('App/Models/Student');
const TmpQuestion = use('App/Models/TmpQuestion');
const UserLogs = use('App/Models/UserLog');

class StudentLoginController {

  /***************** Student Login *************************/

   async login({request, response}) {
    const studentInfo = request.only(['surname', 'matric_num']);
    let result = {};

    const student_info = await Database.from('students')
      .where({'surname': studentInfo.surname, 'matric_num': studentInfo.matric_num});

    // console.log(student_info.length)

    if (student_info.length > 0) {
      result = {'data': student_info, 'success': 1};
    }
    else {
      result = {'message': 'Invalid Login. Check your Login Credentials to continue', 'success': 0};
    }

    return response.json(result)
  }

  /********************* Function to load question for student ******************************/

  async question({request, response}){
     const requestInfo = request.only(['course', 'level', 'programme', 'matric_num']);

     let result = {};

     //Get duration exam would take
     const time_query = await Database.from('times')
       .where({'course': requestInfo.course});

     //Check if Admin has set Duration
     if(time_query.length <= 0){
       return response.json({'message': 'Contact Administrator in order to start your exam', 'success': 0})
     }
     else {
      //Check User Log if User has logged in before
       const user_log = await Database.from('user_logs')
         .where({'matric_num': requestInfo.matric_num, 'course': requestInfo.course, 'level': requestInfo.level,
         'programme': requestInfo.programme});

       if(user_log.length > 0){
         //check status if user has completed Exam
         if(user_log[0].status === 1){
           return response.json({'message': 'You have already completed the exam. Please Leave the Hall', 'success': 0})
         }
         else {

           const tmp_result = await Database.from('tmp_questions')
             .where({'questions.course': requestInfo.course, 'questions.level': requestInfo.level, 'questions.programme': requestInfo.programme})
             .innerJoin('questions', 'tmp_questions.question_id', 'questions.id');

           let total_sec = parseInt(user_log[0].time_remain.toString());
           let hrs = Math.floor( total_sec / 3600);
           total_sec %= 3600;
           let min = Math.floor(total_sec / 60);
           let sec = total_sec % 60;

           for (let i = 0; i < tmp_result.length; i++){
             tmp_result[i]['correct_answer'] = "";
             tmp_result[i]['ans'] = "";
           }

           result = {'data': tmp_result, 'time': {'hh': hrs, 'mm': min, 'ss': sec}, 'success': 2}
         }
       }
       else {

         const result_query = await Database.from('questions')
           .where({'course': requestInfo.course, 'level': requestInfo.level, 'programme': requestInfo.programme})
           .orderByRaw('RAND()').limit(time_query[0].qtotal);

         if (result_query.length > 0) {
           let total_sec = parseInt(time_query[0].tme);
           let hrs = Math.floor( total_sec / 3600);
           total_sec %= 3600;
           let min = Math.floor(total_sec / 60);
           let sec = total_sec % 60;


           for (let i = 0; i < result_query.length; i++) {

             const tmpquestion = new TmpQuestion();

             tmpquestion.matric_num = requestInfo.matric_num;
             tmpquestion.question_id  = result_query[i].id;
             tmpquestion.answer = "";
             tmpquestion.correct_answer = result_query[i].ans;
             tmpquestion.level = requestInfo.level;
             tmpquestion.programme = requestInfo.programme;
             tmpquestion.course = requestInfo.course;

             await tmpquestion.save();
             result_query[i].ans = "";
           }
           result = {'data': result_query, 'time': {'hrs': hrs, 'min': min, 'sec': sec}, 'success': 1};

           const userlog = new UserLogs();

           userlog.matric_num = requestInfo.matric_num;
           userlog.status = 0;
           userlog.time_remain = time_query[0].tme;
           userlog.course = requestInfo.course;
           userlog.level = requestInfo.level;
           userlog.programme = requestInfo.programme;

           await userlog.save()
         }
         else {
           result = {'message': "No Exam Yet for you", 'success': 0}
         }
       }

       return response.json(result)
     }
  }

  /********************** Function for Updating tmp_question and UserLog ********************/

  async update({request, response}){
    const updateInfo = request.only(['time', 'matric_num', 'course', 'level', 'programme', 'question_id', 'selected_answer']);


    let res = JSON.parse((updateInfo.time).toString());
    // console.log(res);

    let hr = parseInt(res.hrs.toString());
    let min = parseInt(res.min.toString());
    let sec = parseInt(res.sec.toString());

    let total_sec = ((hr * 3600) + (min * 60) + sec);

    const affected_rows = await Database.table('user_logs')
      .where({'matric_num': updateInfo.matric_num, 'course': updateInfo.course, 'level': updateInfo.level,
      'programme': updateInfo.programme})
      .update('time_remain', total_sec.toString());

    const affected_row2 = await Database.table('tmp_questions')
      .where({'matric_num': updateInfo.matric_num, 'course': updateInfo.course, 'level': updateInfo.level,
        'programme': updateInfo.programme})
      .update('answer', updateInfo.selected_answer);

    if(affected_row2 > 0 && affected_rows > 0){
      return response.json({'message': 'Update successful', 'success': 1})
    }
    else{
      return response.json({'message': 'An error occurred.', 'success': 0})
    }
  }

  async submit({request, response}){
    const submit_info = request.only(['matric_num', 'course', 'level', 'programme']);

    const affected_row = await Database.table('user_logs')
      .where({'matric_num': submit_info.matric_num, 'course': submit_info.course, 'level': submit_info.level,
        'programme': submit_info.programme})
      .update('status', 1);

    if(affected_row > 0){
      return response.json({'message': 'Submission Successful', 'success': 1})
    }
    else{
      return response.json({'message': 'An error occurred submitting', 'success': 0})
    }
  }

}

module.exports = StudentLoginController;
