import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaRegEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import { toast } from "react-toastify";

const Blog = () => {
  const blog = useLoaderData();
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  const handleOpenModal = (isShowModel = true) => {
    dialogRef.current.showModal();
    document.body.style.overflow = "hidden";

    if (!isShowModel) {
      dialogRef.current.close();
      document.body.style.overflow = "";
    }
  };

  const handleDeletePost = () => {
    handleOpenModal(false);

    const deletePost = async () => {
      const res = await fetch(`http://localhost:8000/blogs/${blog.id}`, {
        method: "DELETE",
      });

      //toast message
      toast.success("Post Deleted Successfully");

      // navigate to archives page
      navigate("/archives");
    };

    deletePost();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="relative backdrop:bg-black/50 p-5 rounded-md text-center overflow-visible"
      >
        <FaTrashAlt className="mx-auto text-4xl text-red-500 mb-5" />
        <p>Are you sure you want to delete this post?</p>
        <p className="font-bold mb-5">{`"${blog.title}"`}</p>
        <div>
          <button
            className="border-2 border-gray-200 py-1 px-2 mr-2 rounded-md hover:bg-gray-200"
            onClick={() => handleOpenModal(false)}
          >
            Cancel
          </button>
          <button
            className="border-2 border-red-500 py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-700 hover:border-red-700"
            onClick={() => {
              handleDeletePost();
            }}
          >
            Delete
          </button>
        </div>
        <button
          className="absolute -top-2 -right-2 z-1 rounded-full p-2 bg-gray-200 hover:bg-gray-300"
          onClick={() => handleOpenModal(false)}
          aria-label="close"
        >
          <FaTimes />
        </button>
      </dialog>
      <section className="flex justify-center p-5 mx-auto sm:max-w-3xl">
        <article className="min-w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="font-bold text-4xl">{blog.title}</h1>
              <Link
                className="mx-3 mt-1 text-2xl hover:text-red-500"
                to={`/editblog/${blog.id}`}
              >
                <FaRegEdit />
                <span className="sr-only">Edit</span>
              </Link>
            </div>
            <button
              className="shrink mx-3 mt-1 text-xl hover:text-red-500"
              onClick={handleOpenModal}
              aria-label="delete"
            >
              <FaTrashAlt />
            </button>
          </div>

          <div className="mb-3">
            <span className="text-sm">
              By: {blog.author}, {blog.date}
            </span>
          </div>
          <div
            className="prose-h2:font-bold prose-h2:text-2xl prose-h3:font-bold prose-h3:text-xl"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />
        </article>
      </section>
    </>
  );
};
export default Blog;

export async function blogDetailLoader({ params }) {
  const { id } = params;
  const res = await fetch(`http://localhost:8000/blogs/${id}`);

  return res.json();
}
