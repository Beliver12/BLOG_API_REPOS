import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import './App.css'
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
  const [message, setMessage] = useState(token)
  
  if(!message) {
    //alert("Session expired Log-in again")
    fetch("https://blogapi-staging.up.railway.app/log-out")
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        localStorage.removeItem("accessToken");        
  }


  return (
    <div>
      <nav>
        <h1>MY-BLOG</h1>
        <ul> 
        <Link to="/">Home</Link>
        <Link to="/posts"  >Posts</Link>
          <LinkForSignUp message={message}/>
          <LinkForLogIn setMessage={setMessage} message={message}/>
          <LinkForCreatingPost message={message}/>
          <LinkForCheckingYourOwnPost message={message}/>
        </ul>
      </nav>  
      <div className='main'>
        <Outlet context={{...message, setMessage}}/>
      </div>
    </div>
    
  );
};

export default App;
