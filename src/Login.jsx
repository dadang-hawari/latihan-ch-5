import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Navbar from "./Navbar";

export default function Login() {
  const [isPasswordShowed, setIsPasswordShowed] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUserNameNull, setIsUserNameNull] = useState(true);
  const [isUserPasswordNull, setIsUserPasswordNull] = useState(true);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setIsPasswordShowed(!isPasswordShowed);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const resetInputErrors = () => {
    setIsUserNameNull(true);
    setIsUserPasswordNull(true);
  };

  async function getData() {
    try {
      if (username.trim() && password.trim()) {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log("data", data);
        if (response.ok) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          alert("User not registered");
        }
        resetInputErrors();
      } else {
        if (!username.trim()) setIsUserNameNull(false);
        if (!password.trim()) setIsUserPasswordNull(false);
        setTimeout(resetInputErrors, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <Navbar />
      <form
        className="max-w-[300px] mt-10 w-full mx-auto flex flex-col gap-y-5 pt-12"
        onSubmit={handleFormSubmit}
      >
        <div className="relative">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Input your username"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-11 border border-black indent-2 focus:border-slate-800 outline-none rounded-md p-2"
          />
          <p
            className={
              isUserNameNull ? "hidden" : "text-red-500 absolute -bottom-6"
            }
          >
            Please input your username
          </p>
        </div>
        <div className="relative">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type={isPasswordShowed ? "text" : "password"}
            placeholder="Input your password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 border border-black indent-2 focus:border-slate-800 outline-none rounded-md p-2"
          />
          <button
            onClick={handleShowPassword}
            type="button"
            className="absolute right-0 bottom-[2px] p-2 rounded-e-md"
          >
            <FontAwesomeIcon
              icon={isPasswordShowed ? faEyeSlash : faEye}
              height="32"
              width="32"
            />
          </button>
          <p
            className={
              isUserPasswordNull ? "hidden" : "text-red-500 absolute -bottom-6"
            }
          >
            Please input your password
          </p>
        </div>
        <button
          type="submit"
          className="w-full h-11 bg-slate-800 font-medium text-white p-2 rounded-md mt-2"
        >
          Masuk
        </button>
      </form>
    </>
  );
}
