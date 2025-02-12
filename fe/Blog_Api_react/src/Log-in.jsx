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

       const url = "https://blogapi-staging.up.railway.app/login"
       
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
        setMessage(data.token)
        setIsLogedIn('true')
        } else {
            setError(data.error)
        } 
        
       }).catch((error) => console.error("Error", error))

       
     
      
    }
    if(isLogedIn){
        return <Navigate to="/"/>
    }
    return (
        <>
        <div className='log-in'>
        <Link to="/">Home</Link>
            <h1>Log-in</h1>

            <form onSubmit={handleSubmit} method='POST' >
                <p>{error}</p>
                <input placeholder='username' type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/> 
                <input placeholder='password' type="password"  name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        
        <button type='submit'>Log-in</button>
        
            </form>
      
        </div>
        </>
    )
}

export default LogIn