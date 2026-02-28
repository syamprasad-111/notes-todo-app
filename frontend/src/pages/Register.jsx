import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../api/axios";

function Register(){
  const navigate=useNavigate();
  const [form, setForm]=useState({name:"", email:"", password:""});
  const changeHandler = (e)=>{
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      await API.post("/auth/register", form);
      alert("User Registration Successful");
      navigate("/login");
    } 
    catch(error){
      alert(error.response?.data?.message || error.message || "Registration failed");    }
  };

  return(
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 shadow-md rounded w-80"
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={changeHandler}
          className="border p-2 w-full mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeHandler}
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeHandler}
          className="border p-2 w-full mb-3"
        />

        <button className="bg-blue-600 text-white w-full p-2">Register</button>
      </form>
    </div>
  );
}

export default Register;