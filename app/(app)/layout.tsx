import SideBar from "@/components/navigate/SideBar";
import TopBar from "@/components/navigate/TopBar";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: layoutProps) => {
  return (
    <div className="flex h-full ">
      <SideBar />
      <div className="grow ">
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default layout;
