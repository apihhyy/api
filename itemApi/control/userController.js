const  userModel=require('../db/model/loginModel')
async function  add(userName,passWord,token,ctime){
  // async 函数内部只要不出错 肯定走的是then 如果出错走的是catch
   let result =await userModel.insertMany({userName,passWord,token,ctime})
   console.log(result)
}
async function get(page,pageSize){
  // 获取总的食品数据数组
  let allUsers =await userModel.find()
  // 获取视食品数据 总数量
  let allCount =allUsers.length 
  let users = await userModel.find().skip((page-1)*pageSize).limit(pageSize)
  return  {users,allCount}
}

// 分类查询+分页

// 关键字查询+分页


// 删除
async function del(userId) {
  let result = await userModel.deleteOne({
    _id: userId
  })
  return result
}

// 修改
async function  update(userId,userName,passWord){
  
  let result  = await userModel.updateOne({_id:userId},{userName,passWord})
   console.log(result)
   return  result
}
module.exports={add,get,del,update}