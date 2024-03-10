import timer from "../utils/timer";
import AuthorIcon from "./AuthorIcon";

const AuthorBlogDetails = ({
  createdAt,
  authorName,
}: AuthorBlogDetailsInterface) => {
  return (
    <div className="flex justify-start items-center  space-x-3">
      <AuthorIcon username={authorName || "Anonymous"} />
      <div className="text-lg">{authorName || "Anonymous"}</div>

      <div>{timer(createdAt)}</div>
    </div>
  );
};

export default AuthorBlogDetails;

interface AuthorBlogDetailsInterface {
  createdAt: Date;
  authorName: string;
}
