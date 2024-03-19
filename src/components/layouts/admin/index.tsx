import Footer from "@/components/fragments/footer";
import Sidebar from "@/components/fragments/sidebar";
import React from "react";

type PropsType = {
  children: React.ReactNode;
};

const AdminLayout = (props: PropsType) => {
  const { children } = props;
  return (
    <div className="relative w-full h-[100dvh] flex justify-end">
      <div className="p-4 max-w-fit lg:max-w-[300px] w-full">
        <Sidebar />
      </div>
      <div className="w-full p-4">{children}</div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
