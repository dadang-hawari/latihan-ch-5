import { Link } from "react-router-dom";
export default function Navbar() {
  const token = localStorage.getItem("token");
  return (
    <div className="fixed w-full top-0">
      <ul className="flex font-medium justify-center gap-x-10 p-5 bg-slate-800 text-white ">
        {token ? (
          <li>
            <Link to="/">PROFILE</Link>
          </li>
        ) : (
          ""
        )}
        {token ? (
          <li>
            <Link to="/posts">POSTS</Link>
          </li>
        ) : (
          ""
        )}
        <li>
          <Link
            className="block mx-auto"
            to="/login"
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            {token ? "Logout" : "Login"}
          </Link>
        </li>
      </ul>
    </div>
  );
}
