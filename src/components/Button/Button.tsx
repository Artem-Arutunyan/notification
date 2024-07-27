import classNames from "classnames";
import { FC, ReactNode } from "react";

interface ButtonProps {
  color?: "purple" | "cyan" | "orange" | "green" | "pink";
  onClick: (value: unknown) => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ onClick, color, children }) => {
  return (
    <>
      <button
        type="button"
        className={classNames(
          "text-gray-900  border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center min-w-52 justify-center  bg-white  shadow-sm ring-1 sm:w-auto ring-gray-300 hover:bg-indigo-600 hover:text-white",
          color === "purple" &&
            "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-blue-300",
          color === "cyan" &&
            "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300",
          color === "orange" &&
            "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-pink-200",
          color === "green" &&
            "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-green-200",
          color === "pink" &&
            "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-purple-200"
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
