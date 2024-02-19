const express = require('express');
const router = express.Router();

const teacherController = require('../src/teachers/teacherController');

router.route('/teachers/create').post(teacherController.createTeacherController);
router.route('/teachers/login').post(teacherController.loginTeacherController);

module.exports=router;
