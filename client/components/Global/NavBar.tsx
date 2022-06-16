import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Routes, Route, useNavigate} from 'react-router-dom';



function Click() {
    var navbar = document.querySelector(".main-nav ul");
    navbar.classList.toggle("active");
  }

export default function NavBar (){
  const navigate = useNavigate();
   
  const navigateToLogin = ()=> {
    navigate('/login');
   }

    return (
        <header className="main-header">
        <a href="index.html" className="brand-logo">
          <div className="brand-logo-name">
            <h1>minutes</h1>
          </div>
        </a>
        <div className="toggle-button" onClick={Click}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
            <Stack direction="row" spacing={2}>
             <Button color="secondary"  onClick={navigateToLogin}>Logout</Button>
               </Stack>
            </li>
            <li>
              <a href="#">Hello, User!</a>
            </li>
          </ul>
        </nav>
      </header>
    )
}