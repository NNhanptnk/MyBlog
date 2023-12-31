import { Link, useLocation, useNavigate } from "react-router-dom"
import { IoSearch } from "react-icons/io5";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext";


// Nagivation bar page
const Navbar = () => {
    const [prompt,setPrompt]=useState("")
    const [menu,setMenu]=useState(false)
    const navigate=useNavigate()
    const path=useLocation().pathname
    
    //Change menu icon onclick t->f or f->t
    const showMenu = () =>{
        setMenu(!menu)
    }
    
    const {user}=useContext(UserContext)
    return (
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg font-extrabold"><Link to="/">My Blog</Link></h1>
        
        {/* Search bar*/}
        {path==="/" && <div className="flex justify-center items-center space-x-0">
            <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><IoSearch/></p>
            <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none " placeholder="  Search something ..." type="text"/>
        </div>}

        {/* Login and Register*/}
        <div onClick={showMenu} className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
            {/* If there is user then /write else /login */}
            {user? <h3><Link to="/write">Write</Link></h3> : <h3><Link to="/login">Login</Link></h3>}
            {user? <div>
                    <p className="cursor-pointer relative"><HiMiniBars3BottomLeft/></p>
                    {menu && <Menu/>}
                    </div> : <h3><Link to="/register">Register</Link></h3>}
        </div>
        {/* Add bar icon */}
        <div onClick={showMenu} className="md:hidden text-lg">
          <p className="cursor-pointer relative"><HiMiniBars3BottomLeft/></p>
          {menu && <Menu/>}
        </div>
        
        </div>
    )
}
  
export default Navbar