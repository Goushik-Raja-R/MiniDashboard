const teacherModel = require('./teacherModel');
const key = '123456789mairuuu';
const encryptor = require('simple-encryptor')(key);


module.exports.createTeacherDBservice = async (teacherDetails)=>{

       try{
        const TeachersData = new teacherModel();

        TeachersData.Firstname = teacherDetails.Firstname;
        TeachersData.Lastname = teacherDetails.Lastname;
        TeachersData.Email = teacherDetails.Email;
        TeachersData.Password = teacherDetails.Password;
        const encrypted = encryptor.encrypt(teacherDetails.Password);
        TeachersData.Password=encrypted;
        TeachersData.Role = teacherDetails.Role;

        await TeachersData.save();
        return true;
        }

    catch(error)
    {
       console.log("There is an error in createTeacherDbservice",error)
       return false;
    }
}
       // return TeachersData;


module.exports.loginTeacherDBservice = async(details)=>{

    try{
        const result = await teacherModel.findOne({Email:details.Email});

        if(result!==null)
        {
            var decryptor = encryptor.decrypt(result.Password)
            if(decryptor===details.Password)
            {
                console.log("Teachers Details are valid")
                return true;
            }
            else{
                console.log("Teachers Invalid details")
                return false
            }
        }
        else{
            console.log("Invalid details")
                return false
        }
    }
    catch(error){
    console.log(error)
    }
}