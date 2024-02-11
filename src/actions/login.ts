'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // validate again on the backend because client-side validation can be bypassed
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  return {success: "Email sent!"}
};
