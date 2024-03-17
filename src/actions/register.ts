"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { formatDateToISO } from "@/lib/formatDateToISO";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // validate again on the backend because client-side validation can be bypassed
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      wordCountRef: 0,
    },
  });

  const currentYear = new Date().getFullYear();

  const createdYear = await db.year.create({
    data: {
      userId: user.id,
      year: currentYear.toString(),
      total: 0,
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
      count: 0,
      intensity: 0,
    },
  });

  // TODO: Send verification token
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email sent!" };
};
