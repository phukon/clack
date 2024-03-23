"use server";
import { Prisma } from "@prisma/client";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const unlinkNotion = async () => {
  try {
    const user = await currentUser();
    if (!user || !user.id) throw new Error("Unauthorized");

    const dbUser = await getUserById(user.id);
    if (!dbUser) throw new Error("Unauthorized");

    await db.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        notionDetails: Prisma.DbNull,
      },
    });

    return { success: "Unlinked Clack integration. You can remove Clack from your Notion settings." };
  } catch (error) {
    return { error: "There was a problem unlinking the Clack integration" };
  }
};
