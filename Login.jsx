import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
// Add other imports as needed

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        // User not found or wrong password error
        setErr(true, "Wrong password");
      } else {
        // Other errors
        console.error("Error signing in:", error);
      }
    }
  };
  return (
    <div className='bg-blue-200 p-60'>
    <div className="container  mx-auto max-w-md mt-20">
      <div className="formWrapper bg-white rounded-lg shadow-md p-8 max-w-md w-full">
      <span className="logo justify-center text-center ml-14 text-black text-3xl font-bold">
        Live<span className='text-4xl text-yellow-400'>Chat<span className='text-black'>2</span><span className='text-red-600'>5</span><span className='text-green-600'>4</span></span>
      </span>
        <form onSubmit={handleSubmit}>
          <input  className="border border-gray-300 mt-10 mb-4 rounded-md px-4 py-2 w-full focus:outline-none 
           focus:border-blue-500" type="email" placeholder='email'/>
          <input  className="border border-gray-300 rounded-md mb-4 px-4 py-2 w-full focus:outline-none 
           focus:border-blue-500" type="password" placeholder='password'/>
          <button className="text-white bg-blue-500 font-semibold border rounded-md p-2">Sign in</button>
            {err && <span className="text-sm">    Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to='/register' className="text-blue-500 font-semibold focus:outline-none 
          hover:underline">Register</Link></p>
      </div>
    </div>
  </div>
 );
};

export default Login;