import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa6";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertStatus, setConvertStatus] = useState(""); // Renamed from 'convert'
  const [downloadError, setDownloadError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFilechange = (e) => {
    setSelectedFile(e.target.files[0]);
    setConvertStatus(""); // Clear the previous convert status
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvertStatus("Please select a file");
      return;
    }
    setIsLoading(true);
    setConvertStatus(""); // Clear the previous convert status
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        `http://localhost:3000/convertFile`,
        formData,
        {
          responseType: "blob",
        }
      );
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const link = document.createElement("a");
      console.log(link);
      link.href = url;
      console.log(link);
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      console.log(link);
      document.body.appendChild(link);
      console.log(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvertStatus("File Converted Successfully ✅");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setDownloadError("Error occurred: ", error.response.data.message);
      } else {
        setConvertStatus("");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto container px-6 py-3 items-center md:px-40  bg-neutral-900 ">
        <div className=" flex justify-center items-center h-[90vh] ">
          <div className=" border-2 border-dashed px-4 py-2 md:px-8 md:py-6 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] border-indigo-400 rounded-lg    ">
            <h1 className=" text-3xl font-bold text-center mb-4 text-white ">
              Convert Word To PDF online
            </h1>
            <p className=" text-sm text-center mb-5  text-white">
              Easily convert Word documents to PDF format online, without having
              to install any software.
            </p>
            <div className=" flex flex-col items-center space-y-4  ">
              <input
                type="file"
                accept=".docx"
                onChange={handleFilechange}
                className=" hidden"
                id="FileInput"
              />
              <label
                htmlFor="FileInput"
                className=" w-full flex  items-center hover:font-semibold hover:text-white justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-xl cursor-pointer border-blue-400  hover:bg-blue-700 duration-300 "
              >
                <FaFileWord className="  text-4xl mr-3  " />
                <span className=" text-2xl m-2   ">
                  {selectedFile ? selectedFile.name : "Choose File"}
                </span>
              </label>
              <button
                disabled={!selectedFile || isLoading}
                onClick={handleSubmit}
                className=" disabled:bg-gray-400 disabled:pointer-events-none text-white bg-blue-700 hover:bg-blue-500 hover:scale-110   duration-300 font-bold px-4 py-2 rounded-lg  "
              >
                {isLoading ? "Converting..." : "Convert File"}
              </button>
              {convertStatus &&
                !isLoading && ( // Display convert status when not loading
                  <div className=" text-green-500 text-center font-semibold  font-mono   ">
                    {" "}
                    {convertStatus}{" "}
                  </div>
                )}
              {downloadError && (
                <div className=" text-red-500 text-center font-semibold font-mono ">
                  {" "}
                  {downloadError}{" "}
                </div>
              )}
              {isLoading && ( // Display loading message when loading
                <div className="text-white text-center font-semibold font-mono">
                  Converting file...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
