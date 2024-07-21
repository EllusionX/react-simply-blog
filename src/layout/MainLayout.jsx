import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

const MainLayout = () => {
  useScrollToTop();
  return (
    <>
      <Navbar />
      {/* <ToastContainer /> */}
      <ToastContainer position="top-center" />
      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default MainLayout;

export async function blogsLoader() {
  const res = await fetch("http://localhost:8000/blogs");

  return res.json();
}
