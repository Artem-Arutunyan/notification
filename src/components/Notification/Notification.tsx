import { FC, useContext } from "react";
import { IcClose } from "@/icons";
import { NotificationProps } from "@/types";
import { ModalContext } from "@/context";

const Notification: FC<NotificationProps> = ({
  title,
  description,
  type,
  image = "",
}) => {
  const { closeModal } = useContext(ModalContext);

  const pressOk = () => {
    console.log("OK");
  };

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 p-6">
                <div className="mt-0 text-left">
                  <div className="flex flex-row justify-between items-center">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {title}
                    </h3>
                    <div
                      className="cursor-pointer hover:bg-slate-200 rounded-lg p-1"
                      onClick={closeModal}
                    >
                      <IcClose />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {image ? (
                        <img
                          className="w-full object-cover rounded-md"
                          src={image}
                          alt="Не удалось загрузить изображение"
                        />
                      ) : (
                        description
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {type === "with-buttons" && (
                <div className="flex justify-end gap-3 bg-gray-50 px-4 py-3">
                  <button
                    type="button"
                    className="justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 hover:text-white"
                    onClick={pressOk}
                  >
                    ОК
                  </button>
                  <button
                    type="button"
                    className="justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 sm:w-auto ring-gray-300 hover:bg-indigo-600 hover:text-white"
                    onClick={closeModal}
                  >
                    Отмена
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
