import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants";

const Header = () => {
  return (
    <>
      <header className="w-full text-gray-700 bg-white border-gray-100 shadow-lg mb-4">
        <div className="container flex flex-col p-6 mx-auto">
          <nav className="flex flex-wrap gap-4 items-center justify-center text-base font-medium">
            <NavLink
              to={ROUTES.task_description.route}
              className={(navData) =>
                navData.isActive
                  ? "text-white bg-indigo-600 focus:outline-none  px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
                  : "text-gray-600 border border-white bg-gray-50 focus:outline-none cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
              }
            >
              Описание тестового задания
            </NavLink>
            <NavLink
              to={ROUTES.task_completed.route}
              className={(navData) =>
                navData.isActive
                  ? "text-white bg-indigo-600 focus:outline-none cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
                  : "text-gray-600 border border-white bg-gray-50 focus:outline-none cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
              }
            >
              Результат
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
