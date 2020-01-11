const express = require('express')
const router = express.Router()
const shopModel=require('../db/model/shopModelControl')

//添加数据
router.post('/addFood',(req,res)=>{
  let {name,price,img,foodType,desc} = req.body 
  shopModel.add(name,price,img,foodType,desc)
  .then((data)=>{res.send({err:0,msg:'添加ok'})})
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'添加失败'})})
})
//查询接口（分页查询  分类查询 关键字查询）
router.post('/getFoods',(req,res)=>{
  let page=Number(req.body.page)||1
  let pageSize=Number(req.body.pageSize)||2
  shopModel.get(page,pageSize)
  .then((data)=>{
    res.send({err:0,msg:'查询ok',list:data})
  })
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'查询失败'})})
})
// 分类查询
router.post('/getFoodsByType',(req,res)=>{
  let {foodType} = req.body
  let page=Number(req.query.page)||1
  let pageSize = Number(req.query.pageSize)||2
  shopModel.getByType(foodType,page,pageSize)
  .then((data)=>{
    res.send({err:0,msg:'查询ok',list:data})
  })
})
// 关键字查询
router.post('/getFoodsByKw',(req,res)=>{
  let page=Number(req.query.page)||1
  let pageSize = Number(req.query.pageSize)||2
  let kw = req.body.kw 
  shopModel.getByKw(kw,page,pageSize)
  .then((data)=>{
    res.send({err:0,msg:'ok',list:data})
  })
})
//删除接口
router.post('/delFood',(req,res)=>{
  let  {foodId}=req.body
  shopModel.del(foodId)
  .then((data)=>{
    res.send({err:0,msg:'del ok'})
  })
  .catch((err)=>{ 
    res.send({err:-1,msg:'del nook'})
  })
})
//修改 
router.post('/updateFood',(req,res)=>{
  let {foodId,name,price,img,foodType,desc} = req.body
  shopModel.update(foodId,name,price,img,foodType,desc)
  .then((data)=>{res.send({err:0,msg:'修改ok'})})
  .catch((data)=>{res.send({err:-1,msg:'修改失败'})})
})
module.exports=router