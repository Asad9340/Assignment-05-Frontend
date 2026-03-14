import { z } from 'zod';
export const loginZodSchema = z.object({
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must contain at least one letter and one number',
    ),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;
