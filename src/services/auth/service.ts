import instance from "@/lib/axios/instance";

const authService = {
  registerAccount: (data: any) => instance.post("/user/register", data),
};

export default authService;
