const express = require('express')
const teacherService = require('./teacherService');
const teacherModel = require('../teachers/teacherModel')
const uuid = require('uuid').v4
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json());
app.use(cookieParser());


const createTeacherController = async(req,res)=>{

    try{
        const ExistingTeacher = await teacherService.FindTeacherbyEmail(req.body.email)

        if(ExistingTeacher){
            res.send({"status":false, "message":"Teachers data is Already Existing in DB"})
            return;
        }
        const status = await teacherService.createTeacherDBservice(req.body);
        console.log(status)
        if (status.success){
            res.status(201).send({
                status: true,
                message: 'Teacher created successfully',
                token: status.token
            });
            console.log('Teacher created successfully');
        }else {
            res.status(500).send({
                status: false,
                message: 'Error in Creating Student User',
                error: status.error
            });
        }
     }
    catch(error)
    {
        console.log(error);
        res.status(500).send({"status": false, "message": "Teacher data you are trying to inserting is already Existing in DB"});
    }
}


const session ={};
const loginTeacherController = async(req,res)=>{
    
    var result=null;
    try{
        result = await teacherService.loginTeacherDBservice(req.body);
        if(result){

            const teacherdetail = await teacherModel.findOne({Email:req.body.Email});

            if(teacherdetail){

                const sessionid = uuid();
                const SessionData ={Email:teacherdetail.Email,Password:teacherdetail.Password}
                session[sessionid]=SessionData
                res.cookie('session', sessionid, { httpOnly: true });

                res.send({
                    status:true,
                    message:"Cookies created Successfully",
                    data:{
                        Firstname:teacherdetail.Firstname,
                        Lastname:teacherdetail.Lastname,
                        Email:teacherdetail.Email,
                        Role:teacherdetail.Role,
                    }
                });
            }
        }else{
            res.send({"status":false, "message":"Invalid Teachers Details Check Password (or) Email properly"})
        }
    }
    catch(error){
        res.send({"status":false, "message":error.message})
    }
}

const deleteTeacherController = async(req,res)=>{

    try{
        const email = req.body;
        const status = await teacherService.DeleteteacherDBservice(email)
        if(status){
            res.send({"status":true, "message":"Teacher Data Deleted Successfully"})
        }else{
            res.send({"status":false, "message":"Teacher Data Not found"})
        }
    }
    catch(err){
        console.log(err);
        res.send({"status":false, "message": "Teacher Data Not found or maybe Already deleted"})
    }
}

const showAllTeacherController = async (req, res) => {
    try {
        const AllTeachers = await teacherService.GetAllTeachersService(); 

        if (AllTeachers.length > 0) {
            res.send({ "status": true, "teachers": AllTeachers });
        } else {
            res.send({ "status": false, "message": "No teachers found." });
        }
    } catch (error) {
        console.error("Error in showAllTeacherController:", error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
};


module.exports={createTeacherController,loginTeacherController,deleteTeacherController,showAllTeacherController};

