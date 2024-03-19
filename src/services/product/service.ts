import instance from "@/lib/axios/instance";

const productServices = {
  getAllProduct: () => instance.get("/product"),
  addNewProduct: (data: any, token: string) =>
    instance.post(
      "/products",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  updateProduct: (id: string, data: any, token: string) =>
    instance.put(
      `/product/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteProduct: (id: string, token: string) =>
    instance.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default productServices;
