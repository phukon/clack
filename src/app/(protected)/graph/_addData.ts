'use server'
import { db } from '@/lib/db';

import jsonData from './mock.json';


export async function seedUserData(userId: string) {
  try {
    console.log('starting seeds')
    const existingUser = await db.user.findUnique({
      where: { id: userId },
      include: { years: true }, // Include years associated with the user
    });
    if (!existingUser) {
      throw new Error(`User with id ${userId} not found`);
    }

    // Iterate over each year in the JSON data
    for (const yearData of jsonData.years) {
      const existingYear = existingUser.years.find(year => year.year === yearData.year);
      if (existingYear) {
        // Update the existing year
        await db.year.update({
          where: { id: existingYear.id },
          data: {
            total: yearData.total,
            start_date: new Date(yearData.range.start),
            end_date: new Date(yearData.range.end),
          },
        });
      } else {
        // Create a new year for the user
        await db.year.create({
          data: {
            year: yearData.year,
            total: yearData.total,
            start_date: new Date(yearData.range.start),
            end_date: new Date(yearData.range.end),
            user: { connect: { id: userId } }
          }
        });
      }
    }
    console.log('Years updated successfully for user:', existingUser.email);
  } catch (error) {
    console.error('Error seeding user data:', error);
  }
}

// Usage example
const userId = 'clsocif2e0000xosmdbht8b00'; // Replace 'USER_ID_HERE' with the actual user ID
// seedUserData(userId);


// async function seedUserData(userId: string) {
//   try {
//     const existingUser = await db.user.findUnique({
//       where: { id: userId },
//       include: { years: true }, // Include years associated with the user
//     });
//     if (!existingUser) {
//       throw new Error(`User with id ${userId} not found`);
//     }

//     if (!existingUser.years || existingUser.years.length === 0) {
//       // If the user doesn't have any years data, seed it
//       for (const yearData of jsonData.years) {
//         await db.year.create({
//           data: {
//             year: yearData.year,
//             total: yearData.total,
//             start_date: new Date(yearData.range.start),
//             end_date: new Date(yearData.range.end),
//             user: { connect: { id: userId } }
//           }
//         });
//       }
//       console.log('Years seeded successfully for user:', existingUser.email);
//     } else {
//       console.log('User already has years data:', existingUser.email);
//     }
//   } catch (error) {
//     console.error('Error seeding user data:', error);
//   }
// }

// // Usage example
// const userId = 'clsocif2e0000xosmdbht8b00'; // Replace 'clsocif2e0000xosmdbht8b00' with the actual user ID
// seedUserData(userId);


// async function seedUserData(userId: string) {
//   try {
//     const existingUser = await db.user.findUnique({
//       where: { id: userId },
//       include: { years: { include: { contributions: true } } }, // Include years and their contributions associated with the user
//     });
//     if (!existingUser) {
//       throw new Error(`User with id ${userId} not found`);
//     }

//     if (!existingUser.years || existingUser.years.length === 0) {
//       // If the user doesn't have any years data, seed it
//       for (const yearData of jsonData.years) {
//         const createdYear = await db.year.create({
//           data: {
//             year: yearData.year,
//             total: yearData.total,
//             start_date: new Date(yearData.range.start),
//             end_date: new Date(yearData.range.end),
//             user: { connect: { id: userId } }
//           },
//           include: { contributions: true } // Include contributions for the created year
//         });

//         // Filter contributions for the current year from the JSON
//         const contributionsForYear = jsonData.contributions.filter(contribution => contribution.date.startsWith(yearData.year));

//         // Seed contributions for the created year
//         for (const contributionData of contributionsForYear) {
//           await db.contribution.create({
//             data: {
//               yearId: createdYear.id,
//               contribution_date: new Date(contributionData.date),
//               count: contributionData.count,
//               color: contributionData.color,
//               intensity: contributionData.intensity.toString() // Assuming intensity is a string
//             }
//           });
//         }
//       }
//       console.log('Years and contributions seeded successfully for user:', existingUser.email);
//     } else {
//       console.log('User already has years and contributions data:', existingUser.email);
//     }
//   } catch (error) {
//     console.error('Error seeding user data:', error);
//   }
// }

// // Usage example
// const userId = 'clsocif2e0000xosmdbht8b00'; // Replace 'clsocif2e0000xosmdbht8b00' with the actual user ID
// seedUserData(userId);
