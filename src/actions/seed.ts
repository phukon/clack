import { db } from "@/lib/db";
import { seedUserData } from "@/app/(protected)/graph/_addData";

export const seedData = async (userId: string) => {
  await seedUserData(userId)
  console.log('Done!')
}