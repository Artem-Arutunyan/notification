import { FC, ReactNode, useState } from "react";
import { ModalContext } from "./ModalContext";
import { Notification } from "@/components";
import { NotificationProps } from "@/types";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalCOntent] = useState<NotificationProps>({
    title: "Заголовок не указан",
    type: "no-buttons",
    description: "Описание не указано",
  });

  const openModal = (modalConfig: NotificationProps) => {
    if (!modalConfig) {
      setModalOpened(true);
    } else {
      setModalCOntent(modalConfig);
      setModalOpened(true);
    }
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const valueModalProvider = {
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={valueModalProvider}>
      {modalOpened && <Notification {...modalContent} />}
      {children}
    </ModalContext.Provider>
  );
};
