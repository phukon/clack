// import { db } from '@/lib/db';

// // const prisma = new PrismaClient();

// async function populateContributionsAndYears(data: any) {
//   // try {
//     // Extract years and contributions from data
//     const { years, contributions } = data;

//     // Iterate over years and create records in the year table
//     for (const yearData of years) {
//       const year = await db.year.create({
//         data: {
//           userId: 'clsocif2e0000xosmdbht8b00', // Assuming user ID is 1, replace with the actual user ID
//           year: yearData.year,
//           total: yearData.total,
//           start_date: new Date(yearData.range.start),
//           end_date: new Date(yearData.range.end),
//         },
//       });

//       // Filter contributions for the current year
//       const yearContributions = contributions.filter(
//         (contribution: any) => contribution.date.startsWith(yearData.year)
//       );

//       // Create contributions for the current year
//       for (const contributionData of yearContributions) {
//         await db.contribution.create({
//           data: {
//             yearId: year.id,
//             contribution_date: new Date(contributionData.date),
//             count: contributionData.count,
//             color: contributionData.color,
//             intensity: contributionData.intensity.toString(), // Assuming intensity is stored as String
//           },
//         });
//       }
//     }

//     console.log('Contributions and years populated successfully.');
//   // } catch (error) {
//   //   console.error('Error populating contributions and years:', error);
//   // } finally {
//   //   await prisma.$disconnect();
//   // }
// }

// import mockData from "./mock.json";
// // Call the function with the provided data
// populateContributionsAndYears(mockData);
