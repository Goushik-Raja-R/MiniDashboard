const express = require('express');
const router = express.Router();

const teacherController = require('../src/teachers/teacherController');
const studentController = require('../src/students/studentController')
//TEACHERS
router.route('/teachers/create').post(teacherController.createTeacherController);
router.route('/teachers/login').post(teacherController.loginTeacherController);
router.route('/teachers/delete').delete(teacherController.deleteTeacherController);
router.route('/teachers/get').get(teacherController.showAllTeacherController);

//STUDENTS
router.route('/students/create').post(studentController.createstudentsController);
router.route('/students/login').post(studentController.loginstudentsController);
router.route('/students/delete').delete(studentController.DeletestudentController);
router.route('/students/get').get(studentController.showAllStudentsController);


module.exports=router;
<<<<<<< HEAD

=======
console.log('End')
>>>>>>> d5d9571ec54e58a0615b6b3218598bccdb588964
