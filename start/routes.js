'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');

Route.group(() => {
  Route.get('/', 'StudentController.login');
  Route.get('question', 'StudentController.question');
  Route.put('update', 'StudentController.update');
  Route.put('submit', 'StudentController.submit');

  Route.get('login', 'AdminController.login');

  Route.post('question/manual', 'AdminController.manualquestion');
  Route.post('question/auto', 'AdminController.uploadquestion');
  Route.get('question/retrieve', 'AdminController.retrievequestion');
  Route.put('question/update/:id', 'AdminController.updatequestion');

  Route.post('student/manual', 'AdminController.manualStudent');
  Route.post('student/auto', 'AdminController.insertStudent');
  Route.get('student/retrieve', 'AdminController.retrieveStudent');
  Route.put('student/update/:id', 'AdminController.updateStudent');
  Route.get('student/retrieve/all', 'AdminController.allstudent');

  Route.post('time/insert', 'AdminController.insertTime');
  Route.get('time/retrieve', 'AdminController.retrieveTime');
  Route.get('time/give', 'AdminController.giveTime');

  Route.post('dept/insert', 'AdminController.insertDept');
  Route.get('dept/retrieve', 'AdminController.retrieveDept');

  Route.post('upload', 'AdminController.fileupload');

  Route.post('course', 'AdminController.courses');
  Route.get('course/retrieve', 'AdminController.retrievecourse');
  Route.get('course/retrieve/single', 'AdminController.retrievecoursesingle')
}).prefix('api/v1');


// Route.get('/', ({ request }) => {
//   return { greeting: 'Hello world in JSON' }
// })
