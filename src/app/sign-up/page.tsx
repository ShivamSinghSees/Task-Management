import AuthForm from "@/components/forms/authForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/home");
  }
  return <AuthForm mode="signUp" />;
};

export default Page;
