// 'use server';
// import { db } from '@/lib/db';
// import { currentUser } from '@/lib/auth';

// export const createNote = async () => {
//   const user = await currentUser();

//   if (!user) {
//     return 'Unauthorized'
//   }

//   if (user.id) {
//     let note = await db.note.create({
//       data: {
//         userId: user?.id,
//       },
//     });

//     return note.id
//   }
// };
