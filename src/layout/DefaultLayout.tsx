import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const DefaultLayout = () => {
  return (
    <>
      <div className="items-center justify-center min-h-screen">
        <Header />
        <div className="max-w-3xl w-full px-2 mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
