import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Signup from './Signup.jsx';
import App from './App.jsx';
import LogIn from './Log-in.jsx';
import CreatePost from './CreatePost.jsx';
import Posts from './Posts.jsx';
import MyPosts from './MyPosts.jsx';
import EditPost from './EditPost.jsx';
import CommentPost from './CommentPost.jsx';
import EditComment from './EditComment.jsx';
import Post from './Post.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'signup', element: <Signup /> },
      { path: 'log-in', element: <LogIn /> },
      { path: 'create-post', element: <CreatePost /> },
      { path: 'posts', element: <Posts /> },
      { path: 'myposts', element: <MyPosts /> },
      { path: 'edit-post', element: <EditPost /> },
      { path: 'comment-post', element: <CommentPost /> },
      { path: 'edit-comment', element: <EditComment /> },
      { path: 'post', element: <Post /> },
    ],
  },
]);
const root = document.getElementById('#root');
console.log(root, 'root')
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
