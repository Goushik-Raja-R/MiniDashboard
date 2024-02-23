const mongoose = require('mongoose');
var schema = mongoose.Schema;

const studentsSchema = new schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Students', studentsSchema);
