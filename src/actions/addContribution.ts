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
import { extractNotionData } from "@/lib/extractNotionData";
import { formatDateToISO } from "@/lib/formatDateToISO";
import { NoteType } from "@prisma/client";

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

  // Update wordCount for Notion documents
  const notionDocuments = await db.note.findMany({
    where: { userId: dbUser.id, type: NoteType.NOTION },
  });

  const getWordCount = (str: string): number => {
    return str.split(/\s+/).length;
  };

  const getIdFromUrl = (url: string): string | null => {
    const match = url.match(/[a-zA-Z0-9]{32}/);
    return match ? match[0] : null;
  };

  try {
    for (const doc of notionDocuments) {
      const id = getIdFromUrl(doc.url!);
      if (!id) {
        throw new Error(`ID not found for ${doc.url}`);
      }
      const wordArray = await extractNotionData(id);
      const combinedString = wordArray.join(" ");
      const wordCount = getWordCount(combinedString);
      await db.note.update({
        where: { id: doc.id },
        data: { wordCount },
      });
    }
  } catch (error) {
    console.error("Error updating notion documents:", error);
    return { notionDoc_updation_error: error };
  }

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

  try {
    if (existingYear) {
      if (existingContribution) {
        await db.contribution.update({
          where: { id: existingContribution.id },
          data: {
            count: Math.max(totalWordCount - dbUser.wordCountRef, 0),
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
            count: Math.max(totalWordCount - dbUser.wordCountRef, 0),
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
          end_date: new Date(currentYear + 1, 0, 0),
        },
      });

      await db.contribution.create({
        data: {
          userId: user.id,
          yearId: createdYear.id,
          contribution_date: formatDateToISO(new Date()),
          color: "#239a3b",
          count: Math.max(totalWordCount - dbUser.wordCountRef, 0),
          intensity: intensityLevel,
        },
      });
    }
  } catch (error) {
    console.error("Error updating contributions:", error);
    return { contribution_updation_error: error };
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
