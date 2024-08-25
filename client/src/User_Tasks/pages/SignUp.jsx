import React, { useRef, useState } from "react";
import { createUser } from "../customsApi";
import { useNavigate } from "react-router-dom";
import {ToastContainer , toast} from "react-toastify";

function SignUp() {

   const navigate = useNavigate();
   const fileInput = useRef(null);
   const [image , setImage] = useState(undefined);
   const [form , setForm] = useState({
      name : "",
      email : "",
      password : "",
      profile : null
   });
   const [loading , setLoading] = useState(false);

   

   const handleChange=(e)=>{
      const {name , value} = e.target;
      setForm({...form , [name] : value});
   }

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setForm({...form , profile : file});
      }
    };

    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(!form.email || !form.name || !form.password){
        return toast.error("All fields must required")
      }
      try{
          setLoading(true);
         const {success , message} = await createUser(form);

         setLoading(false);
         if(!success){
            toast.error(message);
         }else{
         
            toast.success(message);
            setTimeout(()=>{
               navigate("/signin")
            }, 2000)
         }

      }catch(err){
         console.log(err)
      }
    }


  return (
    <div className="container">
      <div className=" flex justify-center items-center h-[100vh] w-full">
        <form onSubmit={handleSubmit} className="bg-black/50 shadow-lg p-4 flex flex-col max-w-md w-full">

          <div className="avatar w-24 h-20 border rounded flex self-center">

            <input type="file" ref={fileInput} 
            onChange={handleImageChange}
            hidden
            />
            <img src={image || form.profile} 
            onClick={()=> fileInput.current.click()}
            className="object-cover"
            alt="profile "
            />
          </div>

          <>
            <label
              htmlFor="name"
              className="text-yellow-300 font-bold text-lg py-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
               onChange={handleChange}
              className="input py-1"
              placeholder="enter your name"
            />

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
              placeholder="enter your name"
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
              placeholder="enter your name"
            />
            <button type="submit" className="btn btn-info my-3">
            {loading ? <span className="loading loading-md loading-spinner"></span> : "submit"} 
            </button>
          </>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
