import React from "react";
import MenuOptions from "./menu-options";
import { SheetProvider } from "@/lib/SheetContext";
import CreateTask from "../modal/create-task";

const Sidebar = () => {
  return (
    <SheetProvider>
      <MenuOptions defaultOpen={true} showX={false} />
      <MenuOptions showX={true} />
      <CreateTask />
    </SheetProvider>
  );
};

export default Sidebar;
