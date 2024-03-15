"use server";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const wordCountRef = async (): Promise<number | undefined | null> => {
  const user = await currentUser();

  if (!user) {
    return;
  }

  if (!user.id) {
    return;
  }
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return;
  }

  return dbUser.wordCountRef;
};
