const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')

// Database connection
const connectDB=async()=>{
    try {
        // Hide URL in .env
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully")
    }
    catch(err){
        console.log(err)
    }
}

// Access .env URL in .env
dotenv.config()

// Middlewares
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

// Upload images
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        //fn(null,"image1.png")
    }
})

const upload=multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res)=>{
    //console.log(req.body)
    res.status(200).json("Image has been uploaded !")
})

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port " + process.env.PORT)
})