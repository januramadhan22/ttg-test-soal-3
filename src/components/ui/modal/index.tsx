import React from "react";

type PropsType = {
  children: React.ReactNode;
  onClose?: () => void;
  isOpen: boolean;
};

const CustomModal = (props: PropsType) => {
  const { children, onClose, isOpen } = props;
  return (
    <div
      id="modal"
      className={`absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] transition-all ease-in-out duration-300 ${
        !isOpen
          ? "w-0 h-0"
          : "w-full h-[100dvh] flex justify-center items-center"
      }`}
    >
      {/* Backdrop Element */}
      <div
        id="modal-backdrop"
        onClick={onClose}
        className={`absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] transition-all ease-in-out duration-200 ${
          isOpen
            ? "w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
            : "w-0 h-0 bg-transparent rounded-full"
        }`}
      />

      {/* Modal Content */}
      <div
        id="modal-content"
        className={`min-w-md p-10 max-h-[90%] transition-all ease-in-out duration-400 rota ${
          !isOpen
            ? "scale-0 hidden"
            : "relative block z-100 scale-100 rounded-md overflow-clip bg-white"
        }`}
      >
        {/* <CustomIcon
          onSubmit={onClose}
          name="bx bx-plus"
          size="3xl"
          additional="absolute top-5 right-5 text-gray-500 hover:bg-gray-100 hover:border-gray-300 rotate-45"
          button
        /> */}
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
