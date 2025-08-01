import React from "react";
import logo from '../assets/Untitled-2-01 1.png' 
import { useNavigate} from "react-router-dom"
export default function AdminMenu(){
  let organiser = useNavigate();
  let handleorg =()=>{
organiser('/api/Admin/Organiser')
  }
  let handledash =()=>{
organiser('/')
  }
  let handlecom =()=>{
organiser('/api/Admin/Company')
  }
  let handleproduct =()=>{
organiser('/api/Admin/Products')
  }
    return(
         <div className="h-screen w-56 bg-blue-950  text-white flex flex-col justify-between">
                <div>
                  <div className="p-4 text-xl font-bold border-b border-gray-600 flex justify-center">
                    <img className="w-24" src={logo} alt="Logo" />
                  </div>
        
        <nav className="flex flex-col p-4 space-y-4">
          <button
            className="hover:bg-gray-700 p-2 rounded transition"
          onClick={handledash}
          >
            Dashboard
          </button>
        
          <button 
            className="hover:bg-gray-700 p-2 rounded transition"
          onClick={handleorg}
          >
            Organiser
          </button>
        
          <button  
          onClick={handlecom}
            className="hover:bg-gray-700 p-2 rounded transition"
          >
            User
          </button>
        
          <button 
          onClick={handleproduct}
            className="hover:bg-gray-700 p-2 rounded transition"
          >
            Products
          </button>
        </nav>
        
                </div>
                <div className="p-4 border-t border-gray-600 flex items-center space-x-3">
                  <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold">John Doe</p>
                    <p className="text-xs text-gray-400">View Profile</p>
                  </div>
                </div>
              </div>
    )
}
