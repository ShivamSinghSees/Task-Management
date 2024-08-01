"use client";
import React from "react";
import MenuOptions from "./menu-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { SheetProvider } from "@/lib/SheetContext";
import CreateTask from "../modal/create-task";

const Sidebar = () => {
  const session = useSession();
  console.log(session?.data?.user, "session.token");
  let user = session?.data?.user as User;
  // if (!user) redirect("/sign-in");
  return (
    <SheetProvider>
      <MenuOptions defaultOpen={true} user={user} showX={false} />
      <MenuOptions user={user} showX={true} />
      <CreateTask />
    </SheetProvider>
  );
};

export default Sidebar;
