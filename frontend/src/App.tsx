import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import NewBlog from "./pages/NewBlog";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "blog/:blogId",
          element: <Blog />,
        },
        {
          path: "new",
          element: <NewBlog />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
