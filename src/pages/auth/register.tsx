import CustomButton from "@/components/ui/button";
import CustomForm from "@/components/ui/form";
import authService from "@/services/auth/service";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = {
      email: target.email.value,
      phonenumber: target.phonenumber.value,
      password: target.password.value,
      role: role,
    };

    setIsLoading(true);
    try {
      const response = await authService.registerAccount(formData);
      const { statusCode, message } = response.data;
      if (statusCode === 200) {
        toast.success(message, { position: "top-right" });
        target.reset();
        setTimeout(() => {
          setIsLoading(false);
          push("/auth/login");
        }, 500);
      } else {
        setIsLoading(false);
        toast.error("Failed create account", { position: "top-right" });
      }
    } catch (error: any) {
      setIsLoading(false);
      const { message } = error?.response?.data;
      toast.error(message, { position: "top-right" });
    }
  };

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center bg-white">
      <div className="max-w-md w-full max-h-[80%] flex flex-col gap-5 p-5 border-2 border-primary-red rounded-md bg-primary-red bg-opacity-10 backdrop-blur-md">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-medium text-primary-red">Register</h1>
          <h5 className="text-primary-red">
            Register your account to access anything!
          </h5>
        </div>

        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
          <CustomForm
            name="email"
            type="email"
            label="Email"
            placeholder="Input your email"
            round="md"
            isRequired
          />
          <CustomForm
            name="password"
            type="password"
            label="Password"
            placeholder="Input your password"
            round="md"
            isRequired
          />
          <CustomForm
            name="phonenumber"
            type="text"
            label="Phonenumber"
            placeholder="Input your phonenumber"
            round="md"
            isRequired
          />

          <div className="flex flex-col gap-1">
            <h5 className="text-primary-red font-medium">Role</h5>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1 text-primary-red">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value={"admin"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="role">Admin</label>
              </div>
              <div className="flex items-center gap-1 text-primary-red">
                <input
                  type="radio"
                  id="member"
                  name="role"
                  value={"member"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="role">Member</label>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-2">
            <span className="text-primary-red">
              already have an account?{" "}
              <Link
                href={"/auth/login"}
                className="text-primary-red font-medium hover:underline transition-all ease-in"
              >
                Login now!
              </Link>
            </span>
            <CustomButton
              label={isLoading ? "Loading.." : "Submit"}
              color="red"
              variant="filled"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
