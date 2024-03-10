import { Link } from "react-router-dom";
import AuthorIcon from "./AuthorIcon";
import Button from "./ui/Button";

const NavBar = () => {
  return (
    <div className="flex px-6 py-6 justify-between items-center text-xl">
      <p>
        <Link to={"/"}>Blog App</Link>
      </p>
      {!localStorage.getItem("token") && (
        <div className="flex justify-between items-center space-x-4">
          <p>
            <Link to={"/signin"}>Sign In</Link>
          </p>

          <p>
            <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      )}

      {localStorage.getItem("token") && (
        <div className="flex justify-between items-center space-x-4">
          <Link to={"/new"} className="bg-green-500 px-3 py-2 rounded-md">
            Publish
          </Link>

          <button
            className="bg-green-500 px-3 py-2 rounded-md"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              location.reload();
            }}
          >
            Log Out
          </button>
          <AuthorIcon username={localStorage.getItem("username") || "User"} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
