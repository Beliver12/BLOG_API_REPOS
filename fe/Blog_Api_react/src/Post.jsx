import { useState, useEffect} from 'react'
import { data, useOutletContext } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";

const Post = () => {
    debugger;
    const [posts, setPosts] = useState('')
    const url = "https://blogapi-staging.up.railway.app/posts"
    const url2 = "https://blogapi-staging.up.railway.app/comments"
    const [postId, setPostId] = useState('');
    const [commentId, setCommentId] = useState('')
    const [comments, setComments] = useState('');
    const [isExpired, setIsExpired] = useState('')
    const {message, setMessage} = useOutletContext();
    const [postStatus, setPostStatus] = useState('')
   
    useEffect(() => {
        const id = localStorage.getItem("userId")
        const  data = {
            id: id
        }
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(url, options)
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
        if(response.length < 1) {
          setPostStatus(false)
        } else {
          setPostStatus(true)
        }
      })
      },[]);

        
    useEffect(() => {
      fetch(url2)
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
      setComments(response)
      
    })
    },[]);

      const handleComment = async (event) => {
        debugger;
        event.preventDefault();
        const accessToken = localStorage.getItem("accessToken")
       
        if(!accessToken) {
          alert('Sign-up to comment or Log-in if you have account allready')
          return false
        }
        localStorage.setItem("postId", event.currentTarget.value)
        setPostId(event.currentTarget.value)
        
     }

     const handleDelete = async (event) => {
      debugger;
      event.preventDefault();
      const accessToken = localStorage.getItem("accessToken")
       
      if(!accessToken) {
        alert('Sign-up to delete comment or Log-in if you have account allready')
        return false
      }
      const  data = {
          accessToken: accessToken,
          id: event.currentTarget.value
      }
      const url = "https://blogapi-staging.up.railway.app/comments/delete"
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
      } else if(data.message === "you are not creator of this comment") {
        alert("you are not creator of this comment or this post. You dont have permission to delete this comment")
        return false
      }else {
          setComments(data)
          
      }
  }).catch((error) => console.error("Error", error))
   }

   const handleEdit = async (event) => {
    debugger;
    event.preventDefault();
    localStorage.setItem("postId", event.currentTarget.value)
    const accessToken = localStorage.getItem("accessToken")
    if(!accessToken) {
      alert('Sign-up to edit comment or Log-in if you have account allready')
      return false
    }
    const id = localStorage.getItem("postId")
    const data = {
        accessToken: accessToken,
        id: id,
    }

    const url = "https://blogapi-staging.up.railway.app/comments/comment"
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
        } else if(data.message === "you are not creator of this comment") {
          alert("you are not creator of this comment you dont permission to do edit")
          return false
        } else {                 
          setCommentId(true)
            
        }
    }).catch((error) => console.error("Error", error))
    
 }

     if(postId) {
      return <Navigate to="/comment-post"/>
  }

  if(commentId) {
    return <Navigate to="/edit-comment"/>
  }

  if(isExpired) {
    alert('You dont have permission to do that. Are you Loged-in? ')
    return <Navigate to="/"/>
}
 
    return (
        <>
      
            <h1>Posts</h1>
            {postStatus === false ? <h3>User has no Posts</h3> : ''} 
            <div className='post'>
              
          <ul>
            
          {posts.length > 0 && posts.map(post => 
            <li key={post.id}>
              <h2>{post.postName}</h2>  
              <p>{post.postText}</p>
              <p>{post.date}</p>
              <h2>By {post.createdBy}</h2>
              <label htmlFor=""><strong>Comments:</strong></label>
              {comments.length > 0 && comments.map(comment => 
            
           comment.postId === post.id ?  <div key={comment.id} className='comments'>
           
            <p>{comment.commentText}</p>
           <p><strong>Created By: </strong> {comment.authorName} <strong>At:</strong> {comment.date}</p>
           <button value={comment.id} onClick={handleDelete}>Delete</button>
           <button value={comment.id} onClick={handleEdit}>Edit</button>
            </div> : '' 
          
          )}
              <button value={post.id} onClick={handleComment}>Add-Comment</button>
             
                </li>
         
          )} 
           
            </ul>
            
        </div>
        </>
    )
}

export default Post;