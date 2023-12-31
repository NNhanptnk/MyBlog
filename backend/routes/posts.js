const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

// Create
router.post("/create",verifyToken, async (req,res)=>{
    try {
        const newPost=new Post(req.body)
        const savedPost=await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})



// Update 
router.put("/:id", verifyToken, async(req,res)=>{
    try {
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})

// Delete
router.delete("/:id", verifyToken, async(req,res)=>{
    try {
        // Delete post by id
        //console.log(req.params)
        // Also need to delete images from database whatever...
        await Post.findByIdAndDelete(req.params.id)
        // Also delete comments
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!")
    }
    catch(err){
        res.status(500).json(err)
    }
})

// Get Post details
router.get("/:id", async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        // return post
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

// Get Posts
router.get("/", async(req,res)=>{
    // Try to query what we are writing on URL
    const query=req.query
    
    try {
        // Adding a way to search post
        const searchFilter=({
                // Trying to get the name from URL
                // $option : ignore uppercase
                title:{$regex:query.search, $options:"i"}
            }
        )

        // If there is query.search then searchFilter else null
        const posts=await Post.find(query.search? searchFilter:null)
        // return post
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

// Get User Posts
router.get("/user/:userId", async(req,res)=>{
    try {
        const posts=await Post.find({userId:req.params.userId})
        // return info
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

// Export to router
module.exports=router