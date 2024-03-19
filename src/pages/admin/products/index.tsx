import AdminLayout from "@/components/layouts/admin";
import CustomBreadcupms from "@/components/ui/breadcumps";
import CustomButton from "@/components/ui/button";
import ModalAddProduct from "@/components/views/products/ModalAddProduct";
import ModalDeleteProduct from "@/components/views/products/ModalDeleteProduct";
import ModalEditProduct from "@/components/views/products/ModalEditProduct";
import { uploadFile } from "@/lib/firebase/services";
import productServices from "@/services/product/service";
import { handleConvertTimestamp } from "@/utils/hooks/helper";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import { BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import { toast } from "react-toastify";

const AdminProductPage = () => {
  const sessions: any = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [productImage, setProductImage] = useState<any>(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleSelectFile = (event: any) => {
    event.preventDefault();
    const file = event.currentTarget.files[0];

    if (file.size > 1048576) {
      toast.error("File is too large, Maximum size is 1MB", {
        position: "top-right",
      });
    } else {
      setProductImage(file);
    }
  };

  const handleChangeForm = (event: FormEvent<HTMLFormElement>) => {
    const { value, name } = event.currentTarget;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
  };

  const handleGetAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productServices.getAllProduct();
      setProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        position: "top-right",
      });
    }
  };

  const handleAddProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target: any = event?.target as HTMLFormElement;
    const userId: string = sessions?.data?.user?.id;

    const formData: any = {
      title: target?.title?.value,
      price: target.price.value,
      description: target.description.value,
    };

    setIsLoading(true);
    uploadFile(userId, productImage, async (imageUrl: string) => {
      if (imageUrl) {
        try {
          const response = await productServices.addNewProduct(
            { images: imageUrl, ...formData },
            sessions.data.accessToken
          );

          setIsLoading(false);
          if (response.status === 200) {
            toast.success("Successfully add new product", {
              position: "top-right",
            });
            target.reset();
            setAddModal(false);
            setProductImage(null);
            handleGetAllProducts();
          }
        } catch (error) {
          toast.error("Failed to add product", {
            position: "top-right",
          });
        }
      } else {
        setIsLoading(false);
        toast.error("Something went wrong", {
          position: "top-right",
        });
      }
    });
  };

  const handleEditProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId: string = sessions?.data?.user?.id;

    setIsLoading(true);

    if (productImage) {
      uploadFile(userId, productImage, async (imageUrl: string) => {
        if (imageUrl) {
          const formData = {
            title: selectedProduct?.title,
            price: selectedProduct?.price,
            description: selectedProduct?.description,
            images: imageUrl,
          };

          try {
            const response = await productServices.updateProduct(
              selectedProduct.id,
              formData,
              sessions.data.accessToken
            );

            setIsLoading(false);
            if (response.status === 200) {
              toast.success("Successfully edit product", {
                position: "top-right",
              });
              setSelectedProduct(null);
              setEditModal(false);
              setProductImage(null);
              handleGetAllProducts();
            }
          } catch (error) {
            toast.error("Failed edit product", {
              position: "top-right",
            });
          }
        } else {
          setIsLoading(false);
          toast.error("Something went wrong", {
            position: "top-right",
          });
        }
      });
    } else {
      try {
        const response = await productServices.updateProduct(
          selectedProduct.id,
          selectedProduct,
          sessions.data.accessToken
        );

        setIsLoading(false);
        if (response.status === 200) {
          toast.success("Successfully edit product", {
            position: "top-right",
          });
          setSelectedProduct(null);
          setEditModal(false);
          setProductImage(null);
          handleGetAllProducts();
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed edit product", {
          position: "top-right",
        });
      }
    }
  };

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      const response = await productServices.deleteProduct(
        selectedProduct.id,
        sessions.data.accessToken
      );
      setIsLoading(false);
      if (response.status === 200) {
        toast.success("Successfully remove product", {
          position: "top-right",
        });
        setDeleteModal(false);
        setSelectedProduct(null);
        handleGetAllProducts();
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed remove product", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="w-full h-full flex flex-col gap-4">
          <div className="w-full py-4 flex justify-between items-center">
            <CustomBreadcupms />
            <div>
              <CustomButton
                label="Add Product"
                color="red"
                onSubmit={() => setAddModal(true)}
              />
            </div>
          </div>
          <div className="w-[calc(100dvw-120px)] md:w-full h-[calc(100dvh-160px)] md:h-full overflow-auto">
            {products?.length !== 0 ? (
              <table className="w-full table-auto border-collapse rounded-lg border border-red-100">
                <thead className="text-white font-medium bg-primary-red">
                  <tr>
                    <th className="w-[40px] px-2 py-2  border border-red-100">
                      No.
                    </th>
                    <th className="px-2 py-2 border border-red-100">Name</th>
                    <th className="px-2 py-2 border border-red-100">
                      Description
                    </th>
                    <th className="px-2 py-2 border border-red-100">Price</th>
                    <th className="px-2 py-2 border border-red-100">
                      Created At
                    </th>
                    <th className="px-2 py-2 border border-red-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="h-auto">
                  {products?.map((product: any, index: number) => (
                    <tr
                      key={index}
                      className="h-auto text-center text-primary-red font-medium bg-red-50"
                    >
                      <td className="px-2 py-2 border border-red-100">
                        {index + 1}.
                      </td>
                      <td className="px-2 py-2 border border-red-100">
                        {product?.title}
                      </td>
                      <td className="w-auto lg:w-[320px] px-2 py-2 border border-red-100">
                        {product?.description}
                      </td>
                      <td className="px-2 py-2 border border-red-100">
                        Rp {parseInt(product?.price)?.toLocaleString("id-ID")}
                      </td>
                      <td className="px-2 py-2 border border-red-100">
                        {handleConvertTimestamp(product?.created_at)}
                      </td>
                      <td className="px-2 py-2 text-xl border border-red-100">
                        <button
                          title="Edit"
                          className="p-2 rounded bg-yellow-500 text-white"
                          onClick={() => {
                            setEditModal(true);
                            setSelectedProduct(product);
                          }}
                        >
                          <BiSolidEdit />
                        </button>
                        <button
                          title="Delete"
                          className="my-2 lg:my-0 lg:ml-2 p-2 rounded bg-primary-red text-white"
                          onClick={() => {
                            setDeleteModal(true);
                            setSelectedProduct(product);
                          }}
                        >
                          <BiSolidTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-[400px] flex justify-center items-center text-center">
                <h3 className="text-xl text-primary-red">
                  No any product displayed
                </h3>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
      <ModalAddProduct
        isOpen={addModal}
        isLoading={isLoading}
        handleSelectFile={handleSelectFile}
        handleSubmit={handleAddProduct}
        productImage={productImage}
        onClose={() => {
          setAddModal(false);
          setProductImage(null);
        }}
      />

      <ModalDeleteProduct
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedProduct(null);
        }}
        isLoading={isLoading}
        handleSubmit={handleDeleteProduct}
        selectedProduct={selectedProduct}
      />

      <ModalEditProduct
        isOpen={editModal}
        isLoading={isLoading}
        handleSelectFile={handleSelectFile}
        handleChangeForm={handleChangeForm}
        handleSubmit={handleEditProduct}
        productImage={productImage}
        selectedProduct={selectedProduct}
        onClose={() => {
          setEditModal(false);
          setProductImage(null);
          setSelectedProduct(null);
        }}
      />
    </>
  );
};

export default AdminProductPage;
