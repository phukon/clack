"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const deleteAccount = async () => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      throw new Error("Unauthorized: User not authenticated.");
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
      throw new Error("Unauthorized: User not found in the database.");
    }

    await db.user.delete({
      where: { id: dbUser.id },
    });

    const getResponse = await fetch(
      `${process.env.WORKER_BASE_URL}?deleteAllUserNotes=${dbUser.email}`,
      {
        method: "GET",
        headers: {
          "X-Custom-Auth-Key": `${process.env.SECURITY_KEY}`,
        },
      }
    );

    const data = await getResponse.text();
    console.log(data);

    return { success: "Your account and data has been removed from Clack." };
  } catch (e: any) {
    return { error: `There was a problem deleting your account ${e.message} ` };
  }
};
