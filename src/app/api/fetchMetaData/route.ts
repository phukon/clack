import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
// import { db } from "@/lib/db";

export async function GET(): Promise<Response> {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  if (!user.id) throw new Error("Invalid user ID");

  const dbUser = await getUserById(user.id);
  if (!dbUser) throw new Error("Unauthorized");

  // const userNotes = await db.note.findMany({
  //   where: { userId: dbUser.id },
  // });

  // const totalWordCount = userNotes.reduce((acc, note) => acc + (note.wordCount ?? 0), 0);

  return Response.json(dbUser.wordCountRef);
}
