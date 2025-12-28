import Navbar from "@/components/ui/Navbar";
import React  from "react"; 
import {Toaster} from "react-hot-toast";
import { Outlet } from "react-router";


function RootLayout() {  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Outlet />    
    </div>
  ); 
}   

export default RootLayout;