const mongoose = require('mongoose')
const Schema=mongoose.Schema;
let  orderSchema=new Schema({
     orderId:  {type:String,required:true},
     userName:      {type:String,required:true},
     price:   {type:Number,required:true},
     pay:      {type:String,required:true},
     note:     {type:String,default:''},
     person:      {type:String,required:true},
     address:      {type:String,required:true},
     iphone:      {type:String,required:true},
     product: {type:Array},
    //   {productId: {type:String,required:true},
    //   productName:  {type:String,required:true},
    //   productPic:      {type:String,required:true},
    //   productPrice:   {type:Number,required:true},
    //   productNum:      {type:Number,required:true},
    //   productAllPrice:     {type:String,required:true}
    // }
     time: { type: String, required: true },
 })
var orderModel = mongoose.model('orders',orderSchema) 
module.exports = orderModel