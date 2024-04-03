import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Login from "./Login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/posts",
      element: <Posts />,
    },
  ]);
  return <RouterProvider router={router} />;
}
