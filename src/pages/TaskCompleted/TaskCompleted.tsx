import { Button } from "@/components";
import { useState, useContext } from "react";
import { ModalContext } from "@/context";

const TaskCompleted = () => {
  const { openModal } = useContext(ModalContext);

  const [count, setCount] = useState(0);

  const handleClickFirtsBtn = () => {
    setCount((prev) => prev + 1);
    openModal({
      title: "Модальное окно с картинкой",
      type: "no-buttons",
      image: "./lahta.jpg",
    });
  };

  const handleClickSecondBtn = () => {
    setCount((prev) => prev + 1);
    openModal({
      title: "Модальное окно с текстом",
      type: "no-buttons",
      description:
        "ООО «Газпром информ» — специализированная сервисная ИТ-компания, управляющая ИТ-обеспечением Группы «Газпром».",
    });
  };

  const handleClickThirdBtn = () => {
    setCount((prev) => prev + 1);
    openModal({
      title: "Модальное окно с текстом и кнопками ОК и Отмена",
      type: "with-buttons",
      description:
        "ООО «Газпром информ» — специализированная сервисная ИТ-компания, управляющая ИТ-обеспечением Группы «Газпром».",
    });
  };

  const handleClickFourthBtn = () => {
    setCount((prev) => prev + 1);
    openModal({
      title:
        "Модальное окно с текстом, отражающим количество нажатий на любую из 5 кнопок.",
      type: "no-buttons",
      description: `Количество нажатий на кнопки - ${count}`,
    });
  };

  const handleClickFifthBtn = () => {
    setCount((prev) => prev + 1);
    openModal({
      title:
        "Модальное окно с текстом в котором отражается количество открытых вложенностей",
      type: "no-buttons",
      description: ``,
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 justify-items-center">
        <Button color="cyan" onClick={handleClickFirtsBtn}>
          Кнопка 1
        </Button>
        <Button color="green" onClick={handleClickSecondBtn}>
          Кнопка 2
        </Button>
        <Button color="orange" onClick={handleClickThirdBtn}>
          Кнопка 3
        </Button>
        <Button color="purple" onClick={handleClickFourthBtn}>
          Кнопка 4
        </Button>
        <Button color="pink" onClick={handleClickFifthBtn}>
          Кнопка 5
        </Button>
      </div>
    </>
  );
};

export default TaskCompleted;
