import { IcComplete } from "@/icons";

const TaskDescription = () => {
  return (
    <>
      <h2 className="mb-2 text-lg font-semibold text-gray-700 ">
        Задание: Создать 5 кнопок, каждая из которых вызывает свое модальное
        окно
      </h2>
      <ul className="space-y-3 text-gray-600 list-inside ">
        <li className="flex items-center">
          <IcComplete isComplete={true} />
          Модальное окно с картинкой
        </li>
        <li className="flex items-center">
          <IcComplete isComplete={true} />
          Модальное окно с текстом
        </li>
        <li className="flex items-center">
          <IcComplete isComplete={true} />
          Модальное окно с текстом и двумя кнопками (ОК пишет в лог "ОК" и
          Отмена закрывает модальное окно)
        </li>
        <li className="flex items-center">
          <IcComplete isComplete={true} />
          Модальное окно с текстом, отражающим количество нажатий на любую из 5
          кнопок.
        </li>
        <li className="flex items-center">
          <IcComplete isComplete={false} />
          Модальное окно с текстом в котором отражается количество открытых
          вложенностей и кнопкой, открывающей модальное окно типа 4. Т.е.
          Изначально окно с 1, по кнопке открывается еще одно модальное окно, в
          котором уже 2.
        </li>
      </ul>
    </>
  );
};

export default TaskDescription;
