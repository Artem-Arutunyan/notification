import { ModalState } from "@/types";
import { createContext } from "react";


export const ModalContext = createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    openModal: (_modalConfig: ModalState) => {},
})



