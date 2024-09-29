import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const DefaultLayout = () => {
  return (
    <>
      <div className="items-center justify-center min-h-screen">
        <Header />
        <div className="bg-blue-400 max-w-7xl w-full px-2 mx-auto overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
