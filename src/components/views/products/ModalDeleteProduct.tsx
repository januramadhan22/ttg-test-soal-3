import CustomButton from "@/components/ui/button";
import CustomModal from "@/components/ui/modal";
import React, { FormEvent } from "react";
import { BiSolidInfoCircle } from "react-icons/bi";

type PropsType = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  selectedProduct: any;
};

const ModalDeleteProduct = (props: PropsType) => {
  const { isOpen, isLoading, onClose, handleSubmit, selectedProduct } = props;
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="w-[400px] h-full flex flex-col items-center gap-5">
        <BiSolidInfoCircle className="text-7xl text-primary-red" />
        <p className="my-3 text-lg text-center">
          You can add again this product next time,
          <br />
          Are you sure want to remove this product?
        </p>
        <div className="w-full flex gap-3">
          <CustomButton
            disabled={isLoading}
            label="Cancel"
            variant="filled"
            color="red"
            onSubmit={onClose}
          />
          <CustomButton
            disabled={isLoading}
            label={isLoading ? "Loading..." : "Submit"}
            variant="outlined"
            color="red"
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalDeleteProduct;
