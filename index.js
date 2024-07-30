const express = require('express')
const cors = require("cors")
require('./db/config')
const Users = require('./db/User')

const app = express()
app.use(cors())
app.use(express.json()) // This middleware is Used for data access


// Create API for SignUp*****************
app.post('/signup', async (req, res) => {
      let user = new Users(req.body);
      let result = await user.save();
      result = result.toObject()
      delete result.password  //delete password from localStorage
      console.log(result);
      
      res.send(result);
})

// Create API for Login*****************
app.post('/login', async (req, res) => {
      if (req.body.password && req.body.email) {
            let user = await Users.findOne(req.body).select("-password")
            console.log(user);
            if (user) {
                  res.send(user)
            } 
            else {
                  res.send({ result: "result not Found" })
            }
      } else {
            res.send({ result: "No User Found" })
      }
})

app.listen(4000, console.log("Server IS RUNNING"))