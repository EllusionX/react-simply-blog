import Blogs from "../components/Blogs";
import Hero from "../components/Hero";
import { useLoaderData } from "react-router-dom";

const Archives = () => {
  const blogsData = useLoaderData();

  return (
    <>
      <Hero />
      <Blogs blogsData={blogsData} />
    </>
  );
};
export default Archives;
