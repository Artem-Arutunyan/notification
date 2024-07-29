import { FC, ReactNode, useState } from "react";
import { ModalContext } from "./ModalContext";
import { Modal } from "@/components";
import { ModalState } from "@/types";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<Array<{ id: number }>>([]);
  const [count, setCount] = useState(0);
  const [modalContent, setModalCOntent] = useState<ModalState>({
    title: "Заголовок не указан",
    type: "no-buttons",
    description: "Описание не указано",
  });

  const openModal = (modalConfig: ModalState) => {
    if (modal.length !== 0) {
      setCount((prev) => prev + 1);
      setModalCOntent(modalConfig);
      setModal((prev) => {
        return [...prev, { id: prev[prev.length - 1].id + 1 }];
      });
    } else {
      setCount((prev) => prev + 1);
      setModalCOntent(modalConfig);
      setModal([{ id: 1 }]);
    }
  };

  const valueModalProvider = {
    openModal,
  };

  return (
    <ModalContext.Provider value={valueModalProvider}>
      {modal.length !== 0 &&
        modal.map((el) => (
          <Modal
            key={el.id}
            id={el.id}
            count={count}
            setModal={setModal}
            {...modalContent}
          />
        ))}
      {children}
    </ModalContext.Provider>
  );
};
