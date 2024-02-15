/**
 * This is all for server components.
 * Not making any api requests, we are just extracting the thingies.
 */
import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
