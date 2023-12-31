import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Comment from "../component/Comment"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Loader from "../component/Loader"
import { URL, IF } from "../url"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"

const PostDetails = () => {

    const postId=useParams().id
    const [post,setPost]=useState({})
    const {user}=useContext(UserContext)

    // Comments
    const [comments,setComments]=useState([])
    const [comment,setComment]=useState("")
    //



    const [loader,setLoader]=useState(false)
    const navigate=useNavigate()
    const fetchPosts=async()=>{
      setLoader(true)
      try{
        const res= await axios.get(URL+"/api/posts/"+postId)
        setPost(res.data)
        setLoader(false)
      }
      catch(err){
        console.log(err)
        setLoader(true)
      }
    }

    const fetchPostComments=async()=>{
      try {
        const res=await axios.get(URL+"/api/comments/post/"+postId)
        setComments(res.data)
      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchPostComments()
    },[postId])


    const postComment=async(e)=>{
      e.preventDefault()
      try{

        const res = await axios.post(URL+"/api/comments/create",
        {comment:comment,author:user.username,postId:postId,userId:user._id},
        {withCredentials:true})
        //setComments("")
        window.location.reload(true)
      }
      catch(err){
        console.log(err)
      }
    }

    const handleDeletePost=async()=>{
      try{
        const res = await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
        console.log(res.data)
        navigate("/")
      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchPosts()
    },[postId])

    return (
      <div>
        <Navbar/>
        
        {loader?<div className="h-[40vh] flex justify-center items-center"> <Loader/> </div>:<div className="px-8 md:px-[200px] mt-8">
        
        {/*Title*/}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
            {user?._id===post?.userId && <div className="flex items-center justify-center space-x-2">
                <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)}><BiEdit/></p>
                <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete/></p>
            </div> }
                   

        </div>
        
        {/*Date and Author*/}    
        <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
                <div className="flex space-x-2">
                    <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
                    <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
                </div>

        </div>
        <img src={IF+post.photo} className="w-full mx-auto mt-8" alt=""/>
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className = "flex items-center mt-8 soace-x-4 font-semibold">
            <p>Categories : </p>
            <div className="flex justify-center items-center space-x-2">
            {post.categories?.map((c,i)=>(
              <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>

            ))}    
            </div>
          </div>

          {/*Comment part*/}
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mt-4 font-bold ">Comments</h3>
            {/*All comments here */}
            {comments?.map((c)=>(
              <Comment key={c._id} c={c} post={post}/>
            ))}

            {/* Hard coded comment */}
            {/* <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-500">@Someone123</h3>
                    <div className="flex justify-center items-center space-x-4">
                        <p className="text-gray-400 text-sm">09/01/2023</p>
                        <p className="text-gray-400 text-sm">12:35</p>
                        <div className="flex items-center justify-center space-x-2">
                            <p><BiEdit/></p>
                            <p><MdDelete/></p>
                        </div>      
                    </div>
                
                </div>
                <p className="px-4 mt-2">Good !</p>
            </div> */}
          </div>

          {/* Write comments */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[85%] outline-none px-4 mt-4 md:mt-0"></input>
            <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[15%] mt-4 md:mt-0">Add comment</button>
          </div>

        </div>}
        
        <Footer/>
      </div>
    )
}  
export default PostDetails