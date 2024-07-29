import { ReactNode } from "react";

export interface ModalProps {
  title: string;
  description?: ReactNode;
  type: "no-buttons" | "with-buttons" | "with-recursive" | "with-count";
  image?: string;
  id: number;
  setModal: React.Dispatch<React.SetStateAction<{ id: number }[]>>;
  count: number;
}

export type ModalState = Omit<ModalProps, "id" | "setModal" | "count">;
