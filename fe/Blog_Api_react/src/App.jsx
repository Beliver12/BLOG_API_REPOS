import { useState } from 'react'
import { Link } from "react-router-dom";
import './App.css'


const App = () => {
  return (
    <div>
      <nav>
        <h1>MY-BLOG</h1>
        <ul>
          <li>
            <Link to="signup">Signup Page</Link>
          </li>
          <li>
            <Link to="log-in">Log-in Page</Link>
          </li>
        </ul>
      </nav>  
      <div className='main'>
        HERE GO POSTS
      </div>
    </div>
    
  );
};

export default App;
