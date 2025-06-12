import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string({
    required_error: 'Job title is required',
  }).min(3, {
    message: 'Job title must be at least 3 characters long',
  }),
  description: z.array(z.string(),{
    required_error: 'Job description is required',
  }).min(20, {
    message: 'Description must be at least 20 characters long',
  }),
  location: z.string({
    required_error: 'Location is required',
  }),
  pay: z.string({
    required_error: 'Pay is required',
  })
});
