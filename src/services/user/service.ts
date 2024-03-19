import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: (token: string) =>
    instance.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getUserById: (id: string, token: string) =>
    instance.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateUser: (id: string, data: any, token: string) =>
    instance.put(
      `/user/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteUser: (id: string, token: string) =>
    instance.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default userServices;
