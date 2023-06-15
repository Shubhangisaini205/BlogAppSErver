const express = require("express");
const { BlogModel } = require("../model/BlogModel");
const { AuthMiddleWare } = require("../Middleware/Auth.middleware");
const BlogRouter = express.Router();

BlogRouter.post("/",AuthMiddleWare, async(req,res)=>{
  try {
     const blog = new BlogModel(req.body);
     await blog.save();
     res.status(200).send({msg:"New Blog has been added successfully"})
  } catch (error) {
    console.log(error);
    res.status(400).send({err:error.message})
  }
})

BlogRouter.get("/",AuthMiddleWare, async(req,res)=>{
    let {title,category,date,limit,page} = req.query;
    let Query={}
    if(title){
      Query.title = { $regex : title , $options : "i" }
    }
    if(category){
        Query.category=category
    }
    let sortBy={};
    if(date =="asc"){
        sortBy.date =1
    }else if(date == "desc"){
        sortBy.date = -1
    }
    try {
       const blog = await(BlogModel.find(Query).sort(sortBy).skip(limit*(+page)-limit)).limit(limit)
       res.send(blog)
    } catch (error) {
      console.log(error);
      res.status(400).send({err:error.message})
    }
  })

 
  

  BlogRouter.patch("/:blogId", AuthMiddleWare, async(req,res)=>{
      const {blogId}= req.params
      const blog = await BlogModel.findOne({_id:blogId})
      try {
          if(blog.userId == req.body.userId){
           await BlogModel.findByIdAndUpdate({_id:blogId},req.body);
           res.status(200).send({msg:"Blog has been updated"})
          }else{
            res.status(200).send({msg:"You are not authorized to edit this blog"})
          }
      } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
      }
  })
  

  BlogRouter.delete("/:blogId", AuthMiddleWare, async(req,res)=>{
    const {blogId}= req.params
    const blog = await BlogModel.findOne({_id:blogId})
    try {
        if(blog.userId == req.body.userId){
         await BlogModel.findByIdAndDelete({_id:blogId},req.body);
         res.status(200).send({msg:"Blog has been deleted"})
        }else{
          res.status(200).send({msg:"You are not authorized to delete this blog"})
        }
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
    }
})


module.exports={
    BlogRouter
}