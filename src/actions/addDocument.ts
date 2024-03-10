"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NoteType, Prisma } from "@prisma/client";
import { extractNotionData } from "@/lib/extractNotionData";

export async function addDocument(url: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");
    if (!user.id) throw new Error("Invalid user ID");

    const dbUser = await getUserById(user.id);
    if (!dbUser) throw new Error("Unauthorized");

    // --------------------

    const getWordCount = (str: string): number => {
      return str.split(/\s+/).length;
    };

    // --------------------
    const getIdFromUrl = (url: string): string | null => {
      const match = url.match(/[a-zA-Z0-9]{32}/);
      if (match && match.length > 0) {
        return match[0];
      }
      return null;
    };

    const id = getIdFromUrl(url);
    if (!id) {
      throw new Error(`ID not found for ${url}`);
    }


    // Extracting data and processing it
    const wordArray = await extractNotionData(id);
    const combinedString = wordArray.join(" ");
    const wordCount = getWordCount(combinedString);

    // --------------------
    await db.note.create({
      data: {
        userId: dbUser.id,
        url: url,
        wordCount: wordCount,
        type: NoteType.NOTION
      },
    });

    return {success: "Document added succesfully!"}
  } catch (error: any) {
    // Prisma-specific error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && (error.meta?.target as string[])?.includes('url')) {
        // This error code (P2002) indicates a unique constraint violation
        return { error: "URL already exists. Please use a different URL." };
      }
    }

    // Generic error handling
    console.error("Error occurred:", error);
    return { error: error };
  }
}
