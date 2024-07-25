import classNames from "classnames";
import { FC, ReactNode } from "react";

interface ButtonProps {
  color: "purple" | "cyan" | "orange" | "green" | "pink";
  onClick: (value: unknown) => void
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ onClick, color, children }) => {
  return (
    <>
      <button
        type="button"
        className={classNames(
          "text-white  border border-gray-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center min-w-52",
          color === "purple" &&
            "bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-blue-300",
          color === "cyan" &&
            "bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300",
          color === "orange" &&
            "bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-pink-200",
          color === "green" &&
            "bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-green-200",
          color === "pink" &&
            "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-purple-200"
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
