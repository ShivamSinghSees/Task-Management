import Sidebar from "@/components/sidebar";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar />
      <div className="md:pl-[300px]">
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default layout;
