import AuthForm from "@/components/forms/authForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();
  console.log(session, "session");
  if (session) {
    redirect("/home");
  }
  return <AuthForm mode="signIn" />;
};

export default Page;
