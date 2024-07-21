import { Link } from "react-router-dom";
import Blogs from "../components/Blogs";
import Hero from "../components/Hero";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const blogsData = useLoaderData();

  return (
    <>
      <Hero isHome={true} />
      <Blogs isHome={true} blogsData={blogsData} />
      <Link
        to="/archives"
        className="max-w-80 mx-auto text-center block border-solid border-2 border-sky-500 rounded-md px-2 py-1 hover:bg-sky-500 hover:text-white"
      >
        Load More
      </Link>
    </>
  );
};
export default Home;

export async function homeLoader() {
  const res = await fetch("http://localhost:8000/blogs");

  return res.json();
}
