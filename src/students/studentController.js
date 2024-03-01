var studentsService = require('./studentService');


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
        res.status(500).send({"status": false, "message": "Internal Server Error"});
    }
};


var loginstudentsController = async(req,res)=>{
    var result = null;
    try{
        console.log(req.body)
        result = await studentsService.loginStudentsDBservice(req.body);
        if(result){
            res.send({"status":true,"message":"students details valid"});
        }else{
            res.send({"status": true,"message": "students details valid"});
        }
    } catch (error){
        console.log(error);
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