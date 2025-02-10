import { useState, useEffect} from 'react'
import { data, useOutletContext } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";


const LogIn = () => {
    debugger;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {message, setMessage} = useOutletContext();
    const [isLogedIn, setIsLogedIn] = useState('')
    const [error, setError] = useState('');
 
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
        withCredentials: true,
      
        headers: {
            'Accept': 'application/json',
    'Content-Type': 'application/json',
    
        }
       }
     
       fetch(url, options)
       .then(res => res.json())
       .then((data) => {
        setUsername('')
        setPassword('')
        console.log(data);
       
        localStorage.setItem("accessToken", data.token);
        if(data.message){
        setMessage('true')
        setIsLogedIn('true')
        } else {
            setError(data.error)
        } 
        
       }).catch((error) => console.error("Error", error))

       
     
      
    }
    if(isLogedIn){
        return <Navigate to="/"/>
    }
    const handleLogout = () => {
        fetch("http://localhost:3000/log-out")
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        localStorage.removeItem("accessToken");
       }
    return (
        <>
        <div className='log-in'>
            <h1>Log-in</h1>

            <form onSubmit={handleSubmit} method='POST' >
                <p>{error}</p>
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