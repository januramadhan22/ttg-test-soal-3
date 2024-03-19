import { usePathname } from "next/navigation";
import React from "react";

const CustomBreadcupms = () => {
  const pathname = usePathname();
  const breadcumps = pathname.split("/").slice(1, pathname.split("/").length);

  return (
    <div className="flex items-center gap-1 text-lg text-primary-red">
      {breadcumps.map((bread, index) => (
        <div
          key={index}
          className={`flex items-center gap-1 ${
            index === breadcumps.length - 1 && "font-medium"
          }`}
        >
          {index > 0 && "/ "}
          {bread}
        </div>
      ))}
    </div>
  );
};

export default CustomBreadcupms;
