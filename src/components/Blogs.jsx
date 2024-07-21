import BlogCard from "./BlogCard";

const Blogs = ({ isHome = false, blogsData }) => {
  const blogs = blogsData;

  const sortBlog = blogs.sort((a, b) => {
    if (Number(a.id) > Number(b.id)) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <section className="max-w-3xl mx-auto">
      {isHome
        ? sortBlog.slice(0, 3).map((b) => <BlogCard key={b.id} blog={b} />)
        : sortBlog.map((b) => <BlogCard key={b.id} blog={b} />)}
    </section>
  );
};
export default Blogs;
