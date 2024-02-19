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

module.exports={createTeacherController,loginTeacherController};