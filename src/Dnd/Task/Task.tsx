import { FC } from "react";

interface TaskProps {
  text: string;
}

const Task: FC<TaskProps> = ({ text }) => {
  return (
    <div className="bg-white p-2 rounded border-b mt-1 border-gray-500 cursor-pointer hover:bg-teal-500">
      {text}
    </div>
  );
};

export default Task;
