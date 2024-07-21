import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <article className="m-5 p-2 sm:p-5 border-2 rounded-md">
      <Link to={`/blog/${blog.id}`}>
        <h2 className="font-bold text-lg sm:text-2xl">{blog.title}</h2>
      </Link>
      <div className="mb-3">
        <span className="text-sm">
          By: {blog.author}, {blog.date}
        </span>
      </div>
      <div
        className="prose-h2:font-bold prose-h2:text-2xl prose-h3:font-bold prose-h3:text-xl"
        dangerouslySetInnerHTML={{ __html: `${blog.body.slice(0, 80)}...` }}
      />
      <Link
        to={`/blog/${blog.id}`}
        className="text-sky-500 text-xs sm:text-base"
      >
        Read More
      </Link>
    </article>
  );
};
export default BlogCard;
