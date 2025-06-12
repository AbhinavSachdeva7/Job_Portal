import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long',
  }),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
