import { FC, useState } from "react";
import Task from "../Task/Task";
import { FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";
import { Column, Id, ITask } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


interface TaskColumnProps {
  column: Column;
  tasks: ITask[];
  deleteColumn: (id: Id) => void;
  updateColumnTitle: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (taskId: Id) => void;
  updateTask: (taskId: Id, content: string) => void;
}

const TaskColumn: FC<TaskColumnProps> = ({
  column,
  tasks,
  deleteColumn,
  updateColumnTitle,
  createTask,
  deleteTask,
  updateTask
}) => {
  //Стейт для редактирования названия заголовка столбца
  const [editTitle, setEditTitle] = useState(false);

  //Вытаскиваем хук useSortable
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column: column },
    disabled: editTitle, //это нужно для того, чтобы отключить функцию перетаскивания, когда мы редактируем имя заголовка таблицы, т.к. мы тянем за заголовок при перетаскивании
  });

  //стили для анимаций перемещения
  const style = {
    transition, //анимация при перестановке столбцов между друг другом
    transform: CSS.Translate.toString(transform), //анимация перетаскивания столбца
  };

  //Это условие для того, чтобы когда мы тащим колонку, то на её месте
  //отображалась она сама же, только с прозрачностью, пока мы перетаскиваем
  //Копируем весь наш столбец со всеми стилями и добавляем прозрачность и зеленые края
  if (isDragging) {
    return (
      <div
        className=" flex flex-col min-w-64 opacity-30 border-2 border-green-800"
        ref={setNodeRef}
        style={style}
      >
        <div className="flex p-2 w-full cursor-pointer rounded-t bg-gray-300 justify-between hover:bg-green-100">
          <h3 className="text-sm">{column.title}</h3>
          <button
            onClick={() => deleteColumn(column.id)}
            className="hover:bg-red-400 rounded"
          >
            <FaRegTrashAlt />
          </button>
        </div>
        <div className="rounded-b bg-gray-400 w-full p-2 mr-3 pt-4">
          <div className="text-sm mt-2">
             {tasks.map((task) => {
              return <Task updateTask={updateTask} deleteTask={deleteTask} key={task.id} task={task} />;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    // ref={setNodeRef} style={style} указывается на тот элемент, который будет перемещаться
    //в нашем случае весь столбец перемещаем
    <div className=" flex flex-col min-w-64" ref={setNodeRef} style={style}>
      {/* Заголовок колонки */}
      {/* {...attributes} и {...listeners} указывается на тот элемент, нажимая на который мы хотим перетаскивать */}
      <div
        className="flex p-2 w-full cursor-pointer rounded-t bg-gray-300 justify-between hover:bg-green-100"
        {...attributes}
        {...listeners}
        //Активируем изменение заголовка двойным кликом
        onDoubleClick={() => setEditTitle(true)}
      >
        <h3
          className="text-sm"
          //Сохранение по нажатию Enter
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setEditTitle(false);
          }}
        >
          {/* Изменение заголовка */}
          {!editTitle && column.title}
          {editTitle && (
            <input
              autoFocus
              onBlur={() => setEditTitle(false)}
              value={column.title}
              // Функция для изменения заголовка в стейте именно для этой таблицы
              onChange={(e) => updateColumnTitle(column.id, e.target.value)}
            />
          )}
        </h3>
        <button
          onClick={() => deleteColumn(column.id)}
          className="hover:bg-red-400 rounded"
        >
          <FaRegTrashAlt />
        </button>
      </div>
      {/* Заголовок колонки */}

      <button
          onClick={() => createTask(column.id)}
          className="flex flex-row gap-2 p-2 h-7 justify-center items-center bg-gray-400 hover:bg-green-700"
        >
          <FaPlusCircle />
          <p className="text-sm">Добавить задачу</p>
        </button>
      <div className="rounded-b bg-gray-400 w-full p-2">
        <div className="text-sm">
          {tasks.map((task) => {
            return <Task updateTask={updateTask} deleteTask={deleteTask} key={task.id} task={task} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;
