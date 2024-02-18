'use server';
import { db } from '@/lib/db';
import jsonData from './mock.json';

export async function seedUserData(userId: string) {
  try {
    console.log('Starting seeds');
    const existingUser = await db.user.findUnique({
      where: { id: userId },
      include: { years: { include: { contributions: true } } }, // Include years and contributions associated with the user
    });
    if (!existingUser) {
      throw new Error(`User with id ${userId} not found`);
    }

    // Iterate over each year in the JSON data
    for (const yearData of jsonData.years) {
      const existingYear = existingUser.years.find(
        (year) => year.year === yearData.year
      );
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
        const createdYear = await db.year.create({
          data: {
            year: yearData.year,
            total: yearData.total,
            start_date: new Date(yearData.range.start),
            end_date: new Date(yearData.range.end),
            user: { connect: { id: userId } },
          },
        });

        // Populate contributions for the newly created year
        const contributionsForYear = jsonData.contributions.filter(
          (contribution) => contribution.date.startsWith(yearData.year)
        );
        for (const contributionData of contributionsForYear) {
          await db.contribution.create({
            data: {
              year: { connect: { id: createdYear.id } },
              user: { connect: { id: userId } },
              contribution_date: new Date(contributionData.date),
              count: contributionData.count,
              color: contributionData.color,
              intensity: contributionData.intensity,
            },
          });
        }
      }
    }
    console.log(
      'Years and contributions updated successfully for user:',
      existingUser.email
    );
  } catch (error) {
    console.error('Error seeding user data:', error);
  }
}

// import { db } from '@/lib/db';

// import jsonData from './mock.json';

// export async function seedUserData(userId: string) {
//   try {
//     console.log('starting seeds')
//     const existingUser = await db.user.findUnique({
//       where: { id: userId },
//       include: { years: true }, // Include years associated with the user
//     });
//     if (!existingUser) {
//       throw new Error(`User with id ${userId} not found`);
//     }

//     // Iterate over each year in the JSON data
//     for (const yearData of jsonData.years) {
//       const existingYear = existingUser.years.find(year => year.year === yearData.year);
//       if (existingYear) {
//         // Update the existing year
//         await db.year.update({
//           where: { id: existingYear.id },
//           data: {
//             total: yearData.total,
//             start_date: new Date(yearData.range.start),
//             end_date: new Date(yearData.range.end),
//           },
//         });
//       } else {
//         // Create a new year for the user
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
//     }
//     console.log('Years updated successfully for user:', existingUser.email);
//   } catch (error) {
//     console.error('Error seeding user data:', error);
//   }
// }
