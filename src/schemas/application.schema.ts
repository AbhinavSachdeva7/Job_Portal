import { z } from 'zod';

export const applyToJobSchema = z.object({
  coverLetter: z.string().min(10, {
    message: 'Cover letter must be at least 10 characters long.',
  }).optional(),
});

export type ApplyToJobDTO = z.infer<typeof applyToJobSchema>;
