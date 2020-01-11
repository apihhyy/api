const express = require('express')
const path=require('path')
const app = express()
const db = require('./db/connect')
const bodyParser = require('body-parser')
const adminRouter = require('./router/adminRouter')
const orderRouter = require('./router/orderRouter')
const shopRouter = require('./router/shopRouter')
const loginModel = require('./db/model/loginModel')
const jwt = require('jsonwebtoken')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))
app.use('/admin',adminRouter)
app.use('/order',(req,res,next)=>{
   let token = req.body.token
   if(!token){
      res.send({err:-999,msg:'token缺失'})
      return false
   }
   jwt.verify(token,'lihuan19980515',(err,data)=>{
      if(err){
         res.send({err:-998,msg:'token非法'})
      }else{
       let _id = data._id
      loginModel.find({_id,token})
       .then((data)=>{
          if(data.length>=1){
            let time = (new Date()).getTime()-data[0].ctime
            if(time>1000*60*60){
               res.send({err:-997,msg:'token超时'})
            }else{
               next()
            }
          }else{
            res.send({err:-996,msg:'token失效'})
          }
       })
      }
   }) 
},
orderRouter)
app.use('/shop',(req,res,next)=>{
   let token = req.body.token
   if(!token){
      res.send({err:-999,msg:'token缺失'})
      return false
   }
   jwt.verify(token,'lihuan19980515',(err,data)=>{
      if(err){
         res.send({err:-998,msg:'token非法'})
      }else{
         next()
      }
   }) 
},
shopRouter)
app.use('/role',(req,res,next)=>{
   let token = req.body.token
   if(!token){
      res.send({err:-999,msg:'token缺失'})
      return false
   }
   jwt.verify(token,'lihuan19980515',(err,data)=>{
      if(err){
         res.send({err:-998,msg:'token非法'})
      }else{
         next()
      }
   }) 
},
roleRouter)
app.listen(3003,function(){
   console.log('服务启动成功')
})

