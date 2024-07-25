import { ReactNode } from "react";

export interface NotificationProps {
    title: string;
    description?: ReactNode;
    type: "no-buttons" | "with-buttons";
    image?: string;
  }