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
  Nil = 0,
  Low = 1,
  Moderate = 2,
  High = 3,
  VeryHigh = 4,
}

async function calculateIntensityLevel(wordCount: number): Promise<IntensityLevel> {
  if (wordCount === 0) return IntensityLevel.Nil;
  if (wordCount >= 0 && wordCount <= 10) return IntensityLevel.Low;
  if (wordCount >= 11 && wordCount <= 50) return IntensityLevel.Moderate;
  if (wordCount >= 51 && wordCount <= 150) return IntensityLevel.High;
  return IntensityLevel.VeryHigh;
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

// util functions

function extractDocId(url: string): string {
  const parts = url.split("/");
  const index = parts.indexOf("d");
  return parts[index + 1];
}

// ---

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
  // Update wordCount for Google documents
  const googleDocuments = await db.note.findMany({
    where: { userId: dbUser.id, type: NoteType.GOOGLEDOC },
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
    for (const doc of googleDocuments) {
      const docId = extractDocId(doc.url!); // Assuming extractDocId is defined elsewhere in the file
      const response = await fetch(`${process.env.GOOGLE_SCRIPT_URL}?id=${docId}`);
      const { title, wordCount } = await response.json();

      await db.note.update({
        where: { id: doc.id },
        data: { wordCount, name: title },
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
  const intensityLevel = await calculateIntensityLevel(Math.max(totalWordCount - dbUser.wordCountRef, 0));
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
