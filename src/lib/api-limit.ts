import { MAX_FREE_COUNTS } from "@/lib/constants";
import { db } from "./db";
import { currentUser } from "./auth";
import { getUserById } from "@/data/user";

export const incrementApiLimit = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  if (!user.id) throw new Error("Invalid user ID");

  const dbUser = await getUserById(user.id);
  if (!dbUser) throw new Error("Unauthorized");

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId: dbUser.id },
  });

  if (userApiLimit) {
    await db.userApiLimit.update({
      where: { userId: dbUser.id },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await db.userApiLimit.create({
      data: { userId: dbUser.id, count: 1 },
    });
  }
};

export const checkApiLimit = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  if (!user.id) throw new Error("Invalid user ID");

  const dbUser = await getUserById(user.id);
  if (!dbUser) throw new Error("Unauthorized");

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId: dbUser.id },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  if (!user.id) throw new Error("Invalid user ID");

  const dbUser = await getUserById(user.id);
  if (!dbUser) throw new Error("Unauthorized");

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId: dbUser.id,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
