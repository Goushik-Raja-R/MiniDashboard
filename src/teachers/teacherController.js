const teacherService = require('./teacherService');

const createTeacherController = async(req,res)=>{

    try{
        console.log(req.body)
        const status = await teacherService.createTeacherDBservice(req.body);
        console.log(status)
        if(status){
            res.send({"status":true, "message":" User Created Successfully"})
        }else{
            res.send({"status":false, "message":"Error in Creating User"})
        }
    }
    catch(err)
    {
       console.log(err);
    }
}

const loginTeacherController = async(req,res)=>{
    
    var result=null;
    try{
        console.log(req.body)
        result = await teacherService.loginTeacherDBservice(req.body);
        if(result){
            res.send({"status":true, "message": "Valid Teachers Details"})
        }else{
            res.send({"status":false, "message":"Invalid Teachers Details Check Password (or) Email properly"})
        }
    }
    catch(error){
        console.log(error);
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


module.exports={createTeacherController,loginTeacherController,deleteTeacherController};