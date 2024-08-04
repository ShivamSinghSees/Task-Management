import { useAppSelector } from "@/store/hook";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/sign-in");
  } else {
    redirect("/home");
  }
}
