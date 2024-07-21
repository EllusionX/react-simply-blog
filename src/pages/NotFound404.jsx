import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-2">
      <h1 className="text-6xl mb-5">Oops!</h1>
      <p className="text-2xl sm:text-4xl mb-2">404 - PAGE NOT FOUND</p>
      <p className="text-xl mb-10">
        Sorry, the page you are looking for does not exist
      </p>
      <Link
        to="/home"
        className="px-2 py-1 border-2 border-sky-500 rounded-md hover:bg-sky-500 hover:text-white "
      >
        Home
      </Link>
    </div>
  );
};
export default NotFound404;
