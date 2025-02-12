import { useState, useEffect} from 'react'
import { useOutletContext } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";


const  Signup = () => {
    debugger;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [isSignedIn, setIsSignedIn] = useState('')
 
   
   const handleSubmit = (event) => {
    event.preventDefault();
    debugger;
    const data = {
        password: password,
        password2: password2,
        username: username
    }
    
    
    const url = "http://localhost:8080/users/signup"
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(url, options)
        .then(res => res.json())
        .then((data) => {

            setUsername('')
            setPassword('')
            setPassword2('')
            if(data.message) {
              setIsSignedIn('true')
            } else {
                setError(data.error)
            }         
        })
   }

   if(isSignedIn) {
    return <Navigate to="/"/>
   }
    return (
        <>
        <div className='signup'>
        <Link to="/">Home</Link>
        <h1>Signup</h1>
        
        
            <form onSubmit={handleSubmit} method='POST' >
                <p>{error}</p>
            <input type="text" placeholder='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required/> 
            <input type="password" placeholder='password' name="password" id="" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <input type="password" placeholder='repeat-password' name="password2" id="" value={password2} onChange={(e) => setPassword2(e.target.value)} required/>
        <button type='submit'>Sign up</button>
            </form>
            
        </div>
        </>
    )
}

export default Signup