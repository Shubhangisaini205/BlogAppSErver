const express = require("express");
const { UserModel } = require("../model/UserModel");
const UserRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")

UserRouter.post("/register", async (req, res) => {
    const { username, avatar, email, password }=req.body

    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            const user = new UserModel({username,avatar,email, password:hash})
            await user.save()
            res.status(200).send({msg:"User Registered Successfully"})
        });
    } catch (error) {

      console.log(error)
      console.log("ERRor")
      res.status(400).send({err:error.message})
    }
}
)


UserRouter.post("/login",async(req,res)=>{
  const {email,password}= req.body;
  try {
    const user = await UserModel.findOne({email});
    if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
          if(result){
            var token = jwt.sign({ userId:user._id,username:user.username,avatar:user.avatar}, 'BlogApp');
             res.status(200).send({msg:"Login Successfully",token:token,user:user})
          }else{
            res.status(200).send({msg:"Email and Password mismatch"})
          }
        });
    }else{
        res.status(200).send({msg:"Email is incorrect"})
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).send({err:error.message})
  }
})


module.exports = {
    UserRouter
}