import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required!"
  }) // min value not set to not block old users due to changes
})