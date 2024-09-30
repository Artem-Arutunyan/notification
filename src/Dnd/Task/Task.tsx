import { FC, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Id, ITask } from "../types";
import TextareaAutosize from "react-textarea-autosize";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: ITask;
  deleteTask: (taskId: Id) => void;
  updateTask: (taskId: Id, content: string) => void;
}

const Task: FC<TaskProps> = ({ task, deleteTask, updateTask }) => {
  //Стейт для изменений при наведении мыши
  const [mouseOver, setMouseOver] = useState(false);

  //Стейт для изменения текста задачи
  const [editTask, setEditTask] = useState(false);

  //Ф-ия для отображения инпута изменения текста задачи
  const toggleEdit = () => {
    setEditTask((prev) => !prev);
    setMouseOver(false); //это чтобы при нажатии на поле с текстом исчез значок удаления
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task: task },
    disabled: editTask, //это нужно для того, чтобы отключить функцию перетаскивания, когда мы редактируем имя заголовка таблицы, т.к. мы тянем за заголовок при перетаскивании
  });

  //стили для анимаций перемещения
  const style = {
    transition, //анимация при перестановке столбцов между друг другом
    transform: CSS.Translate.toString(transform), //анимация перетаскивания столбца
  };

  if (isDragging) {
    return (
      <div
        className="opacity-40 border-2 border-green-300 flex flex-row justify-between items-center bg-white p-2 rounded border-b mt-1 cursor-pointer"
        style={style}
        ref={setNodeRef}
      >
        <p className="my-auto h-auto w-48 overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
          {!editTask && task.content}
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-row justify-between items-center bg-white p-2 rounded border-b mt-1 border-gray-500 cursor-pointer hover:bg-teal-500"
      // Меняем стейт при наведении на область и выходе из неё
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onDoubleClick={toggleEdit}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <p className="my-auto h-auto w-48 overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
        {!editTask && task.content}
        {editTask && (
          <TextareaAutosize
            autoFocus
            value={task.content}
            onBlur={() => setEditTask(false)}
            onKeyDown={(e) => {
              //Условие, чтобы при нажатии на другие клавиши не закрывать инпут
              //Только при нажатии на Shift+Enter сработает toggleEdit и editTask станет false
              if (e.key === "Enter" && e.shiftKey) {
                return toggleEdit();
              }
            }}
            onChange={(e) => updateTask(task.id, e.target.value)}
          />
        )}
      </p>

      {mouseOver && (
        <button
          className="hover:bg-red-400 p-1 rounded"
          onClick={() => deleteTask(task.id)}
        >
          <AiOutlineMinusCircle />
        </button>
      )}
    </div>
  );
};

export default Task;
