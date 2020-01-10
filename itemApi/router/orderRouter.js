const express = require('express')
const router = express.Router()
const orderModel=require('../db/model/orderModel')
router.post('/getOrder',function(req,res){
  let page=Number(req.body.page)||1
  let pagesize=Number(req.body.pagesize)||3
  let count=0
  orderModel.find()
  .then((data)=>{
    count=data.length
    return orderModel.find().skip((page-1)*pagesize).limit(pagesize)
  })
  .then((data)=>{
    res.send({err:0,msg:'分页成功',list:data,tolcount:count})
  })
})
router.post('/addOrder',function(req,res){
  let {orderId,userName,price,pay,note,person,address,iphone,product,time} = req.body
  orderModel.insertMany({orderId,userName,price,pay,note,person,address,iphone,product,time})
  .then((data)=>{
    res.send({err:0,msg:'订单添加成功',list:data})
  })
})

router.post('/delOrder',function(req,res){
  let {id} = req.body
  orderModel.findOneAndDelete({_id:id})
  .then((data)=>{
    res.send({err:0,msg:'订单删除成功'})
  })
})
router.post('/selectDelOrder',function(req,res){
  let {ids} = req.body
  orderModel.deleteMany({_id:{$in:ids}})
  .then((data)=>{
    res.send({err:0,msg:'订单删除成功'})
  })
  .catch((err) => {
    res.send({err:err,msg:'失败'})
  })
})
router.post('/findOneOrder',function(req,res){ 
  let orderId = req.body.orderId||''
  let iphone = req.body.iphone||''
  let person = req.body.person||''
  let time = ''
  if(req.body.time){
    time = {$regex:req.body.time}
  }else{
    time = ''
  }
  let page=Number(req.body.page)||1
  let pagesize=Number(req.body.pagesize)||3
  let count=0
  orderModel.find({$or:[{orderId},{$or:[{iphone},{person}]},{time:time}]})
  .then((data) => {
    count=data.length
    return orderModel.find({$or:[{orderId},{$or:[{iphone},{person}]},{time:time}]}).skip((page-1)*pagesize).limit(pagesize)
  })
  .then((data) => {
    res.send({err:0,msg:'查询成功',list:data,tolcount:count})
  })
})
router.post('/findOrder',function(req,res){ 
  let orderId = req.body.orderId||''
  let iphone = req.body.iphone||''
  let person = req.body.person||''
   let time = req.body.time||''
   let regex = new RegExp(time)
  let page=Number(req.body.page)||1
  let pagesize=Number(req.body.pagesize)||2
  let count=0
  let a = {$or:[{iphone},{person}]}
  let b = {time:{$regex:regex}}
  orderModel.find({$or:[{$and:[a,b]},{$and:[{orderId},b]},{$and:[a,{orderId}]},{$and:[{orderId},a,b]}]})
  .then((data) => {
    count=data.length
    return orderModel.find({$or:[{$and:[a,b]},{$and:[{orderId},b]},{$and:[a,{orderId}]},{$and:[{orderId},a,b]}]}).skip((page-1)*pagesize).limit(pagesize)
  })
  .then((data) => {
    res.send({err:0,msg:'查询成功',list:data,tolcount:count})
  })
})
router.post('/updateOrder',function(req,res){
  let {_id,note,pay} = req.body
  orderModel.updateOne({_id},{note,pay})
  .then((data)=>{
    res.send({err:0,msg:'订单修改成功',list:data})
  })
})
module.exports=router