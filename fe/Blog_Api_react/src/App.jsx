import { useState } from 'react'
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './App.css'
debugger;

const LinkForLogIn = ({message, setMessage}) => {
  if(message) {
    return  <button onClick={()=> setMessage('')}>Log-out</button>
  }
  return  <li><Link to="log-in">Log-in Page</Link></li>
}

const LinkForSignUp = ({message}) => {
  if(message) {
    return  
  }
  return  <li><Link to="signup">Signup Page</Link></li>
}

const LinkForCreatingPost = ({message}) => {
  if(message) {
    return  <li><Link to="create-post">Create-post</Link></li>
  }
  return
}

const App = () => {
  const token = localStorage.getItem("accessToken")
  const [message, setMessage] = useState(token)
  if(message === '') {
    fetch("http://localhost:3000/log-out")
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
          <LinkForSignUp message={message}/>
          <LinkForLogIn setMessage={setMessage} message={message}/>
          <LinkForCreatingPost message={message}/>
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
