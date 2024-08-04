import FeatureCard from "@/components/card/feature-card";
import Question from "@/components/icons/question";
import Search from "@/components/icons/search";
import { Input } from "@/components/ui/input";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Calendar, Filter, Menu, Share2 } from "lucide-react";
import Star from "@/components/icons/star";
import { Button } from "@/components/ui/button";
import Plus from "@/components/icons/plus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Tasks from "@/components/tasks";
import { getServerSession } from "next-auth";

const menus = [
  {
    name: "Calender View",
    icon: <Calendar color="#797979" />,
  },
  {
    name: "Automation",
    icon: <Star />,
  },
  {
    name: "Filter",
    icon: <Filter color="#797979" />,
  },
  {
    name: "Share",
    icon: <Share2 color="#797979" />,
  },
];

let features = [
  {
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    imgUrl: "/introduction-tag.svg",
  },
  {
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    imgUrl: "/share-notes.svg",
  },
  {
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    imgUrl: "/access-anywhere.svg",
  },
];

const Home = async () => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return;
  return (
    <div className="py-6 px-4 bg-[#f7f7f7] h-[100vh] flex flex-col gap-5 ">
      <div className="flex justify-between items-center ">
        <h1 className=" text-[1.3rem] md:text-3xl lg:text-4xl font-semibold	 ">
          Good morning, {user?.name?.split(" ")[0]}!
        </h1>
        <span className="text-sm flex items-center gap-2 ">
          Help & feedback <Question />{" "}
        </span>
      </div>
      <div className="flex gap-4 overflow-scroll min-h-[150px]">
        {features.map((feature, key) => {
          return (
            <FeatureCard
              key={key}
              title={feature.title}
              description={feature.description}
              imgUrl={feature.imgUrl}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-between ">
        <div className="relative w-[80%]  md:w-[40%] lg:w-[30%] xl:w-[20%] ">
          <Input placeholder="Search" />
          <Search className="absolute right-[2%] top-[20%]" />
        </div>
        <div className="flex gap-5 ">
          <Menubar className="w-fit bg-transparent border-none ">
            <MenubarMenu>
              {menus?.map((menu, key) => {
                return (
                  <MenubarTrigger
                    key={key}
                    disabled
                    className="bg-[#F4F4F4] text-[#797979] font-normal text-[16px] gap-4 cursor-pointer hidden xl:flex "
                  >
                    {menu.name} {menu.icon}
                  </MenubarTrigger>
                );
              })}
            </MenubarMenu>
          </Menubar>
          <DropdownMenu>
            <DropdownMenuTrigger className="xl:hidden">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {menus?.map((menu, key) => {
                return (
                  <DropdownMenuItem
                    key={key}
                    className="justify-between gap-5 "
                  >
                    {menu.name} {menu.icon}{" "}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant={"blueActiveGradient"} disabled>
            {" "}
            Create new <Plus className="ml-3" />{" "}
          </Button>
        </div>
      </div>
      <Tasks />
    </div>
  );
};

export default Home;
