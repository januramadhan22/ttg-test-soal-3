import CustomButton from "@/components/ui/button";
import CustomForm from "@/components/ui/form";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { data } = useSession();

  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const formData = {
      email: target.email.value,
      password: target.password.value,
    };

    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });

      if (!response?.error) {
        toast.success("Login successfully", { position: "top-right" });
        target.reset();
        setTimeout(() => {
          setIsLoading(false);
          push(callbackUrl);
        }, 500);
      } else {
        setIsLoading(false);
        toast.error("Username or password is incorrect", {
          position: "top-right",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Username or password is incorrect", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center bg-white">
      <div className="max-w-md w-full max-h-[80%] flex flex-col gap-5 p-5 border-2 border-primary-red rounded-md bg-primary-red bg-opacity-10 backdrop-blur-md">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-medium text-primary-red">Login</h1>
          <h5 className="text-primary-red">
            Please insert your credential to login!
          </h5>
        </div>

        <form onSubmit={handleSignIn} className="w-full flex flex-col gap-4">
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

          <div className="w-full flex flex-col items-center gap-2">
            <span className="text-primary-red">
              dont have an account?{" "}
              <Link
                href={"/auth/register"}
                className="text-primary-red font-medium hover:underline transition-all ease-in"
              >
                Register now!
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

export default LoginPage;
