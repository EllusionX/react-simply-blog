import { useForm } from "react-hook-form";
import { useNavigate, useSubmit } from "react-router-dom";
import TipTap from "../components/TipTap";
import { useState } from "react";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [description, setDescription] = useState("");
  const [isLink, setIsLink] = useState(false);
  const navigate = useNavigate();
  const submit = useSubmit();

  const date = new Date();
  const newDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: date.getTime().toString(),
      title: "",
      body: "",
      author: "Ellusion",
      date: newDate.toString(),
    },
  });

  const onSubmit = (data) => {
    // sanitize data and store it to data.js file
    data.body = DOMPurify.sanitize(description);

    const newPost = async (data) => {
      const res = await fetch("http://localhost:8000/blogs", {
        method: "POST",
        encType: "application/json",
        body: JSON.stringify(data),
      });

      //toast message
      toast.success("Post Added Successfully");

      // navigate to home page
      navigate("/home");
    };

    newPost(data);
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
          New Post
        </label>
        <input
          type="text"
          name="title"
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
export default AddBlog;
