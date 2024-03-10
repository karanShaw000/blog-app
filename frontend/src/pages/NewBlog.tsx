import { FormEvent, useState } from "react";
import Button from "../components/ui/Button";
import LabelledInput from "../components/ui/LabelledInput";
import { PostType } from "@karan000/common";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

const NewBlog = () => {
  const [blogInputs, setBlogInputs] = useState<PostType>({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const blogSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        blogInputs,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert(error);
      console.log(error);
    }
    console.log(blogInputs);
    setBlogInputs({ title: "", content: "" });
  };
  return (
    <section className="max-w-screen-xl py-6 mx-auto space-y-4">
      <h1 className="text-5xl">Create Your Blog Post</h1>
      <form className="space-y-6 " onSubmit={blogSubmitHandler}>
        <LabelledInput
          type="text"
          placeholder="Enter the Title for the blog post"
          onChange={(e) =>
            setBlogInputs((o) => {
              return { ...o, title: e.target.value };
            })
          }
        />
        <textarea
          rows={20}
          placeholder="Enter the content for this blog post"
          className="px-1 py-2 border w-full"
          onChange={(e) =>
            setBlogInputs((o) => {
              return { ...o, content: e.target.value };
            })
          }
        ></textarea>
        <Button type="submit">Publish</Button>
      </form>
    </section>
  );
};

export default NewBlog;
