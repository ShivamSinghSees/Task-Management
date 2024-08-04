"use server";

import { Task, User } from "@prisma/client";
import db from "./prisma";
import { transformData } from "./utils";

function returnErrorMessage(err: unknown) {
  if (err instanceof Error) {
    return err.message;
  } else return "Something went wrong";
}

export const initUser = async (newUser: Partial<User>) => {
  const user = newUser as User;

  try {
    const userData = await db.user.upsert({
      where: {
        email: newUser.email,
      },
      update: newUser,
      create: {
        email: user.email,
        name: user.name,
        password: user.password,
        role: user.role,
      },
    });
    return userData;
  } catch (error) {
    return returnErrorMessage(error);
  }
};
export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    let user = await db.user.findUnique({
      where: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (user) {
      return user;
    }
  } catch (error) {
    return returnErrorMessage(error);
  }
};

export const upsertTask = async (task: Partial<Task>) => {
  try {
    if (task.id) {
      return await db.task.update({
        where: { id: task.id },
        data: task,
      });
    } else {
      return await db.task.create({
        data: task as Task,
      });
    }
  } catch (error) {
    return returnErrorMessage(error);
  }
};

export const getTasks = async (userId: string) => {
  try {
    const tasks = await db.task.findMany({
      where: {
        userId: userId,
      },
    });

    return transformData(tasks);
  } catch (error) {
    return returnErrorMessage(error);
  }
};
