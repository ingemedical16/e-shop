import { useState } from 'react'
import reactLogo from './assets/react.svg';
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import SearchBar from './components/SearchBar/SearchBar';
import { useSelector, useDispatch } from "react-redux";
import TopBar from './components/TopBar/TopBar';
import NavBar from './components/NavBar/NavBar';


function App() {
 

  return (
    <>
        <TopBar/>
        <NavBar/>
      <div className='container my-2'>
          <Outlet />
      </div>
       <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
       </>
  )
}

export default App
