"use server";

import { User } from "@prisma/client";
import db from "./prisma";

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
