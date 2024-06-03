"use client";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useRef } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Home() {
  const clearRef = useRef();
  const [Email, setEmail] = useState("");
  const [ReadyToUpload, setReadyToUpload] = useState(false);
  const [File, setFile] = useState();
  const [AllFiles, setAllFiles] = useState([]);

  useEffect(() => {
    let mail = window.localStorage.getItem("email");
    if (!mail) {
      window.location.href = "/signin";
    }
    setEmail(mail);
  }, []);

  const checkFileSize = (e) => {
    const file = e.target.files[0];
    // file size should not be more than 1MB
    if (file.size > 1048576) {
      alert("File size must be less than 1MB");
      e.target.value = "";
      // e.target.files[0] = null;
    } else {
      setFile(file);
      alert("File is Ready to Upload, Click on Upload Button");
      setReadyToUpload(true);
    }
  };

  const uploadFile = () => {
    const data = new FormData();

    data.append("file", File);
    // write code to upload file to server using fetch api post method
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/upload`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        setAllFiles((val) => {
          return [data, ...val];
        });
        alert("File Uploaded Successfully");
        clearRef.current.click();
      })
      .catch((err) => {
        alert("Error in Uploading File");
        console.log(err);
        clearRef.current.click();
      });
  };

  const fetchAllFiles = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/allfiles`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: Email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllFiles(data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);

  return (
    <>
      <Navbar email={Email} />

      <div className="bg-black  w-full h-max text-gray-400 flex flex-col justify-center items-center  gap-10 py-10">
        <p className="text-4xl font-bold">File Manager</p>
        <div className="h-max relative">
          <button
            ref={clearRef}
            onClick={() => {
              setFile(null);
              setReadyToUpload(false);
              document.querySelector("#file-input").value = "";
            }}
            className="absolute right-0 -top-6 underline underline-offset-1"
          >
            Clear File
          </button>
          <input
            id="file-input"
            accept="image/*"
            onChange={(e) => checkFileSize(e)}
            type="file"
            className="block file-input file-input-bordered file-input-success w-full max-w-xs"
          />
          <p className="text-xs my-2 text-center capitalize">
            File Must be iamge type & less than 1MB
          </p>
        </div>
        <button
          onClick={() => {
            uploadFile();
          }}
          className={` font-bold py-3 px-6 rounded-full bg-indigo-500 ${
            ReadyToUpload ? "brightness-110" : " brightness-0"
          } shadow-lg shadow-indigo-500/50 text-white
        flex flex-row justify-center items-center gap-5`}
        >
          <p className="text-sm font-medium">Upload File</p>
          <MdDriveFolderUpload className="text-2xl" />
        </button>
      </div>

      <div className="mb-20">
        <p className="text-3xl font-extrabold py-10 capitalize text-center">
          File Gallery
        </p>
        <div className="container w-full max-w-4xl mx-auto border p-4">
          <div className="flex flex-row justify-center items-center flex-wrap gap-10">
            {AllFiles.length === 0 && (
              <p className="text-2xl font-bold text-center">
                No Files Uploaded Yet
              </p>
            )}
            {AllFiles.map((fileurl, index) => {
              return (
                <div
                  key={index}
                  className="relative rounded-lg shadow-lg shadow-slate-700"
                >
                  <div className="absolute z-10 right-0 m-2 flex gap-2">
                    <a
                      href={fileurl}
                      download={true}
                      className="p-1 bg-white rounded-full  border shadow-xl shadow-black  hover:scale-105 active:scale-95"
                    >
                      <HiOutlineDownload className="text-lg" />
                    </a>
                    {/* <button className="p-1 bg-red-500 text-white rounded-full border shadow-xl shadow-black  hover:scale-105 active:scale-95">
                      <RiDeleteBin6Line className="text-lg" />
                    </button> */}
                  </div>

                  <div key={index} className="relative w-60 h-40 aspect-auto ">
                    <Image
                      src={fileurl}
                      fill
                      className="rounded-lg object-cover bg-center w-max "
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
