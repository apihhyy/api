const express = require('express')
const router =express.Router()
const RoleModel = require('../db/model/roleModel')
// 获取用户列表
router.post('/getRoles', (req, res) => {
  RoleModel.find()
    .then(roles => {
      res.send({status: 0, data: roles})
    })
    .catch(error => {
      console.error('获取用户列表异常', error)
      res.send({status: 1, msg: '获取用户列表异常, 请重新尝试'})
    })
})
// 添加用户
router.post('/add', (req, res) => {
  const {roleName} = req.body
  RoleModel.insertMany({name: roleName})
    .then(role => {
      res.send({status: 0, data: role})
    })
    .catch(error => {
      console.error('添加用户异常', error)
      res.send({status: 1, msg: '添加用户异常, 请重新尝试'})
    })
})

// 更新用户(设置权限)
router.post('/update', (req, res) => {
  const role = req.body
  role.auth_time = Date.now()
  RoleModel.findOneAndUpdate({_id: role._id}, role)
    .then(oldRole => {
      // console.log('---', oldRole._doc)
      res.send({status: 0, data: {...oldRole._doc, ...role}})
    })
    .catch(error => {
      console.error('更新用户异常', error)
      res.send({status: 1, msg: '更新用户异常, 请重新尝试'})
    })
})

router.post('/del', (req, res) => {
  let  {roles_id}=req.body
  RoleModel.deleteOne({_id:roles_id})
  .then((role)=>{
    res.send({status:0,data:role})
  })
  .catch((error)=>{ 
    console.error('删除角色异常', error)
    res.send({status:1,msg:'del nook'})
  })
})
module.exports=router