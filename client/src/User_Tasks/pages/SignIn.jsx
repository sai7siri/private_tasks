import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInError } from '../redux/authSlice';
import { startpoint } from '../private/api.js';

function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }

    dispatch(signInStart()); // Start the loading indicator
    
    const url = `${startpoint}/api/v1/signin`
    try {
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });

      const { success, message, data , token} = await res.json();
      if (success) {
        toast.success(message);
        dispatch(signInSuccess(data));
        setTimeout(()=>{
          navigate('/home'); 
        }, 2000);
      
        localStorage.setItem("token" , token);

      } else {
        toast.error(message);
        dispatch(signInError(message));
      }

    } catch (err) {
      dispatch(signInError(err.toString()));
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container flex justify-center items-center h-[95vh] w-full">
      <div className="bg-black/50 p-4 flex flex-col max-w-md w-full ">
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label
            htmlFor="email"
            className="text-yellow-300 font-bold text-lg py-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            type="email"
            className="input py-1"
            placeholder="Enter your email"
          />

          <label
            htmlFor="password"
            className="text-yellow-300 font-bold text-lg py-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            value={form.password || ""}
            onChange={handleChange}
            type="password"
            className="input py-1"
            placeholder="Enter your password"
          />
          <button type="submit" className="btn btn-info my-3">
            {loading && <span className='loading loading-dots loading-md'></span>} 
            {!loading && 'Submit'}
          </button>
        </form>
        <div className='text-white text-lg font-mono font-medium'>
          Haven't an account? <Link to={"/signup"} className='text-blue-700'><span>Signup</span></Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
