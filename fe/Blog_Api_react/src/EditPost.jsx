import { useState, useEffect } from 'react';

import { Link, Navigate, data, useOutletContext  } from 'react-router';

const EditPost = () => {
  const [postname, setPostname] = useState('');
  const [text, setText] = useState('');
  const [publish, setPublish] = useState('');
  const [isExpired, setIsExpired] = useState('');
  const { message, setMessage } = useOutletContext();
  const [isLogedIn, setIsLogedIn] = useState('');
  const checkHandler = () => {
    setPublish(!publish);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const id = localStorage.getItem('postId');
    const data = {
      accessToken: accessToken,
      id: id,
    };

    const url = 'https://blogapi-staging.up.railway.app/posts/post';
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
        console.log(data);
        if (data.message === 'jwt expired') {
          localStorage.removeItem('accessToken');
          setIsExpired('true');
          setMessage('');
        } else {
          //setPost(data)
          if (data.published === 'true') {
            setPublish(true);
          } else {
            setPublish(false);
          }
          setPostname(data.postName);
          setText(data.postText);
        }
      })
      .catch((error) => console.error('Error', error));
  }, []);

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const id = localStorage.getItem('postId');
    const data = {
      id: id,
      postname: postname,
      text: text,
      publish: publish,
      accessToken: accessToken,
    };

    const url = 'https://blogapi-staging.up.railway.app/posts/edit';
    const options = {
      method: 'PUT',
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
          localStorage.removeItem('postId');
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
    alert('Your Token is expired pls log-in again');
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="edit-post">
        <h1>Edit-post</h1>

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

export default EditPost;
