import { useState, useEffect } from 'react'
import { Link, Navigate, useOutletContext } from "react-router-dom";

import { Outlet } from "react-router-dom";

const MyPosts  = () => {
    debugger;
        const [posts, setPosts] = useState('')
        const [isExpired, setIsExpired] = useState('')
        const {message, setMessage} = useOutletContext();
        const [postId, setPostId] = useState('');
        useEffect(() => {
           
            const accessToken = localStorage.getItem("accessToken")
                const data = {
                    accessToken: accessToken
                }
        
                const url = "https://blogapi-staging.up.railway.app/posts/myposts"
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
                    console.log(data)
                    if(data.message === "jwt expired") {
                        localStorage.removeItem("accessToken")
                        setIsExpired('true')
                        setMessage('')
                    } else {
                        setPosts(data)
                        
                    }
                }).catch((error) => console.error("Error", error))
          },[]);

          //Handle Edit
          const handleEdit = async (event) => {
            debugger;
            event.preventDefault();
            localStorage.setItem("postId", event.currentTarget.value)
            setPostId(event.currentTarget.value)
         }

             //Handle Delete
         const handleDelete = async (event) => {
            debugger;
            event.preventDefault();
            const accessToken = localStorage.getItem("accessToken")
            const  data = {
                accessToken: accessToken,
                id: event.currentTarget.value
            }
            const url = "https://blogapi-staging.up.railway.app/posts/delete"
            const options = {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            fetch(url, options)
        .then(res => res.json())
        .then((data) => {
            console.log(data)

            if(data.message === "jwt expired") {
                localStorage.removeItem("accessToken")
                setIsExpired('true')
                setMessage('')
            } else {
                setPosts(data)
                
            }
        }).catch((error) => console.error("Error", error))
         }

//toggle Publish
         const handlePublish = async (event) => {
            debugger;
            event.preventDefault();
            const accessToken = localStorage.getItem("accessToken")
            const  data = {
                accessToken: accessToken,
                id: event.currentTarget.value
            }
            const url = "https://blogapi-staging.up.railway.app/posts/publish"
            const options = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            fetch(url, options)
        .then(res => res.json())
        .then((data) => {
            console.log(data)

            if(data.message === "jwt expired") {
                localStorage.removeItem("accessToken")
                setIsExpired('true')
                setMessage('')
            } else {
                setPosts(data)
                
            }
        }).catch((error) => console.error("Error", error))
         }
//
         if(isExpired) {
            alert('Your Token is expired pls log-in again')
            return <Navigate to="/"/>
        }
       
        const token = localStorage.getItem("accessToken")
        if(!token) {
            return <Navigate to="/"/>
        }

        if(postId) {
            return <Navigate to="/edit-post"/>
        }

    return (
        <>
      
            <h1>Posts</h1>
            <div className='my-posts'>
          <ul>
          {posts.length > 0 && posts.map(post => 
            <li key={post.id}>
              <h2>{post.postName}</h2>  
              <p>{post.postText}</p>
              <p>{post.date}</p>
              {post.published !== 'true' ?
              <div>
                <label >Not-Published</label>
                <button value={post.id} onClick={handlePublish}>Publish?</button>              
               </div> :
                <div>
                <label >Published</label>
                <button value={post.id} onClick={handlePublish}>Un-Publish?</button>              
               </div>
              }
              <button value={post.id} onClick={handleDelete}>Delete</button>
              <button value={post.id} onClick={handleEdit}>Edit</button>
                </li>
          )}
           
            </ul>
            
        </div>
        </>
    )
         
    }

    export default MyPosts