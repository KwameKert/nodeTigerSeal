
const express = require('express')
const app = express()
const cors = require('cors')

require('./db/mongoose.js')

//defining routes here
const userRouter = require('./router/user')

//defining cors here
app.options('*', cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE, OPTIONS');
  next();
});


app.use(express.json())
app.use(userRouter)


module.exports = app
