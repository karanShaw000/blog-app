import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";
import BlogCardLoading from "@/components/loading/BlogCardLoading";

const Home = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getBlogs() {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog`);
        setBlogs(response.data.postList);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getBlogs();
  }, []);
  return (
    <>
      {
        <div>
          {isLoading && (
            <ul className="max-w-6xl mx-auto space-y-4 py-4">
              <li>
                <BlogCardLoading />
              </li>
              <li>
                <BlogCardLoading />
              </li>
              <li>
                <BlogCardLoading />
              </li>
            </ul>
          )}
          {!isLoading && (
            <ul className="max-w-6xl mx-auto space-y-4 py-4">
              {blogs?.map((blog) => (
                <li>
                  <Link to={`/blog/${blog.id}`}>
                    <BlogCard
                      id={blog.id}
                      title={blog.title}
                      content={blog.content}
                      createdAt={blog.createdAt}
                      author={blog.author}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      }
    </>
  );
};

export default Home;

export type BlogType = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
  };
};
