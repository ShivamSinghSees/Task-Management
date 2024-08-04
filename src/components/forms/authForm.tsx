"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Eye from "@/components/icons/eye";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthInput from "../authInput";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
// import { signIn, signUp } from "@/store/slices/authSlice";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { initUser } from "@/lib/queries";
import { User } from "@prisma/client";
import { Flag, Loader2 } from "lucide-react";

type Props = {
  mode: string;
};

const AuthForm = ({ mode }: Props) => {
  const FormSchema = z.object({
    ...(mode == "signUp"
      ? {
          name: z.string().min(2, { message: "name must be atleast 2 chars." }),
        }
      : {}),
    email: z.string().min(1),
    password: z
      .string()
      .min(6, { message: "password must be atleast 6 chars" }),
  });

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
  });
  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      if (mode === "signUp") {
        let name = values.name as string;
        const response = (await initUser({
          email: values.email,
          password: values.password,
          name,
          role: "AGENCY_OWNER",
        })) as User;
        let res = await signIn("credentials", {
          email: response.email,
          password: response.password,
        });
      } else {
        let res = await signIn("credentials", {
          email: values.email,
          password: values.password,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-[100vh] bg-gradient-to-b from-slate-50 to-violet-300 flex justify-center ">
      <Card className="lg:w-[50%] sm:w-[70%] w-[90%] h-fit md:mt-[5%] mt-[35%] md:p-9 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="text-center p-5 ">
              <CardTitle className="font-semibold lg:text-[2.6rem] sm:text-4xl text-base	">
                Welcome to <span className="text-violet-700">Workflo</span>!
              </CardTitle>
            </CardHeader>
            <CardContent className="md:px-14 flex flex-col gap-4 ">
              {mode === "signUp" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AuthInput placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AuthInput placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AuthInput
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Eye
                  className={"absolute top-[25%] right-[2%] cursor-pointer "}
                />
              </div>
            </CardContent>
            <CardFooter className="md:px-14 flex-col gap-3 items-center  ">
              <Button
                disabled={!formState.isValid || loading}
                variant={"blueActiveGradient"}
                className="w-full"
                type="submit"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                {mode === "signUp" ? "Sign up" : "Login"}
              </Button>
              {mode === "signUp" ? (
                <p className="text-[12px] sm:text-[16px] text-gray-600  ">
                  Already have an account?{" "}
                  <Link href={"/sign-in"} className="text-blue-700">
                    Log in.
                  </Link>
                </p>
              ) : (
                <p className="text-[12px] sm:text-[16px] text-gray-600">
                  Don’t have an account? Create a{" "}
                  <Link href={"/sign-up"} className="text-blue-700">
                    new account.
                  </Link>
                </p>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AuthForm;
