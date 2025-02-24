import { useState, useEffect} from 'react'
import { data, useOutletContext } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";

const CommentPost = () => {
    const [authorName, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [comment, setComment] = useState('')
  

      const handleSubmit = async (event) => {
        debugger;
        event.preventDefault();
    const id = localStorage.getItem("postId")
        const data = {
            id: id,
            authorName: authorName,
            text: text,
        }

        const url = "https://blogapi-staging.up.railway.app/create"
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
            setAuthor('')
            setText('')
            console.log(data)
            setComment(data.message)
        }).catch((error) => console.error("Error", error))
    }
    if(comment) {
        return <Navigate to="/posts"/>
    }

      return (
        <>
        <div className='comment-post'>
            <h1>Comment-post</h1>

            <form onSubmit={handleSubmit} id='createPost' method='POST' >
                <label htmlFor="postname">Author-name</label>
                <input required type="text" id='authorname' name='authorname' value={authorName} onChange={(e) => setAuthor(e.target.value)}/> 
                <label htmlFor="text">How you feel</label>
                <textarea required rows={10} placeholder='Write-something' value={text} cols={50} id='text' name='text' onChange={(e) => setText(e.target.value)}></textarea>
        <button type='submit'>Comment</button>
        
            </form>
      
        </div>
        </>
    )
}

export default CommentPost