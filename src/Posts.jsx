import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";

export default function Posts() {
  const token = localStorage.getItem("token");
  const [userPost, setUserPost] = useState("");

  const navigate = useNavigate();

  async function getPost() {
    try {
      const response = await fetch(
        `https://dummyjson.com/users/${localStorage.getItem("id")}/posts`
      );
      const data = await response.json();
      setUserPost(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    token ? "" : navigate("/login");
    getPost();
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-14">
        {userPost?.posts?.map((post) => (
          <div
            key={post?.id}
            className="p-5 max-w-[700px] mx-auto flex flex-col"
          >
            <b>{post?.title}</b>
            <div>body {post?.body}</div>
            <div className="flex gap-4 my-2">
              {post?.tags.map((tag, i) => (
                <div
                  key={i}
                  className="border border-gray-400 text-gray-700 p-1 text-sm rounded-md"
                >
                  #{tag}
                </div>
              ))}
            </div>
            <div className="border border-slate-400  rounded-md w-fit p-1">
              <FontAwesomeIcon
                icon={faSmile}
                className="mr-1 text-yellow-500"
              />
              {post?.reactions}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
