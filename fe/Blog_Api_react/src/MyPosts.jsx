import { useState, useEffect } from 'react';
import { Link, Navigate, useOutletContext } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

const MyPosts = () => {
  debugger;
  const [posts, setPosts] = useState('');
  const [isExpired, setIsExpired] = useState('');
  const { message, setMessage } = useOutletContext();
  const [postId, setPostId] = useState('');
  const [comments, setComments] = useState('');
  const [postStatus, setPostStatus] = useState('');
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const data = {
      accessToken: accessToken,
    };

    const url = 'https://blogapi-staging.up.railway.app/posts/myposts';
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
          setPosts(data);
          if (data.length < 1) {
            setPostStatus(false);
          } else {
            setPostStatus(true);
          }
        }
      })
      .catch((error) => console.error('Error', error));
  }, []);

  useEffect(() => {
    const url2 = 'https://blogapi-staging.up.railway.app/comments';
    fetch(url2)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        const formatDate = (date = new Date()) => {
          return new Date().toISOString().split('T')[0];
        };
        for (let i = 0; i < response.length; i++) {
          response[i].date = formatDate(response[i].date);
        }
        setComments(response);
      });
  }, []);

  //Handle Edit
  const handleEdit = async (event) => {
    debugger;
    event.preventDefault();
    localStorage.setItem('postId', event.currentTarget.value);
    setPostId(event.currentTarget.value);
  };

  //Handle Delete
  const handleDelete = async (event) => {
    debugger;
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const data = {
      accessToken: accessToken,
      id: event.currentTarget.value,
    };
    const url = 'https://blogapi-staging.up.railway.app/posts/delete';
    const options = {
      method: 'DELETE',
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
          setPosts(data);
        }
      })
      .catch((error) => console.error('Error', error));
  };

  //toggle Publish
  const handlePublish = async (event) => {
    debugger;
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const data = {
      accessToken: accessToken,
      id: event.currentTarget.value,
    };
    const url = 'https://blogapi-staging.up.railway.app/posts/publish';
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
        console.log(data);

        if (data.message === 'jwt expired') {
          localStorage.removeItem('accessToken');
          setIsExpired('true');
          setMessage('');
        } else {
          setPosts(data);
        }
      })
      .catch((error) => console.error('Error', error));
  };
  //handle Delete
  const handleDelete2 = async (event) => {
    debugger;
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const data = {
      accessToken: accessToken,
      id: event.currentTarget.value,
    };
    const url = 'https://blogapi-staging.up.railway.app/comments/mypostsdelete';
    const options = {
      method: 'DELETE',
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
          setComments(data);
        }
      })
      .catch((error) => console.error('Error', error));
  };
  //
  if (isExpired) {
    alert('Your Token is expired pls log-in again');
    return <Navigate to="/" />;
  }

  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/" />;
  }

  if (postId) {
    return <Navigate to="/edit-post" />;
  }

  return (
    <>
      <h1>Posts</h1>
      {postStatus === false ? (
        <h3>
          You have no Posts, Create some by clicking Create-post in top right
          corner{' '}
        </h3>
      ) : (
        ''
      )}
      <div className="my-posts">
        <ul>
          {posts.length > 0 &&
            posts.map((post) => (
              <li key={post.id}>
                <h2>{post.postName}</h2>
                <p>{post.postText}</p>
                <p>{post.date}</p>
                {post.published !== 'true' ? (
                  <div>
                    <label>Not-Published</label>
                    <button value={post.id} onClick={handlePublish}>
                      Publish?
                    </button>
                  </div>
                ) : (
                  <div>
                    <label>Published</label>
                    <button value={post.id} onClick={handlePublish}>
                      Un-Publish?
                    </button>
                  </div>
                )}
                <button value={post.id} onClick={handleDelete}>
                  Delete
                </button>
                <button value={post.id} onClick={handleEdit}>
                  Edit
                </button>
                <br></br>
                <label htmlFor="">
                  <strong>Comments:</strong>
                </label>
                {comments.length > 0 &&
                  comments.map((comment) =>
                    comment.postId === post.id ? (
                      <div key={comment.id} className="comments">
                        <p>{comment.commentText}</p>
                        <p>
                          <strong>BY: {comment.authorName}</strong>
                        </p>
                        <button value={comment.id} onClick={handleDelete2}>
                          Delete
                        </button>
                      </div>
                    ) : (
                      ''
                    )
                  )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default MyPosts;
