import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout, { blogsLoader } from "./layout/MainLayout.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import Home, { homeLoader } from "./pages/Home.jsx";
import Archives from "./pages/Archives.jsx";
import Blog, { blogDetailLoader } from "./pages/Blog.jsx";
import EditBlog from "./pages/EditBlog.jsx";
import NotFound404 from "./pages/NotFound404.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound404 />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: blogsLoader,
      },
      {
        path: "/home",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/archives",
        element: <Archives />,
        loader: blogsLoader,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
        loader: blogDetailLoader,
      },
      {
        path: "/addBlog",
        element: <AddBlog />,
      },
      {
        path: "/editBlog/:id",
        element: <EditBlog />,
        loader: blogDetailLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
