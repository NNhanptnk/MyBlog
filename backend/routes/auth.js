const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

// Register 
router.post("/register",async(req,res)=>{
    try {
        const {username,email,password}=req.body
        
        // Use bcrypt to hash password, below
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password,salt)
        // Encrytped above

        const newUser = new User({username,email,password:hashedPassword})
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})


// Login 
router.post("/login", async (req,res)=>{
    try{
        // Try to find email first
        const user=await User.findOne({email:req.body.email})
        if (!user){
            return res.status(404).json("User not found!")
        }
        // If user found then match the entered password with the database
        const match=await bcrypt.compare(req.body.password,user.password)
        if (!match){
            return res.status(401).json("Incorrect credentials!")
        }

        // Create a Json Web Token to share password between MongoDB and client
        const token = jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=user._doc
        res.cookie("token",token).status(200).json(info)
        
    }
    catch(err){
        res.status(500).json(err)
    }
})

// Logout

router.get("/logout", async(req,res)=>{
    try {
        // secure : true ?
        res.clearCookie("token",{secure:true,sameSite:"none"}).status(200).send("Logged out successfully !")
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// Refetch User
router.get("/refetch",(req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async(err,data)=>{
        if (err){
            return res.status(400).json(err)
        }
        res.status(200).json(data)
    })
})

module.exports=router