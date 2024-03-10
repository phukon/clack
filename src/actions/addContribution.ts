"use server";
/**
 * To the future contributors.
 * Please do not delete the SCRAP YARD.
 * I might reuse the code later.
 * ~ riki (⌐■_■)
 */

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDateToISO } from "@/lib/formatDateToISO";

enum IntensityLevel {
  Low = 0,
  Moderate = 1,
  High = 2,
  VeryHigh = 3,
  Extreme = 4,
}

async function calculateIntensityLevel(wordCount: number): Promise<IntensityLevel> {
  if (wordCount >= 0 && wordCount <= 10) return IntensityLevel.Low;
  if (wordCount >= 11 && wordCount <= 50) return IntensityLevel.Moderate;
  if (wordCount >= 51 && wordCount <= 150) return IntensityLevel.High;
  if (wordCount >= 151 && wordCount <= 300) return IntensityLevel.VeryHigh;
  return IntensityLevel.Extreme;
}

async function getTotalContributions(userId: string): Promise<number> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { contributions: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.contributions.reduce((accumulator, contribution) => accumulator + contribution.count, 0);
}

async function addContribution() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  if (!user.id) throw new Error("Invalid user ID");

  const dbUser = await getUserById(user.id);
  if (!dbUser) throw new Error("Unauthorized");

  const userNotes = await db.note.findMany({
    where: { userId: dbUser.id },
  });

  const totalWordCount = userNotes.reduce((acc, note) => acc + (note.wordCount ?? 0), 0);
  const intensityLevel = await calculateIntensityLevel(totalWordCount);
  const totalContributions = await getTotalContributions(dbUser.id);

  const currentYear = new Date().getFullYear();
  const existingYear = await db.year.findFirst({
    where: { year: currentYear.toString(), userId: dbUser.id },
  });

  const existingContribution = await db.contribution.findFirst({
    where: {
      contribution_date: formatDateToISO(new Date()),
      userId: dbUser.id,
    },
  });

  if (existingYear) {
    if (existingContribution) {
      await db.contribution.update({
        where: { id: existingContribution.id },
        data: {
          count: totalWordCount - dbUser.wordCountRef < 0 ? 0 : totalWordCount - dbUser.wordCountRef,
          intensity: intensityLevel,
        },
      });
    } else {
      await db.contribution.create({
        data: {
          userId: dbUser.id,
          yearId: existingYear.id,
          contribution_date: formatDateToISO(new Date()),
          color: "#239a3b",
          count: totalWordCount - dbUser.wordCountRef < 0 ? 0 : totalWordCount - dbUser.wordCountRef,
          intensity: intensityLevel,
        },
      });
      await db.year.update({
        where: { id: existingYear.id },
        data: { total: { increment: 1 } },
      });
    }
  } else {
    const createdYear = await db.year.create({
      data: {
        userId: user.id,
        year: currentYear.toString(),
        total: totalContributions,
        start_date: new Date(currentYear, 0, 1),
        end_date: new Date(Number(currentYear) + 1, 0, 0),
      },
    });

    await db.contribution.create({
      data: {
        userId: user.id,
        yearId: createdYear.id,
        contribution_date: formatDateToISO(new Date()),
        color: "#239a3b",
        count: totalWordCount - dbUser.wordCountRef < 0 ? 0 : totalWordCount - dbUser.wordCountRef,
        intensity: intensityLevel,
      },
    });
  }

  return { message: "Contribution added successfully" };
}

export { addContribution };

/**
 * SCRAP YARD
 * TO BE RECYCLED LATER
 */

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
