import { useEffect, useState } from "react";
import AuthorIcon from "../components/AuthorIcon";
import { BlogType } from "./Home";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import timer from "../utils/timer";
import BlogLoading from "@/components/loading/BlogLoading";

const Blog = () => {
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const param = useParams();
  useEffect(() => {
    async function getBlog() {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/blog/${param.blogId}`
        );
        setBlog(res.data.post);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getBlog();
  }, [param]);
  return (
    <>
      {isLoading && <BlogLoading />}
      {!isLoading && (
        <section className="max-w-screen-xl w-[80%] mx-auto py-6  grid grid-cols-[70%_20%] justify-between">
          <div className="space-y-3">
            <h1 className="text-6xl font-bold">{blog?.title}</h1>
            <p className="text-slate-500">{`Posted ${timer(
              blog?.createdAt
            )}`}</p>
            <p className="text-xl">{blog?.content}</p>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-bold">Author</p>
            <div className="flex justify-start tems-center space-x-2">
              <AuthorIcon username={`${blog?.author.name || "Anonymous"}`} />
              <p className="flex justify-center items-center">{`${
                blog?.author.name || "Anonymous"
              }`}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Blog;
