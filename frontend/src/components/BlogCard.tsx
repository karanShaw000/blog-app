import { BlogType } from "../pages/Home";
import AuthorBlogDetails from "./AuthorBlogDetails";

const BlogCard = ({ createdAt, author, content, title }: BlogType) => {
  return (
    <div className="px-4 py-2 rounded-lg space-y-2 border-2 ">
      <AuthorBlogDetails authorName={author.name} createdAt={createdAt} />
      <p className="font-bold text-4xl">{title}</p>
      <p>{`${content.slice(0, 100)}...`}</p>
    </div>
  );
};

export default BlogCard;
