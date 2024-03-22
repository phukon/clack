"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NoteType, Prisma } from "@prisma/client";
import { extractNotionData } from "@/lib/extractNotionData";

async function getWordCount(text: string): Promise<number> {
  return text.split(/\s+/).length;
}

function getDocType(url: string): string {
  if (url.includes("docs.google.com")) {
    return "GOOGLEDOC";
  } else if (url.includes("notion.so")) {
    return "NOTION";
  } else {
    return "Unknown";
  }
}
async function addGoogleDoc(url: string, dbUser: any): Promise<void> {
  const docId = extractDocId(url);
  const response = await fetch(`${process.env.GOOGLE_SCRIPT_URL}?id=${docId}`);
  const { title, wordCount } = await response.json();

  if (!wordCount) {
    throw new Error("Unable to retrieve word count from the Google Apps Script.");
  }

  const wordCountNumber = +wordCount; // Convert to number

  await db.note.create({
    data: {
      userId: dbUser.id,
      url: url,
      wordCount: wordCountNumber,
      type: NoteType.GOOGLEDOC,
      name: title,
    },
  });
}

async function addNotionDoc(url: string, dbUser: any): Promise<void> {
  const extractedId = getIdFromUrl(url);
  if (!extractedId) {
    throw new Error(`ID not found for ${url}`);
  }
  const token = (dbUser.notionDetails as { access_token: string }).access_token; 
  const wordArray = await extractNotionData(token, extractedId);
  const combinedString = wordArray.join(" ");
  const wordCount = await getWordCount(combinedString);
  await db.note.create({
    data: {
      userId: dbUser.id,
      url: url,
      wordCount: wordCount,
      type: NoteType.NOTION,
    },
  });
}

function extractDocId(url: string): string {
  const parts = url.split("/");
  const index = parts.indexOf("d");
  return parts[index + 1];
}

function getIdFromUrl(url: string): string | null {
  const match = url.match(/[a-zA-Z0-9]{32}/);
  return match ? match[0] : null;
}

// --- main ---
export async function addDocument(url: string) {
  try {
    const user = await currentUser();
    if (!user || !user.id) throw new Error("Unauthorized");

    const dbUser = await getUserById(user.id);
    if (!dbUser) throw new Error("Unauthorized");

    if (getDocType(url) === "GOOGLEDOC") {
      await addGoogleDoc(url, dbUser);
    } else if (getDocType(url) === "NOTION") {
      await addNotionDoc(url, dbUser);
    } else {
      throw new Error("Unknown document type");
    }

    return { success: "Document added successfully!" };
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      (error.meta?.target as string[])?.includes("url")
    ) {
      return { error: "URL already exists. Please use a different URL." };
    }

    console.error("Error occurred:", error);
    return { error: error.message };
  }
}
