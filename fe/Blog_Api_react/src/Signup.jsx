import { useState, useEffect} from 'react'

//const [username, setUsername] = useState('')
//const [password, setPassword] = useState('')



function Signup() {
    debugger;
   const [values, setValues] = useState({
    username: '',
    password: ''
   })
   const handleChange = (event) => {
    setValues({...values, [event.target.name]:[event.target.value]})
   }
   const handleSubmit = (event) => {
    debugger;
    event.preventDefault();
    fetch('http://localhost:3000/signup', {values})
    .then(res => console.log("Registered Successfully"))
    .catch(err => console.log(err))
   }
    return (
        <>
        <div className='signup'>
            <h1>Signup</h1>

            <form onSubmit={handleSubmit} >
        <input type="text" onChange={handleChange} placeholder='Username' name='username'/>
        <input type="password" onChange={handleChange} placeholder='Password' name='password'/>
        <button type='submit'>Sign up</button>
            </form>
        </div>
        </>
    )
}

export default Signup