const mongoose = require("mongoose")
var personSchema = new mongoose.Schema({
  email: {
    type  : String,
    required: true 
  },
  passwordHash: { type: String, required: true },
  name: {
      type: String
  },
  edad:{
      type: Number,
      min: 18,
      max: 99
  }

});


module.exports =  personSchema



