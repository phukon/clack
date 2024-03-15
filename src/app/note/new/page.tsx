// 'use server' not making it a server action
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

async function Route() {
  // Generate a 10 digit number
  // const nextNoteId = Math.floor(Math.random() * 9000000000) + 1000000000;
  const user = await currentUser();

  if (!user) {
    return "Unauthorized";
  }

  if (user.id) {
    let note = await db.note.create({
      data: {
        userId: user?.id,
      },
    });

    return redirect(`/note?id=${note.id}`);
  }
}

export default Route;
