import CustomButton from "@/components/ui/button";
import CustomForm from "@/components/ui/form";
import CustomModal from "@/components/ui/modal";
import React, { FormEvent } from "react";

type PropsType = {
  isOpen: boolean;
  isLoading: boolean;
  productImage?: any;
  selectedProduct?: any;
  onClose: () => void;
  handleSelectFile: (event: any) => void;
  handleChangeForm?: (event: FormEvent<HTMLFormElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const ModalEditProduct = (props: PropsType) => {
  const {
    isOpen,
    isLoading,
    productImage,
    selectedProduct,
    onClose,
    handleSelectFile,
    handleChangeForm,
    handleSubmit,
  } = props;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="w-[400px] h-full flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-primary-red">
          Edit Product
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-h-[calc(100dvh-30vh)] h-full flex flex-col gap-2"
        >
          <div className="mb-3 flex flex-col justify-center items-center gap-1">
            <div
              onClick={() => document.getElementById("file-uploader")?.click()}
              title="Upload image"
              className="min-w-24 min-h-24 max-w-40 max-h-40 flex items-center justify-center rounded border-2 border-dashed border-primary-red bg-red-200 bg-opacity-10 hover:bg-opacity-50 hover:shadow-inner hover:shadow-gray-400 transition-all ease-in cursor-pointer overflow-clip"
            >
              {!productImage ? (
                <img src={selectedProduct?.images} />
              ) : (
                <img src={URL.createObjectURL(productImage)} />
              )}
            </div>
            <input
              id="file-uploader"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e: any) => handleSelectFile(e)}
            />
            <p className="text-sm text-primary-red">
              {productImage ? productImage?.name : "Change image"}
            </p>
          </div>
          <CustomForm
            name="title"
            type="text"
            label="Product Name"
            placeholder="Input product name"
            round="md"
            value={selectedProduct?.title}
            handleChangeForm={handleChangeForm}
            isRequired
          />
          <CustomForm
            name="price"
            type="number"
            label="Product Price"
            placeholder="Input product price"
            round="md"
            value={selectedProduct?.price}
            handleChangeForm={handleChangeForm}
            isRequired
          />
          <CustomForm
            name="description"
            type="text"
            label="Description"
            placeholder="Input description"
            round="md"
            value={selectedProduct?.description}
            handleChangeForm={handleChangeForm}
            isRequired
          />
          <div className="w-full mt-3 flex gap-3">
            <CustomButton
              disabled={isLoading}
              label="Cancel"
              variant="outlined"
              color="red"
              onSubmit={onClose}
            />
            <CustomButton
              disabled={isLoading}
              label={isLoading ? "Loading..." : "Submit"}
              variant="filled"
              color="red"
            />
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default ModalEditProduct;
