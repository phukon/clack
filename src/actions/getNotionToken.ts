"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
// import { db } from "@/lib/db";

export const getNotionToken = async () => {
  try {
    const user = await currentUser();
    if (!user || !user.id) throw new Error("Unauthorized");

    const dbUser = await getUserById(user.id);
    if (!dbUser) throw new Error("Unauthorized");
    // const error =
    //   (dbUser.notionDetails as { error?: string }).error ??
    //   "There was an error communicating with the Notion API";

    const token = (dbUser.notionDetails as { access_token: string }).access_token; // this is basically "trust me, I know what I'm doing"
    return {token: token}

  } catch (e) {
    return { error: "Error getting User's token" };
  }
};
