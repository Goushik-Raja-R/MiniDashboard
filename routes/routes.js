const express = require('express');
const router = express.Router();

const teacherController = require('../src/teachers/teacherController');
const studentController = require('../src/students/studentController');
const {Authentication,VerifyTokenHandler,RoleCheck} = require('../middleware/auth')

//TEACHERS
router.route('/teachers/create').post(teacherController.createTeacherController);
router.route('/teachers/login').post(RoleCheck(),teacherController.loginTeacherController);
router.route('/teachers/delete').delete(teacherController.deleteTeacherController);
router.route('/teachers/get').get(teacherController.showAllTeacherController);
router.route('/verifytoken/get').get(Authentication,VerifyTokenHandler);

//STUDENTS
router.route('/students/create').post(studentController.createstudentsController);
router.route('/students/login').post(RoleCheck(),studentController.loginstudentsController);
router.route('/students/delete').delete(studentController.DeletestudentController);
router.route('/students/get').get(studentController.showAllStudentsController);
router.route('/verifytoken/get').get(Authentication,VerifyTokenHandler);


module.exports=router;