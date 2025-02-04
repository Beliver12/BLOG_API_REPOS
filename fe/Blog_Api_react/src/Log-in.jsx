import { useState, useEffect} from 'react'

import { Link, Navigate } from "react-router-dom";


const LogIn = () => {
    debugger;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    
 
    const handleSubmit  = async (event) => {
        debugger;
      
        event.preventDefault();
       const data = {
        password: password,
        username: username
       }

       const url = "http://localhost:3000/login"
       
       const options = {
        method: "POST",
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
       }
     
       fetch(url, options)
       .then(res => res.json())
       .then((data) => {
        setUsername('')
        setPassword('')
        console.log(data);
       
        localStorage.setItem("accessToken", data.token);
        setMessage('true')
       }).catch((error) => console.error("Error", error))

       
     
      
    }
    if(message){
        return <Navigate to="/"/>
    }
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
       }
    return (
        <>
        <div className='log-in'>
            <h1>Log-in</h1>

            <form onSubmit={handleSubmit} method='POST' >
                <input type="text"  name='username' value={username} onChange={(e) => setUsername(e.target.value)}/> 
                <input type="password"  name="password" id="" value={password} onChange={(e) => setPassword(e.target.value)}/>
        
        <button type='submit'>Log-in</button>
        
            </form>
            <button onClick={handleLogout}>Log-out</button>
            <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        </nav>
        </div>
        </>
    )
}

export default LogIn