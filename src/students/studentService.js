var studentsmodel =require('./studentModel');
var key ='123456789112345dfg';
var encryptor = require('simple-encryptor')(key);
const jwt = require('jsonwebtoken')

const GenerateToken =(Email)=>{
    return jwt.sign({Email},'Secret-key',{
        expiresIn:'1h'
    })
}

//JWT Authentication
module.exports.createUserDBService =async (studentsDetails)=>{
 
    try{
    var studentsModelData = new studentsmodel();

    studentsModelData.Firstname = studentsDetails.Firstname;
    studentsModelData.Lastname = studentsDetails.Lastname;
    studentsModelData.Email = studentsDetails.Email;
    studentsModelData.Password = studentsDetails.Password;
    var encrypted= encryptor.encrypt(studentsDetails.Password);
    studentsModelData.Password = encrypted;

    await studentsModelData.save();
    return true;
    }
    catch(error){
        console.log(Object.values(error.errors.properties));
        return false;
    }
    
}


// //JWT Authorization
// module.exports.createUserDBService =async (studentsDetails)=>{
 
//     try{
//     var studentsModelData = new studentsmodel();

//     studentsModelData.Firstname = studentsDetails.Firstname;
//     studentsModelData.Lastname = studentsDetails.Lastname;
//     studentsModelData.Email = studentsDetails.Email;
//     studentsModelData.Password = studentsDetails.Password;
//     var encrypted= encryptor.encrypt(studentsDetails.Password);
//     studentsModelData.Password = encrypted;
//     const token = GenerateToken(studentsDetails.Email)
//     await studentsModelData.save();
//     return {success:true,token};
//     }
//     catch(error){
//         console.log(Object.values(error.errors.properties));
//         return false;
//     }
    
// }


module.exports.FindStudentbyEmail = async(email)=>{

   const response = await studentsmodel.findOne({Email:email}).exec()
   if(response && response.length>0)
   return response;
   else
   return null;
}


module.exports.loginStudentsDBservice = async (studentsDetails)=>
{
    try
    {
       const result= await studentsmodel.findOne({ Email: studentsDetails.Email})
        {
                if(result !==undefined && result !==null)
                {
                    var decrypted = encryptor.decrypt(result.Password);

                    if(decrypted === studentsDetails.Password)
                    {
                        console.log("student validated successfully");
                        return true
                    }
                    else{
                        console.log("student validated failed");
                        return false
                    }
                }
                else{
                    console.log("invalid students detailsssss");
                    return false
                }
            }
        }
    catch(err){
        console.log(err)
    }
}

module.exports.deleteStudentData = async(StudentData)=>{

    try{
        const detelteStudent = await studentsmodel.findOneAndDelete({Email:StudentData.Email})
        console.log(detelteStudent)
        if(detelteStudent){
            console.log("Student data deleted Successfully")
            return true;
        }else{
            console.log("Student data not found (or) Maybe already delted")
            return false;
        }
    }
    catch(error){
        console.log("No student data found",error);
        return false;
    }

}

module.exports.showAllStudentsData = async()=>{
    try{
        const Allstudents = await studentsmodel.find();
        return Allstudents;

    }catch(error){
        console.log("There is No data in DataBase",error)
        return false;
    }
}
