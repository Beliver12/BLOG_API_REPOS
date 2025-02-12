import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Signup from './Signup.jsx'
import App from './App.jsx'
import LogIn from './Log-in.jsx';
import CreatePost from './CreatePost.jsx';

const router = createBrowserRouter([
 {
  path: "/",
  element: <App/>,
  children: [
    { path: "signup", element: <Signup /> },
    { path: "log-in", element: <LogIn /> },
    { path: "create-post", element: <CreatePost /> }
  ],
 },
/* {
  path: "/:log-in",
  element: <LogIn/>
 },
 {
  path: "/:signup",
  element: <Signup/>
 }*/
 /* {
    path: "signup",
    element: <Signup/>
  },
  {
    path: "log-in",
    element: <LogIn/>
  }*/
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
