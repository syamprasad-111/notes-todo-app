import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../api/axios";

function Login(){
  const navigate=useNavigate();
  const [form,setForm]=useState({ email:"", password:""});

  const changeHandler=(e)=>{
    setForm({...form, [e.target.name]: e.target.value});
  };

  const submitHandler=async (e)=>{
    e.preventDefault();
    try{
      const {data} = await API.post("/auth/login", form);
      // store user login data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/todos");
      window.location.reload();
    } 
    catch(error){
      alert(error.response?.data?.message || error.message || "Login failed");
    }
  };

  return(
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={submitHandler}
        className="bg-white p-6 shadow-md rounded w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

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

        <button className="bg-blue-600 text-white w-full p-2">Login</button>
      </form>
    </div>
  );
}

export default Login;