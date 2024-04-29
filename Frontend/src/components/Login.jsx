import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post(`https://backend-convertapp.vercel.app/`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            history("/home", { state: { id: email } });
          } else if (res.data == "notexist") {
            alert("User have not sign up");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-[100vh] bg-gradient-to-r bg-neutral-900 md:px-4">
      <h1 className="text-center text-3xl font-semibold font-serif text-white">
        {" "}
        Word <span className="text-blue-500 font-sans font-extrabold ">
          To
        </span>{" "}
        PDF
      </h1>
      <div className="p-7 bg-white text-white rounded-lg md:w-full md:max-w-md">
        <h1 className="text-center mb-5 font-semibold text-2xl text-black font-mono">
          Login
        </h1>
        <form action="POST" className="flex flex-col gap-5">
          <input
            className="p-2 rounded border-[1px] border-neutral-700 text-black"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            className="p-2 rounded border-[1px] border-neutral-700 text-black"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
          <Link
            to="/signup"
            className="text-black font-mono hover:text-neutral-700"
          >
            SignUp Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
