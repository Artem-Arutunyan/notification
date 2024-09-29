import { useMemo, useState } from "react";
import TaskColumn from "./TasksColumn/TaskColumn";
import { Column, Id, ITask } from "./types";
import { generateId } from "./helpers";
import { FaRegPlusSquare } from "react-icons/fa";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const Board = () => {
  //Стейт для колонок
  const [columns, setColumns] = useState<Column[]>([
    { id: "123", title: "Список дел" },
  ]);

  //Стейт для задач внутри колонок
  const [tasks, setTasks] = useState<ITask[]>([]);
console.log(tasks);

  //Массив из id столбцов, для передачи в контекст SortableContext в items
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  //Когда мы начинаем перетаскивать колонку, то в activeColumn записывается объект колонки, которую таскаем {id: '123', title: 'Список дел'}
  const [activeColumn, setActiveColumn] = useState<Column | null>();

  //Добавление столбца
  const createNewColum = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Колонка №${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  //Удаление столбца
  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  };

  //Эта функция нужна, чтобы можно было перетаскивать столбец по всему экрану
  const onDragStart = (event: DragStartEvent) => {
    //Условие, если тип элемента "Column", который берется из хука useSortable из data
    if (event.active.data.current?.type === "Column") {
      //Когда мы начинаем перетаскивать колонку, то в activeColumn записывается объект колонки {id: '123', title: 'Список дел'}
      setActiveColumn(event.active.data.current.column);
      // return;
    }
  };

  //Эта функция нужна, чтобы можно было сохранять изменение положения столбца после перетаскивания
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    //Выходим из ф-ии, т.к. если нету over, то это означает, что мы не перетаскиваем элемент
    if (!over) {
      return;
    }

    const activeColumnId = active.id; //id перетаскиваемого столбца
    const overColumnId = over.id; //id столбца с которым меняем

    //Если взяли за столбец, но не перетащили его, то id до и после будут одинаковые
    if (activeColumnId === overColumnId) {
      return;
    }

    //Если active.id и over.id не равны, значит мы поменяли столбцы местами
    //Сохраняем их новые местоположения
    setColumns((prevColumns) => {
      //Получаем индекс активной колонки в массиве всех колонок columns
      const activeColumnIndex = prevColumns.findIndex(
        (el) => el.id === activeColumnId
      );

      //Получаем индекс второй колонки (с которой меняем местоположение) в массиве всех колонок columns
      const overColumnIndex = prevColumns.findIndex(
        (el) => el.id === overColumnId
      );

      //Теперь нам нужно поменять эти элементы местами в массиве
      //В библиотеке Dnd-kit уже есть готовая функция arrayMove() для этого
      //Просто передаем ей массив и индексы колонок, которые надо поменять местами
      return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
    });
  };

  //Решение проблемы с потерей активности кнопки удаления в заголовке столбца
  //Т.к. мы передали в элемент заголовка столбца {...attributes} и {...listeners}, то этот элемент используется для управления перемещениями
  //И нажать на button корзины для удаления столбца уже не получится, она перекрыта
  //Для решения этой проблемы используются сенсоры. Хук useSensors
  //Добавляем sensor в пропс DndContext
  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, //расстояние в пикселях, на которое надо перетащить столбец, чтобы началось перетаскивание
      },
    })
  );

  //Ф-ия изменения заголовка колонки
  const updateColumnTitle = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      //Если это не требуемая нам колонка, то мы оставляем её как есть
      if (col.id !== id) {
        return col;
      }
      //А если это колонка с нашей id, то задаем её новый title
      return { ...col, title };
    });

    setColumns(newColumns);
  };

  //Ф-ия создания задачи
  const createTask = (columnId: Id) => {
    const newTask: ITask = {
      id: generateId(),
      columnId,
      content: `Задача № ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  };

  //Ф-тя удаления задачи
  const deleteTask = (taskId: Id) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(newTasks);
  };

  //Ф-ия изменения текста задачи
  const updateTask = (taskId: Id, content: string) => {
    const newTasks = tasks.map((task)=>{
      if(task.id !== taskId) {
        return task;
      }
      return {...task, content}
    })

    setTasks(newTasks)
  }

  return (
    <div className=" w-full h-96 p-5">
      {/* Контекст DnD */}
      <DndContext
        sensors={sensor}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex flex-row gap-4 items-start">
          {/* Контекст для перемещения столбцов */}
          <SortableContext items={columnsId}>
            {columns.map((col) => {
              return (
                <TaskColumn
                  key={col.id}
                  column={col}
                  //Передаем задачи, который относятся именно к это столбцу по id
                  tasks={tasks.filter((task) => task.columnId == col.id)}
                  deleteColumn={deleteColumn}
                  updateColumnTitle={updateColumnTitle}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              );
            })}
          </SortableContext>
          {/* Контекст для перемещения столбцов */}
          <div>
            <button onClick={createNewColum} className="mr-3">
              <div className="w-64">
                <div className="flex p-2 w-full cursor-pointer rounded bg-gray-300 justify-center hover:bg-green-100">
                  <h3 className="flex flex-row gap-2 items-center text-sm">
                    <FaRegPlusSquare />
                    Добавить
                  </h3>
                </div>
              </div>
            </button>
          </div>
        </div>
        {/* Необходим для возможности перетаскивания колонки по всему экрану */}
        {/* Здесь дублируется компонент  TaskColumn, чтобы при перетаскивании он отображался так же*/}
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <TaskColumn
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumnTitle={updateColumnTitle}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId == activeColumn.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
        {/* Необходим для возможности перетаскивания колонки по всему экрану */}
      </DndContext>
      {/* Контекст DnD */}
    </div>
  );
};

export default Board;
