import { useState } from 'react'
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './App.css'
debugger;

const LinkForLogIn = ({message, onClick}) => {
 
  if(message) {
    return  <button onClick={onClick}>Log-out</button>
    
  }
  return  <li><Link to="log-in">Log-in Page</Link></li>
}

const App = () => {
  const handleLogout = () => {
    fetch("http://localhost:3000/log-out")
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    localStorage.removeItem("accessToken");
   }

  const [message, setMessage] = useState('')
  return (
    <div>
      <nav>
        <h1>MY-BLOG</h1>
        <ul>
        
          <li>
            <Link to="signup">Signup Page</Link>
          </li>
          <LinkForLogIn onClick={handleLogout} message={message}/>
        </ul>
      </nav>  
      <div className='main'>
        <Outlet context={{...message, setMessage}}/>
        HERE GO POSTS
      </div>
    </div>
    
  );
};

export default App;
