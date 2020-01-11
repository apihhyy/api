const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const loginModel=require('../db/model/loginModel')
const User =require('../control/userController')
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

router.post('/user/getUsers',(req,res)=>{
  let page=Number(req.body.page)
  let pageSize=Number(req.body.pageSize)
  User.get(page,pageSize)
  .then((data)=>{
    res.send({err:0,msg:'查询ok',list:data})
  })
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'查询失败'})})
})

router.post('/user/addUser', (req, res) => {
  let {
   userName, passWord,  token, ctime
  } = req.body
  User.add(userName, passWord,  token,  ctime)
  .then((data)=>{res.send({err:0,msg:'添加ok'})})
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'添加失败'})})
})
router.post('/user/delUser', (req, res) => {
  let  {userId}=req.body
  User.del(userId)
  .then((data)=>{
    res.send({err:0,msg:'del ok'})
  })
  .catch((err)=>{ 
    res.send({err:-1,msg:'del nook'})
  })
})
router.post('/user/updateUser', (req, res) => {
  let {userId,userName,passWord} = req.body
  User.update(userId,userName,passWord)
  .then((data)=>{res.send({err:0,msg:'修改ok'})})
  .catch((data)=>{res.send({err:-1,msg:'修改失败'})})
})
module.exports=router