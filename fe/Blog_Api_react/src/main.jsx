import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './Signup.jsx'
import './index.css'
import App from './App.jsx'
import LogIn from './Log-in.jsx';

const router = createBrowserRouter([
 {
  path: "/",
  element: <App/>,
  children: [
    { path: "signup", element: <Signup /> },
    { path: "log-in", element: <LogIn /> },
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
