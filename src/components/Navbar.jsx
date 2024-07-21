import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <nav className="max-w-6xl mx-auto flex justify-between items-center p-5 bg-white border-b-2">
          <NavLink to="/home">
            <h1 className="font-bold text-2xl">S.Blog</h1>
          </NavLink>
          <NavLink
            to="/addBlog"
            className="flex justify-center items-center border-solid border-2 border-sky-500 rounded-md px-2 py-1 hover:bg-sky-500 hover:text-white"
          >
            <FaRegEdit className="mr-1 " />
            Write
          </NavLink>
        </nav>
      </header>
    </>
  );
};
export default Navbar;
