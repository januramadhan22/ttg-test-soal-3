import CustomButton from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const { pathname } = useRouter();
  const session: any = useSession();
  const userData = session?.data?.user;

  return (
    <nav className="sticky top-0 left-0 w-full max-h-[60px] px-14 py-4 flex items-center justify-between bg-primary-red text-white">
      <div>Brand Logo</div>
      {userData ? (
        <div>
          <CustomButton
            label="Logout"
            color="red"
            onSubmit={() => signOut({ callbackUrl: pathname })}
          />
        </div>
      ) : (
        <Link href={"/auth/login"}>
          <CustomButton label="Login" color="red" />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
