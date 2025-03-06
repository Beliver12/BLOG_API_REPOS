import { useState, useEffect} from 'react'
import { data, useOutletContext } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";
import './main'
const Posts = () => {
    debugger;
    const [posts, setPosts] = useState('')
    const url = "https://blogapi-staging.up.railway.app/users"
    const [userId, setUserId] = useState('')
    const {message, setMessage} = useOutletContext();
   
    useEffect(() => {
        fetch(url)
      .then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log(response)
        const formatDate = (date = new Date()) => {
            return new Date().toISOString().split('T')[0];
          }
        for(let i = 0; i < response.length; i++) {
            response[i].date = formatDate(response[i].date)
        }
        setPosts(response)
        
      })
      },[]);

   const handleOpen = async (event) => {
    debugger;
        event.preventDefault();
        localStorage.setItem("userId", event.currentTarget.value)
        setUserId(event.currentTarget.value)
   }

   if(userId) {
    return <Navigate to="/post"/>
  }
    return (
        <>
      
            <h1>Posts</h1>
            <div className='posts'>
          <ul>
          {posts.length > 0 && posts.map(post => 
          
            <li key={post.id}>
              <h2>{post.username} Posts</h2>   
              <button value={post.id} onClick={handleOpen}>Open</button>            
                </li> 
                
          )}
           
            </ul>
            
        </div>
        </>
    )
}

export default Posts;