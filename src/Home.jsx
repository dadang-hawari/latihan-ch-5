import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  async function getCurrentAuthUser() {
    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data);
        localStorage.setItem("id", data.id);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.log("authorize", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    token ? "" : navigate("/login");
    getCurrentAuthUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-slate-800 pt-11">
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[1104px] w-full mx-auto pt-11 px-5 ">
          <div>
            <h2 className="text-3xl text-center font-medium w-fit mx-auto mb-4 ">
              Welcome {userData?.firstName} {userData?.lastName}
            </h2>
            <img
              src={userData?.image}
              alt={userData?.username}
              className="max-w-[300px] w-full h-auto mx-auto shadow-md rounded-md"
            />
          </div>
          <div className="w-fit mx-auto text-xl leading-9 mt-3 rounded-md">
            <h2 className="underline font-bold">Your profile</h2>
            <h3>
              <span className="font-medium">Name : </span> {userData?.firstName}{" "}
              {userData?.lastName}
            </h3>
            <div>
              <span className="font-medium">Address : </span>
              {userData?.address?.address}
            </div>
            <div>
              <span className="font-medium">City : </span>
              {userData?.address?.city}
            </div>
            <div>
              <span className="font-medium">Age : </span> {userData?.age}
            </div>
            <p>
              <span className="font-medium">Phone Number: </span>
              {userData?.phone}
            </p>
            <p>
              <span className="font-medium">University : </span>
              {userData?.university}
            </p>
            <p>
              <span className="font-medium">Weight : </span> {userData?.weight}
            </p>
            <p>
              <span className="font-medium">Gender : </span> {userData?.gender}
            </p>
            <div>
              <span className="font-medium">Hair : </span>
              {userData?.hair?.color} |{" "}
              <span className="font-medium">Type : </span>{" "}
              {userData?.hair?.type}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
