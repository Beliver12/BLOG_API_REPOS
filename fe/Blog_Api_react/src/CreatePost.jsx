import { useState, useEffect } from 'react';
import { data, useOutletContext } from 'react-router-dom';

import { Link, Navigate } from 'react-router-dom';

const CreatePost = () => {
  debugger;
  const [postname, setPostname] = useState('');
  const [text, setText] = useState('');
  const [publish, setPublish] = useState(false);
  const [isExpired, setIsExpired] = useState('');
  const { message, setMessage } = useOutletContext();
  const [isLogedIn, setIsLogedIn] = useState('');
  const checkHandler = () => {
    setPublish(!publish);
  };

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const data = {
      postname: postname,
      text: text,
      publish: publish,
      accessToken: accessToken,
    };

    const url = 'https://blogapi-staging.up.railway.app/posts/create';
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
        setPostname('');
        setText('');
        setPublish('');
        console.log(data);
        if (data.message === 'jwt expired') {
          localStorage.removeItem('accessToken');
          setIsExpired('true');
          setMessage('');
        } else {
          setMessage(data.user.user.username);
          setIsLogedIn('true');
        }
      })
      .catch((error) => console.error('Error', error));
  };
  if (isExpired) {
    alert('Your Token is expired pls log-in again');
    return <Navigate to="/" />;
  }
  if (isLogedIn) {
    return <Navigate to="/myposts" />;
  }
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="create-post">
        <Link to="/">Home</Link>
        <h1>Create-post</h1>

        <form onSubmit={handleSubmit} id="createPost" method="POST">
          <label htmlFor="postname">Post-name</label>
          <input
            required
            type="text"
            id="postname"
            name="postname"
            value={postname}
            onChange={(e) => setPostname(e.target.value)}
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
          <div>
            <input
              type="checkbox"
              id="publish"
              checked={publish}
              onChange={checkHandler}
              name="publish"
            />
            <label htmlFor="publish">Publish</label>
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
