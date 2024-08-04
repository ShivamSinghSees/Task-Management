"use client";
import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSheet } from "@/lib/SheetContext";
import Cross from "../icons/cross";
import TwoSidedArrow from "../icons/two-sided-arrow";
import { Button } from "../ui/button";
import { CalendarIcon, Loader2, Pencil, Share2 } from "lucide-react";
import AuthInput from "../authInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Loading from "../icons/Loading";
import Warning from "../icons/warning";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { upsertTask } from "@/lib/queries";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { CustomSession } from "@/lib/type";
import { upsertTaskAsync } from "@/store/slices/taskSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.string().min(1, "Status is required"),
  priority: z.enum(["Urgent", "Medium", "Low"]).optional(),
  deadline: z
    .date({
      required_error: "A deadline is required.",
    })
    .optional(),
  description: z.string().optional(),
});

function CreateTask() {
  const { data: session } = useSession() as { data: CustomSession | null };
  const { isOpen, closeSheet } = useSheet();
  const { isLoading } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      status: "",
      priority: "Medium",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    await dispatch(
      upsertTaskAsync({
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: session?.user?.id as string,
        ...values,
      })
    );
    closeSheet();
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeSheet();
      }}
    >
      <SheetContent className="min-w-[36rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center ">
              <div className="flex gap-5">
                <Cross click={closeSheet} /> <TwoSidedArrow />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant={"blueActiveGradient"}
                  disabled={!form.formState.isValid}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}{" "}
                  Save
                </Button>
                <Button className="text-[#797979] bg-[#F4F4F4] border-none text-sm">
                  Share <Share2 className="ml-2" color="#797979" />
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AuthInput
                      {...field}
                      placeholder="Title"
                      className="mt-10 text-[40px] focus-visible:ring-0 border-none text-[#64758b] bg-transparent px-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex gap-7 my-5 text-[#797979]">
                        <Loading className="text-[#797979]" />{" "}
                        {field.value || "Status"}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Select Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => field.onChange("To Do")}
                        >
                          To Do
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => field.onChange("In progress")}
                        >
                          In progress
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => field.onChange("Under review")}
                        >
                          Under review
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => field.onChange("Finished")}
                        >
                          Finished
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex gap-7 my-5 text-[#797979]">
                        <Warning className="text-[#797979]" />{" "}
                        {field.value || "Priority"}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Select Priority</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => field.onChange("Urgent")}
                        >
                          Urgent
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => field.onChange("Medium")}
                        >
                          Medium
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Low")}>
                          Low
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Deadline</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-8">
                      <Pencil color="#797979" className="mt-3" />
                      <AuthInput
                        {...field}
                        placeholder="Description"
                        className="mt-3 border-none text-[15px] p-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default CreateTask;
