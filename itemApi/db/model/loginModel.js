const mongoose = require('mongoose')
let loginSchema = mongoose.Schema({
  userName:{type:String,required:true},
  passWord:{type:String,required:true},
  token:{type:String,default:''},
  ctime:{type:String,default:0}
})
var loginModel = mongoose.model('admins',loginSchema) 
module.exports = loginModel