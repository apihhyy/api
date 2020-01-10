const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const loginModel=require('../db/model/loginModel')

router.post('/login',function(req,res){
  let {username,password}=req.body
  let token=''
  loginModel.find({$and:[{user:username},{pass:password}]}) 
  .then((result)=>{
     if(result.length>=1){
      let _id=result[0]._id
      let ctime = (new Date()).getTime()
      token = jwt.sign({_id:_id},'lihuan19980515') 
      return loginModel.updateMany({_id},{token:token,ctime:ctime})
     }else{
       throw -1
     }
  })
  .then((result)=>{
      res.send({err:0,msg:'登录成功',token:token}) 
  })
  .catch((err)=>{   
      res.send({err:err,msg:'用户名或密码错误'})
  })
})
router.post('/reg',function(req,res){
  let {userName,passWord}=req.body
  loginModel.find({userName})
    .then((data)=>{
      if(data.length>0) {
        throw -2
      }
      return loginModel.insertMany({userName,passWord})
    })
    .then((data)=>{
       res.send({err:0,msg:'注册成功'})
    })
    .catch((err)=>{
      res.send({err:err,msg:'该用户已注册，请直接登陆'})
    })
})
module.exports=router