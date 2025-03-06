import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import './App.css'
import './main'
debugger;

const LinkForLogIn = ({message, setMessage}) => { 
  if(message) {   
    return  <button onClick={()=> setMessage('')}>Log-out</button>
  }
  return  <Link to="log-in">Log-in Page</Link>
}

const LinkForSignUp = ({message}) => {
  if(message) {
    return  
  }
  return  <Link to="signup">Signup Page</Link>
}

const LinkForCreatingPost = ({message}) => {
  if(message) {
    return  <Link to="create-post">Create-post</Link>
  }
  return
}

const LinkForCheckingYourOwnPost = ({message}) => {
  if(message) {
    return  <Link to="myposts">Check My Posts</Link>
  }
  return
}


const App = () => {
  const token = localStorage.getItem("accessToken")
  const user = localStorage.getItem("user")
  const [message, setMessage] = useState(user)
  ///const [accessToken, setToken] = useState(token)



 
  if(!message) {
    //alert("Session expired Log-in again")
    fetch("http://localhost:8080/log-out")
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        localStorage.removeItem("accessToken");    
        localStorage.removeItem("user")    
  }

  

  return (
    <div className='navbar'>
      <nav>
        <h1>MY-BLOG</h1>
        <ul> 
          
        <Link to="/">Home</Link>
        <Link to="/posts"  >Posts</Link>
          <LinkForSignUp message={message}/>          
          <LinkForCreatingPost message={message}/>
          <LinkForCheckingYourOwnPost message={message}/>
          {message?  <img src="..//icons8-user-24.png" alt="" />  : ''}
          {message?  <h3>{message}</h3>  : ''}
          <LinkForLogIn setMessage={setMessage} message={message}/>         
        </ul>
      </nav>  
      <div className='main'>
        <Outlet context={{...message, setMessage}}/>
        <div className='Languages'><h1>Created with:</h1>
        <img src="..//icons8-nodejs-144.png" alt="" />
        <a href="https://icons8.com/icons"><strong>Nodejs icon by Icons8</strong></a>
        <img src="..//icons8-express-js-128.png" alt="" />
        <a href="https://icons8.com/icons"><strong>Express Js icon by Icons8</strong></a>
        <img src="..//icons8-react-100.png" alt="" />
        <a href="https://icons8.com/icons"><strong>React icon by Icons8</strong></a>
        <img src="..//icons8-json-web-token-144.png" alt="" />
        <a href="https://icons8.com/icons"><strong>JSON Web Token icon by Icons8</strong></a>
        <a href="https://icons8.com/icons">Square icon by Icons8</a>
        </div>
      </div>
    
    </div>
    
  );
};

export default App;
