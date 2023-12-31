const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')


// Update 
router.put("/:id", verifyToken, async(req,res)=>{
    try {
        if (req.body.password){
            const salt= await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch{
        res.status(500).json(err)
    }
})

// Delete
router.delete("/:id", verifyToken, async(req,res)=>{
    try {
        // Delete user by id
        await User.findByIdAndDelete(req.params.id)
        // Delete posts that associate with each post
        await Post.deleteMany({userId:req.params.id})
        // Delete comments that associate with each post
        await Comment.deleteMany({userId:req.params.id})
        
        res.status(200).json("User has been deleted!")
    }
    catch{
        res.status(500).json(err)
    }
})

// Get User
router.get("/:id", async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        // In order to not show password
        const {password,...info}=user._doc
        // return info
        res.status(200).json(info)
    }
    catch{
        res.status(500).json(err)
    }
})



// Export to router
module.exports=router