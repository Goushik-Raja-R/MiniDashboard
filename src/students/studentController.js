const express = require('express')
var studentsService = require('./studentService');
const studentModel = require('../students/studentModel')
const cookieParser = require('cookie-parser')
const uuid = require('uuid').v4
const app = express()
app.use(express.json());
app.use(cookieParser());

// JWT Authorization
// var createstudentsController = async (req, res) => {
//     try {
//         const ExistingStudent = await studentsService.FindStudentbyEmail(req.body.email)  

//         if(ExistingStudent){
//             res.send({"status":false, "message":"Students data is Already Existing in DB"})
//             return;
//         }
//         var status = await studentsService.createUserDBService(req.body);
//         console.log(status)

//        if (status.success) {
//             res.status(201).send({
//                 status: true,
//                 message: 'Student created successfully',
//                 token: status.token
//             });
//             console.log('Student created successfully');
//         } else {
//             res.status(500).send({
//                 status: false,
//                 message: 'Error in Creating Student User',
//                 error: status.error
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({"status": false, "message": "Student data you are trying to inserting is already Existing in DB"});
//     }
// };

//JWT Authentication

var createstudentsController = async (req, res) => {
    try {
        const ExistingStudent = await studentsService.FindStudentbyEmail(req.body.email)  

        if(ExistingStudent){
            res.send({"status":false, "message":"Students data is Already Existing in DB"})
            return;
        }

        var status = await studentsService.createUserDBService(req.body);
        
        if(status){
            res.send({"status":true, "message":" User Created Successfully"})
        }else{
            res.send({"status":false, "message":"Error in Creating Teacher User [Check Your EMAIL or PASSWORD] and Enter details Properply"})
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({"status": false, "message": "Student data you are trying to inserting is already Existing in DB"});
    }
};

const session ={};
var loginstudentsController = async(req,res)=>{
    var result = null;
    try{

        result = await studentsService.loginStudentsDBservice(req.body);
    
        if(result){

            const studentsdetail = await studentModel.findOne({Email:req.body.Email});
            
            if(studentsdetail){
                const sessionid = uuid();
                const SessionData ={Email:studentsdetail.Email,Password:studentsdetail.Password}
                session[sessionid]=SessionData
                res.cookie('session', sessionid, { httpOnly: true });

                res.send({
                    status:true,
                    message:"Cookies created succefully",
                    data:{
                        Firstname:studentsdetail.Firstname,
                        Lastname:studentsdetail.Lastname,
                        Email:studentsdetail.Email,
                    }
                });
            }
        }else{
            res.send({"status":false, "message":"Invalid Teachers Details Check Password (or) Email properly"})
        }
        
    }catch (error){
        res.send({"status":false,"message":"students details invalid"});
    }
}

var CurrentStudent = async (req, res) => {
    const sessionid = req.headers.cookie?.split('=')[1];
    const StudentSession = await session[sessionid];
    
    if (!StudentSession) {
        console.log('Invalid Session'); // Add this log to see if it enters the condition
        return res.status(401).send("User Session is No longer Exist");
    }
     
    const studentEmail =StudentSession.Email;
    const Password = StudentSession.Password;
 
    try{
        const StudentDetail = await studentModel.findOne({Email:studentEmail})
        if(StudentDetail){
            res.send({
                status:true,
                message:"Student Data Reterived Successfully",
                       Firstname:StudentDetail.Firstname,
                       Lastname:StudentDetail.Lastname,
                       Email:StudentDetail.Email
            })
            }
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

var LogoutStudent = async(req,res)=>{

    const sessionid = req.headers.cookie && req.headers.cookie.split('=')[1];
    delete session[sessionid];

    res.cookie('session','',{expires: new Date(0)});
    return res.send('Student Logout successfully');
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


module.exports ={createstudentsController,loginstudentsController,DeletestudentController,showAllStudentsController,CurrentStudent,LogoutStudent};