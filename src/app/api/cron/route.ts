import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';

export function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    const updateUserWordCountRef = async () => {

      const users = await db.user.findMany();

      for (const user of users) {
        let userNotes = await db.note.findMany({
          where: {
            userId: user.id,
          },
        });
        let totalWordCount = userNotes.reduce(
          (acc, note) => acc + (note.wordCount ?? 0),
          0
        );
        await db.user.update({
          where: { id: user.id },
          data: { wordCountRef: totalWordCount },
        });
        console.log(`Updated wordCountRef for user ${user.name || user.id}`);
      }

      console.log('All users updated successfully.');
    };

    (async () => {
      await updateUserWordCountRef();
    })();
  } catch (error) {
    console.error('Error updating users:', error);
  }

  return Response.json({ success: true });
}
