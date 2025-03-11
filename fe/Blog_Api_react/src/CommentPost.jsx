import { useState, useEffect } from 'react';
import { data, useOutletContext } from 'react-router-dom';

import { Link, Navigate } from 'react-router-dom';

export const CommentPost = () => {
  debugger;
  const [authorName, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [comment, setComment] = useState('');
  const { message, setMessage } = useOutletContext();
  const [isExpired, setIsExpired] = useState('');
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/" />;
  }
  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const id = localStorage.getItem('postId');
    const accessToken = localStorage.getItem('accessToken');
    const data = {
      id: id,
      authorName: authorName,
      text: text,
      accessToken: accessToken,
    };

    const url = 'https://blogapi-staging.up.railway.app/comments/create';
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setAuthor('');
        setText('');
        console.log(data);
        //setComment(data.message)
        if (data.message === 'jwt expired') {
          localStorage.removeItem('accessToken');
          setIsExpired('true');
          alert('Your Token is expired pls log-in again');
          setMessage('');
        } else {
          setMessage(data.user.user.username);
          // setIsLogedIn('true')
          setComment(data.message);
          localStorage.removeItem('postId');
        }
      })
      .catch((error) => console.error('Error', error));
  };
  if (comment) {
    return <Navigate to="/post" />;
  }

  if (isExpired) {
    alert('Your Token is expired pls log-in again');
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="comment-post">
        <h1>Comment-post</h1>

        <form onSubmit={handleSubmit} id="createPost" method="POST">
          <label htmlFor="postname">Author-name</label>
          <input
            required
            type="text"
            id="authorname"
            name="authorname"
            value={authorName}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label htmlFor="text">How you feel</label>
          <textarea
            required
            rows={10}
            placeholder="Write-something"
            value={text}
            cols={50}
            id="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type="submit">Comment</button>
        </form>
      </div>
    </>
  );
};

export default CommentPost;
