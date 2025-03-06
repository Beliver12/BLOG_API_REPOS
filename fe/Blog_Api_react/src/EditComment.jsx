import { useState, useEffect} from 'react'
import { data, useOutletContext } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";

const EditComment = () => {
    const [authorName, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [isExpired, setIsExpired] = useState('')
    const {message, setMessage} = useOutletContext();
    const [isLogedIn, setIsLogedIn] = useState('')
   
    useEffect(() => {
           
        const accessToken = localStorage.getItem("accessToken")
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
                }  else {                 
                    setAuthor(data.authorName)
                    setText(data.commentText)
                    
                }
            }).catch((error) => console.error("Error", error))
      },[]);

      const handleSubmit = async (event) => {
        debugger;
        event.preventDefault();
    const accessToken = localStorage.getItem("accessToken")
    const id = localStorage.getItem("postId")
        const data = {
            id: id,
            authorName: authorName,
            text: text,
            accessToken: accessToken
        }

        const url = "https://blogapi-staging.up.railway.app/comments/edit"
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
            setAuthor('')
            setText('')
            console.log(data)
            if(data.message === "jwt expired") {
                localStorage.removeItem("accessToken")
                setIsExpired('true')
                setMessage('')
            } else {
                setMessage(data.user.user.username)
                setIsLogedIn('true')
                localStorage.removeItem("postId")
            }
        }).catch((error) => console.error("Error", error))
    }
    if(isExpired) {
        alert('Your Token is expired pls log-in again')
        return <Navigate to="/"/>
    }
    if(isLogedIn) {
        return <Navigate to="/post"/>
    }
    const token = localStorage.getItem("accessToken")
    if(!token) {
        alert('Your are loged-out')
        return <Navigate to="/"/>
    }

    return (
        <>
        <div className='edit-comment'>
            <h1>Comment-edit</h1>

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

export default EditComment