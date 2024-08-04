"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Menu } from "lucide-react";
import BellDot from "../icons/bell-dot";
import Loader from "../icons/loader";
import RightArrow from "../icons/right-arrow";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Plus from "../icons/plus";
import IconRenderer from "../IconRender";
import { signOut, useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hook";
import { redirect } from "next/navigation";
import { useSheet } from "@/lib/SheetContext";
import { User } from "next-auth";
interface Props {
  defaultOpen?: boolean;
  showX: boolean;
}

const MenuOptions = ({ defaultOpen, showX }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const sideBarOptions = useAppSelector((state) => state.sidebar.sidebar);
  const session = useSession();
  let user = session?.data?.user as User;

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );
  const { openSheet } = useSheet();

  const logOut = () => {
    signOut();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!user && session.status !== "loading") redirect("/sign-in");
  if (!isMounted) return;
  return (
    <Sheet {...openState} modal={false}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden felx"
      >
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        showX={showX}
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <div className="flex items-center gap-2">
          <Image
            src={"/user-profile.png"}
            alt="Sidebar Logo"
            width={30}
            height={30}
            className="rounded-lg"
          />
          <span className="mt-0"> {user?.name} </span>
        </div>
        <div className="flex justify-between mt-2 ">
          <div className="flex gap-5">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="justify-start w-fit "
            >
              <BellDot />
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="justify-start w-fit "
            >
              <Loader />
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="justify-start w-fit "
            >
              <RightArrow />
            </Button>
          </div>
          <Button
            variant={"secondary"}
            className="bg-[#F4F4F4] text-[#797979] "
            onClick={logOut}
          >
            Logout
          </Button>
        </div>
        <Command className="mt-5 h-fit">
          <CommandList>
            <CommandGroup>
              {sideBarOptions.map(
                (options: { icon: string; name: string }, i: number) => {
                  return (
                    <CommandItem
                      key={i}
                      className="gap-5 px-0 text-[#797979]  hover:bg-[red] aria-selected:border-[#DDDDDD] aria-selected:border-[1px] pl-2"
                    >
                      {" "}
                      <IconRenderer icon={options.icon} />
                      <span className="text-[16px]"> {options.name} </span>{" "}
                    </CommandItem>
                  );
                }
              )}
            </CommandGroup>
          </CommandList>
        </Command>
        <SheetFooter className="mt-4">
          <Button
            variant={"blueActiveGradient"}
            className="w-full text-[16px] "
            onClick={openSheet}
          >
            Create new task {"  "}
            <Plus className="ml-3" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
