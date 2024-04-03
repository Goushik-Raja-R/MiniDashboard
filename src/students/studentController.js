const express = require('express')
var studentsService = require('./studentService');
const studentModel = require('../students/studentModel')
const cookieParser = require('cookie-parser')
const uuid = require('uuid').v4
const app = express()
app.use(express.json());
app.use(cookieParser());

// JWT Authorization
var createstudentsController = async (req, res) => {
    try {
        const ExistingStudent = await studentsService.FindStudentbyEmail(req.body.email)  
 
        if(ExistingStudent){
            res.send({"status":false, "message":"Students data is Already Existing in DB"})
            return;
        }
        const status = await studentsService.createUserDBService(req.body);

       if (status.success) {
            res.status(201).send({
                status: true,
                message: 'Student created successfully',
                token: status.token
            });
            console.log('Student created successfully');
        } else {
            res.status(500).send({
                status: false,
                message: 'Error in Creating Student User',
                error: status.error
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({"status": false, "message": "Student data you are trying to inserting is already Existing in DB"});
    }
};

var loginstudentsController = async(req,res)=>{
    var result = null;
    try{

        result = await studentsService.loginStudentsDBservice(req.body);
    
        if(result){

            const studentsdetail = await studentModel.findOne({Email:req.body.Email});
            
            if(studentsdetail){
                res.status(200).json({
                    status: true,
                    message: 'Student authenticated successfully',
                    data: {
                        Firstname: studentsdetail.Firstname,
                        Lastname: studentsdetail.Lastname,
                        Email: studentsdetail.Email,
                        Role: studentsdetail.Role,
                    }
                });
            
        }}else{
            res.send({"status":false, "message":"Invalid Teachers Details Check Password (or) Email properly"})
        } 
    }catch (error){
        res.send({"status":false,"message":"students details invalid"});
    }
}

var DeletestudentController = async(req,res)=>{

    try{
        const email = req.body;
        const status = await studentsService.deleteStudentData(email);
        if(status){
            res.send({"status":true, "message":"Student details Deleted"})
        }else{
            res.send({"status":false, "message":"No student Data Found"})
        }
    }
    catch(error){
        res.send({"status":false, "messgae":"Student detailos not found or already deleted"})
        console.log(error);
    }
}

var showAllStudentsController = async(req,res)=>{
    try{
        const Allstudents = await studentsService.showAllStudentsData();

        if(Allstudents.length >0){
            res.send({"status":true, "message":Allstudents});
            return true;
        }else{
            res.send({"status":false, "message":"There is no data in DB"})
            return false;
        }
    }catch(error)
    {
        res.send({"status":false, "message":"There is no data in Database",error})
        return false;
    } 
}


module.exports ={createstudentsController,loginstudentsController,DeletestudentController,showAllStudentsController};