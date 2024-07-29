import { Button } from "@/components";
import { useContext } from "react";
import { ModalContext } from "@/context";

const TaskCompleted = () => {
  const { openModal } = useContext(ModalContext);

  const handleClickFirtsBtn = () => {
    openModal({
      title: "Модальное окно с картинкой",
      type: "no-buttons",
      image: "./lahta.jpg",
    });
  };

  const handleClickSecondBtn = () => {
    openModal({
      title: "Модальное окно с текстом",
      type: "no-buttons",
      description:
        "ООО «Газпром информ» — специализированная сервисная ИТ-компания, управляющая ИТ-обеспечением Группы «Газпром».",
    });
  };

  const handleClickThirdBtn = () => {
    openModal({
      title: "Модальное окно с текстом и кнопками ОК и Отмена",
      type: "with-buttons",
      description:
        "ООО «Газпром информ» — специализированная сервисная ИТ-компания, управляющая ИТ-обеспечением Группы «Газпром».",
    });
  };

  const handleClickFourthBtn = () => {
    openModal({
      title:
        "Модальное окно с текстом, отражающим количество нажатий на любую из 5 кнопок.",
      type: "with-count",
    });
  };

  const handleClickFifthBtn = () => {
    openModal({
      title:
        "Модальное окно с текстом в котором отражается количество открытых вложенностей",
      type: "with-recursive",
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
