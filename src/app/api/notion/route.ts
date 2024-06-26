import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { extractNotionData } from "@/lib/extractNotionData";
import { NoteType } from "@prisma/client";

// --------------------
const getIdFromUrl = (url: string): string | null => {
  const match = url.match(/[a-zA-Z0-9]{32}/);
  if (match && match.length > 0) {
    return match[0];
  }
  return null;
};

export async function GET(): Promise<Response> {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  if (!user.id) throw new Error("Invalid user ID");
  const dbUser = await getUserById(user.id);
  if (!dbUser) throw new Error("Unauthorized");

  if (!dbUser.notionDetails) {
    return new Response("Clack integration is not connected with your workspace.", {
      status: 401,
    });
  }

  const notionDocuments = await db.note.findMany({
    where: { userId: dbUser.id, type: NoteType.NOTION },
  });
  if (!notionDocuments || notionDocuments.length === 0) {
    return new Response("Not Found", { status: 404 });
  }

  const keyValuePairs: Record<string, string | null> = {};
  for (const document of notionDocuments) {
    const { url } = document;
    if (url) {
      try {
        const id = getIdFromUrl(url);
        if (!id) {
          throw new Error(`ID not found for ${url}`);
        }

        // Extracting data and processing it
        const token = (dbUser.notionDetails as { access_token: string }).access_token;
        const wordArray = await extractNotionData(token, id);
        const combinedString = wordArray.join(" ");

        keyValuePairs[url] = combinedString;
      } catch (error) {
        console.error(`Error fetching data from URL: ${url}`, error);
      }
    }
  }
  const keys = Object.keys(keyValuePairs);
  const values = Object.values(keyValuePairs);
  const result = keys.map((key, index) => {
    return [key, values[index]];
  });
  return new Response(JSON.stringify(result), { status: 200 });
}
