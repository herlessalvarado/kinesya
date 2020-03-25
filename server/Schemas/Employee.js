
const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    profilePhoto: {
        type: String
    },
    referencePhotos:[String],
    description :{
        type: String
    },
    price: {
        type: Number,
        min: 0
    },
    longitude:{
        type: String
    },
    latitude:{
        type: String
    }    
    });
module.exports = employeeSchema;
