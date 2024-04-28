import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const email = location.state.id;
  const name = email.split('@')[0].toUpperCase() ; // Split the email by '@' and take the first part

  return (
    <>
      <div className=" max-w-screen-2xl mx-auto container px-6 py-3 items-center md:px-40 fixed shadow-2xl h-16 bg-white ">
        <div className=" flex justify-between ">
          <h1 className=" text-neutral-900 text-2xl cursor-pointer font-extrabold font-serif ">
            Word{" "}
            <span className=" text-3xl text-blue-500 font-sans ">To</span> PDF
          </h1>
          <h1 className=" text-neutral-900 text-2xl cursor-pointer font-bold hover:scale-125 duration-200 ">
            Hello {name}! {/* Display only the name part */}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;