import { useForm } from "react-hook-form";
import { useSubmit, useLoaderData, useNavigate } from "react-router-dom";
import TipTap from "../components/TipTap";
import { useState } from "react";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

const EditBlog = () => {
  const blog = useLoaderData();

  const [description, setDescription] = useState(blog.body);
  const [isLink, setIsLink] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: blog.id,
      title: blog.title,
      body: blog.body,
      author: "Ellusion",
      date: blog.date,
      time: blog.time,
    },
  });

  const onSubmit = (data) => {
    // sanitize data
    data.body = DOMPurify.sanitize(description);

    // submit data to json
    const updateBlog = async (data) => {
      const res = await fetch(`http://localhost:8000/blogs/${blog.id}`, {
        method: "PUT",
        encType: "application/json",
        body: JSON.stringify(data),
      });

      //toast message
      toast.success("Post Updated Successfully");

      // navigate to blog/:id
      navigate(`/blog/${blog.id}`);
    };

    updateBlog(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto md:my-10"
    >
      <div>
        <label
          htmlFor="new-title-post"
          className="sm:border-2 sm:border-b-0 sm:border-t-0 md:border-t-2 bg-gray-100 block p-4 font-bold text-lg "
        >
          Update Post
        </label>
        <input
          type="text"
          id="new-title-post"
          className="block min-w-full p-2 border-2 border-b-0 focus:outline-sky-500"
          {...register("title", {
            required: {
              value: true,
              message: "Cannot be empty",
            },
          })}
          placeholder="Enter a blog title"
        />
      </div>

      <TipTap
        description={description}
        setDescription={setDescription}
        isLink={isLink}
        setIsLink={setIsLink}
      />
      <input
        type="submit"
        className={
          isLink
            ? "block border-2 bg-sky-500 text-white rounded-md px-2 py-1 w-full my-5 cursor-not-allowed opacity-25"
            : "block border-2 border-sky-500 rounded-md px-2 py-1 w-full my-5 hover:bg-sky-500 hover:text-white hover:cursor-pointer"
        }
        disabled={isLink}
      />
    </form>
  );
};
export default EditBlog;
