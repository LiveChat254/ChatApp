import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {
  const [name, setName] = useState(''); // State for name input
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = name; // Use name state variable
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, e.target[3].files[0]);
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            navigate('/');
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div  className='bg-blue-200 p-60'>
      <div className="formWrapper justify-center ml-36 bg-white rounded-lg shadow-md p-8 max-w-md w-full">
      <span className="logo justify-center text-center ml-10 text-black text-3xl font-bold">
        Live<span className='text-4xl text-yellow-400'>Chat<span className='text-black'>2</span><span className='text-red-600'>5</span><span className='text-green-600'>4</span></span>
      </span>
      <div className="formWrapper bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
            placeholder="Name" required
            className="border border-gray-300 m-2 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            placeholder="Email" required
            className="border border-gray-300 m-2 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            placeholder="Password" required
            className="border border-gray-300 m-2 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
          <input style={{ display: 'none' }} type="file" id="file" /> {/* Correct id for input */}
          <label htmlFor="file" className="mb-4 cursor-pointer flex items-center">
            <img src="" alt="" className="w-8 h-8 rounded-full" />
            <span>Add an avatar</span>
          </label>
          <button type="submit" className="text-white bg-blue-500 font-semibold border rounded-md p-2">Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>Already have an account? 
          <Link to="/login" className="text-blue-500 font-semibold focus:outline-none hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
  );
};

export default Register;