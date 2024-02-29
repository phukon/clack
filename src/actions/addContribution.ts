'use server';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import {formatDateToISO} from '@/lib/formatDateToISO'

export const addContribution = async () => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  if (!user.id) {
    return { error: 'Invalid user ID' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  const userNotes = await db.note.findMany({
    where: {
      userId: dbUser.id,
    },
  });

  const totalWordCount = userNotes.reduce(
    (acc, note) => acc + (note.wordCount ?? 0),
    0
  );

  function getIntensityLevel(wordCount: number): number {
    if (wordCount >= 0 && wordCount <= 10) {
      return 0;
    } else if (wordCount >= 11 && wordCount <= 50) {
      return 1;
    } else if (wordCount >= 51 && wordCount <= 150) {
      return 2;
    } else if (wordCount >= 151 && wordCount <= 300) {
      return 3;
    } else {
      return 4;
    }
  }
  // let year = '2024'
  // let transaction;
  // try {
  //   // Start a transaction
  //   transaction = await db.$transaction([
  //     db.year.create({
  //       data: {
  //         user: { connect: { id: 'user.id' } },
  //         userId: user.id,
  //         year: year
  //       }
  //     }),
  //     db.contribution.create({
  //       data: {
  //         user: { connect: { id: user.id } },
  //         userId: user.id,
  //         year: { connect: { year: year } },
  //         contribution_date: contributionDate,
  //         count: count,
  //         color: color,
  //         intensity: intensity
  //       }
  //     })
  //   ]);

  //   console.log("Year and Contribution created successfully!");
  // } catch (error) {
  //   console.error("Error creating year and contribution:", error);
  // }
  // }

  const existingYear = await db.year.findFirst({
    where: { year: new Date().getFullYear().toString() },
  });

  const existingContribution = await db.contribution.findFirst({
    where: { contribution_date: formatDateToISO(new Date), userId: dbUser.id },
  });

  if (existingYear) {
    if (existingContribution) {
      await db.contribution.update({
        where: {
          id: existingContribution.id,
        },
        data: {
          count:
            totalWordCount - dbUser.wordCountRef < 0
              ? 0
              : totalWordCount - dbUser.wordCountRef,
          intensity: getIntensityLevel(
            totalWordCount - dbUser.wordCountRef < 0
              ? 0
              : totalWordCount - dbUser.wordCountRef
          ),
        },
      });
    } else {
      await db.contribution.create({
        data: {
          userId: dbUser.id,
          yearId: existingYear.id,
          contribution_date: formatDateToISO(new Date),
          color: '#239a3b',
          count:
            totalWordCount - dbUser.wordCountRef < 0
              ? 0
              : totalWordCount - dbUser.wordCountRef,
          intensity: getIntensityLevel(
            totalWordCount - dbUser.wordCountRef < 0
              ? 0
              : totalWordCount - dbUser.wordCountRef
          ),
        },
      });
    }
  } else {
    const createdYear = await db.year.create({
      data: {
        userId: user.id,
        year: new Date().getFullYear().toString(),
        total: 234234526,
        start_date: new Date(new Date().getFullYear(), 0, 1),
        end_date: new Date(new Date().getFullYear() + 1, 0, 0),
      },
    });

    await db.contribution.create({
      data: {
        userId: user.id,
        yearId: createdYear.id,
        contribution_date: formatDateToISO(new Date),
        color: '#239a3b',
        count:
          totalWordCount - dbUser.wordCountRef < 0
            ? 0
            : totalWordCount - dbUser.wordCountRef,
        intensity: getIntensityLevel(
          totalWordCount - dbUser.wordCountRef < 0
            ? 0
            : totalWordCount - dbUser.wordCountRef
        ),
      },
    });
  }

  return { message: 'Contribution added successfully'}
};

// --------

// function formatDate(date: any) {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }

// function getTodayDateFormatted() {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, '0');
//   const day = String(today.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }
