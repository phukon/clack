"use server";
import { db } from '@/lib/db';

export async function updateUserWordCountRef() {
  try {
    const updateUserWordCountRef = async () => {
      const users = await db.user.findMany();
      for (const user of users) {
        let userNotes = await db.note.findMany({
          where: {
            userId: user.id,
          },
        });
        let totalWordCount = userNotes.reduce((acc, note) => acc + (note.wordCount ?? 0), 0);
        await db.user.update({
          where: { id: user.id },
          data: { wordCountRef: totalWordCount },
        });
        console.log(`Updated wordCountRef for user ${user.name || user.id}`);
      }

      console.log("All users updated successfully.");
    };

    (async () => {
      await updateUserWordCountRef();
    })();

  } catch (error) {
    console.error("Error updating users:", error);
  }
}
