const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    dob: {
        type:String,
        required: true
    },
    country:{
        type: String,
        required:true
    }

})


const Record = mongoose.model('Record', contactSchema);

module.exports = Record;