import { Link, useNavigate } from "react-router-dom"
import Footer from "../component/Footer"
import { useState } from "react"
import axios from 'axios'
import {URL} from '../url'


const Register = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false)
    const navigate=useNavigate()

    const handleRegister=async()=>{
      
      try{
        const res= await axios.post(URL+"/api/auth/register",{username,email,password})
        setUsername(res.data.username)
        setEmail(res.data.email)
        setPassword(res.data.password)
        setError(false)
        navigate("/login")
      } 
      catch(err) {
        setError(true)
        console.log(err)
      }
    }

    return (
        <>
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg font-extrabold"><Link to="/">My Blog</Link></h1>
        <h3><Link to="/login">Login</Link></h3>
        
        </div>

        <div className="w-full flex justify-center items-center h-[67.5vh]">
        <div className="flex flex-col justify-center items-center space-y-3 w-[75%] md:w-[30%]">
            <h1 className="text-xl font-bold text-left text-sky-500 ">Create an account</h1>
            <input onChange={(e)=>setUsername(e.target.value)} className="w-full px-5 py-5 border border-sky-500 outline-0" type="text" placeholder="Enter your email"/>
            <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-5 py-5 border border-sky-500 outline-0" type="text" placeholder="Enter your username"/>
            <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-5 py-5 border border-sky-500 outline-0" type="password" placeholder="Enter your password"/>
            <button onClick={handleRegister} className="w-full px-5 py-5 text-lg font-bold text-white bg-sky-500 rounded-lg hover:bg-gray-500 hover:text-black">Register</button>
            {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>}
            <div className="flex justify-center items-center space-x-4">
                <p>Already have an account?</p>
                <p className="text-gray-500 hover:text-emerald-500"><Link to="/login">Login</Link></p>
            </div>
        </div>
      </div>
      <Footer/>
      </>
    )
  }
  
  export default Register