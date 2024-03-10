import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_minmax(0,1fr)]  ">
      <NavBar />

      <Outlet />
    </div>
  );
};

export default RootLayout;
