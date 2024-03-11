import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
// import { extractNotionData } from "@/lib/extractNotionData";
import { NoteType } from "@prisma/client";

// --------------------
function extractDocId(url: string): string {
  const parts = url.split("/");
  const index = parts.indexOf("d");
  return parts[index + 1];
}

export async function GET(): Promise<Response> {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  if (!user.id) throw new Error("Invalid user ID");
  const dbUser = await getUserById(user.id);
  if (!dbUser) throw new Error("Unauthorized");


  const googleDocuments = await db.note.findMany({
    where: { userId: dbUser.id, type: NoteType.GOOGLEDOC },
  });
  if (!googleDocuments || googleDocuments.length === 0) {
    return new Response("Not Found", { status: 404 });
  }


  const keyValuePairs: Record<string, string | null> = {}
  for (const document of googleDocuments) {
    const { url } = document;
    if (url) {
      try {
        const id = extractDocId(url);
        if (!id) {
          throw new Error(`ID not found for ${url}`);
        }

        // Extracting data and processing it
        // const wordArray = await extractNotionData(id);
        // const combinedString = wordArray.join(" ");

        keyValuePairs[url] = document.name
      } catch (error) {
        console.error(`Error fetching data from URL: ${url}`, error);
      }
    }
  }
  const keys = Object.keys(keyValuePairs)
  const values = Object.values(keyValuePairs);
  const result = keys.map((key, index) => {
    return [key, values[index]];
  });
  return new Response(JSON.stringify(result), { status: 200 });
}
