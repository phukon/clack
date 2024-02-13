'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth'; // for server actions
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {AuthError} from 'next-auth'
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // validate again on the backend because client-side validation can be bypassed
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const {email, password} = validatedFields.data
  const isExistingUser = await getUserByEmail(email)
  
  if (!isExistingUser || !isExistingUser.email || !isExistingUser.password) {
    return {error: "Email does not exist!"}
  }

  if(!isExistingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(isExistingUser.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {success: "Confirmation Email sent!"}
  }

  try{ // ⚠ these are all server actions
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {error: "Invalid credentials!"}
        default:
          return {error: "Something went wrong!"}
      }
    }
    throw error // caveat!
  }

  return {success: "Email sent!"}
};
