import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function submit(e) {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    try {
      await axios.post(`https://backend-convertapp.vercel.app/signup`, {
        email,
        password,
      });
      // After successful sign-up, navigate to the home page
      navigate("/home", { state: { id: email } });
    } catch (err) {
      console.log("error occurred" + err);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-[100vh] bg-gradient-to-r bg-neutral-900 md:px-4">
      <h1 className="text-center text-3xl font-semibold font-serif text-white">
        {" "}
        Word <span className="text-blue-500 font-sans font-extrabold">
          To
        </span>{" "}
        PDF
      </h1>
      <div className="p-7 bg-white text-white rounded-lg md:w-full md:max-w-md ">
        <h1 className="text-center mb-5 font-semibold text-2xl text-black font-mono">
          Signup
        </h1>
        <form action="POST" className="flex flex-col gap-5">
          <input
            className="p-2 rounded border-[1px] border-neutral-700 text-black"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          {emailError && (
            <p className="text-red-500 font-semibold">{emailError}</p>
          )}
          <input
            className="p-2 rounded border-[1px] border-neutral-700 text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="submit"
            className="p-3 bg-blue-500 hover:bg-blue-700 cursor-pointer"
            onClick={submit}
          />
        </form>
        <br />
        <p className="text-center text-black font-serif">OR</p>
        <br />
        <div className="text-center">
          <Link to="/" className="text-black font-mono hover:text-neutral-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
