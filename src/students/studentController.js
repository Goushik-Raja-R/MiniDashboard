var studentsService = require('./studentService');
const studentModel = require('../students/studentModel')


/*const handleErrors =(error)=>{
    console.log(error.message,error.code);
    let errors ={Email:" ",Password:" "}

    if(error.message && error.message.includes('ValidatorError')){
        Object.values(error.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
            console.log("checking the error message",error.message)
        });
    }else{
        console.log("checking the error message",error.message)
    }

    return errors
}*/

var createstudentsController = async (req, res) => {
    try {
        const ExistingStudent = await studentsService.FindStudentbyEmail(req.body.email)  

        if(ExistingStudent){
            res.send({"status":false, "message":"Students data is Already Existing in DB"})
            return;
        }
        var status = await studentsService.createUserDBService(req.body);

        if (status) {
            res.send({"status": true, "message": "Student created successfully"});
            console.log("Student created successfully")
        } else {
            res.send({"status":false, "message":"Error in Creating Student User [Check Your EMAIL or PASSWORD] and Enter details Properply"})
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
                res.send({
                    status:true,
                    message:"Student details is valid",
                    data:{
                        Firstname:studentsdetail.Firstname,
                        Lastname:studentsdetail.Lastname,
                        Email:studentsdetail.Email,
                    }
                });
            }else{
                res.send({"status":false,"message":"students details  Invalid"});
            }
        }else{
          /* const errors = handleErrors(error)
            res.status(400).json(errors)*/
            res.send({"status":false, "message":"Invalid Teachers Details Check Password (or) Email properly"})
        }
        
    } catch (error){
      /*  const errors = handleErrors(error)
        res.status(400).json(errors)*/
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