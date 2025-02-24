import { useState, useEffect} from 'react'
import { data, useOutletContext } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";

const Posts = () => {
    debugger;
    const [posts, setPosts] = useState('')
    const url = "https://blogapi-staging.up.railway.app/posts"
    const url2 = "https://blogapi-staging.up.railway.app/comments"
    const [postId, setPostId] = useState('');
    const [comments, setComments] = useState('');
   
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
        localStorage.setItem("postId", event.currentTarget.value)
        setPostId(event.currentTarget.value)
     }

     if(postId) {
      return <Navigate to="/comment-post"/>
  }
    return (
        <>
      
            <h1>Posts</h1>
            <div className='posts'>
          <ul>
          {posts.length > 0 && posts.map(post => 
            <li key={post.id}>
              <h2>{post.postName}</h2>  
              <p>{post.postText}</p>
              <p>{post.date}</p>
              <label htmlFor="">Comments:</label>
              {comments.length > 0 && comments.map(comment => 
            
           comment.postId === post.id ?  <li className='comments'>
           
            <p>{comment.commentText}</p>
           <p><strong>BY: {comment.authorName}</strong></p>
            </li> : '' 
          
          )}
              <button value={post.id} onClick={handleComment}>Add-Comment</button>
             
                </li>
                
          )}
           
            </ul>
            
        </div>
        </>
    )
}

export default Posts;