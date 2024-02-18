'use server';
import { db } from '@/lib/db';

export async function getUserData(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        years: {
          include: { contributions: true },
        },
      },
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const yearsData = user.years.map(year => ({
      year: year.year,
      total: year.total,
      range: {
        start: year.start_date.toISOString().slice(0, 10),
        end: year.end_date.toISOString().slice(0, 10),
      },
    }));

    const contributionsData = user.years.flatMap(year => year.contributions.map(contribution => ({
      date: contribution.contribution_date.toISOString().slice(0, 10),
      count: contribution.count,
      color: contribution.color,
      intensity: parseInt(contribution.intensity),
    })));

    const userData = {
      years: yearsData,
      contributions: contributionsData,
    };

    return userData;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error;
  }
}

