"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { updateUserWordCountRef } from "./updateWordCountRef";

export async function removeDocument(url: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");
    if (!user.id) throw new Error("Invalid user ID");
    const dbUser = await getUserById(user.id);
    if (!dbUser) throw new Error("Unauthorized");

    const existingDocument = await db.note.findUnique({
      where: { url },
    });

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId !== dbUser.id) {
      throw new Error("Unauthorized to remove this document");
    }

    await db.note.delete({
      where: { id: existingDocument.id },
    });

    await updateUserWordCountRef(dbUser.id)

    return { success: "Document removed successfully!" };
  } catch (error: any) {
    // Prisma-specific error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error:", error);
      return { error: "An error occurred while processing your request." };
    }

    console.error("Error occurred:", error);
    return { error: error.message };
  }
}
