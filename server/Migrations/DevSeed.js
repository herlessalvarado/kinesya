 "use strict"
  const mongoose = require('mongoose')
  const UserRepository = require("../Repository/UserRepository")
 var Users = [
     new UserRepository ({email:"jose@hotmail.com",password:"ufdndhq223",name:"Jose",age:20}),
     new UserRepository ({email:"jerles@hotmail.com",password:"ufdn223",name:"Herles",age:20}),
     new UserRepository ({email:"CC@hotmail.com",password:"ufdn223",name:"Carlos",age:40})
 ]

 module.exports.init = async ()=>{
     var connected = await mongoose.connect(process.env.DBTest, { useUnifiedTopology: true, useNewUrlParser: true  })
     let resultados = await UserRepository.insertMany(Users,{ordered:true})
     console.log(resultados)
     connected.connection.close()
 }


