const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser: true,useUnifiedTopology: true } )
const db = mongoose.connection
db.on('open', function(){
  console.log('MongoDB Connection Successed');
});
db.on('error', function(){
  console.log('MongoDB Connection Error');
});


