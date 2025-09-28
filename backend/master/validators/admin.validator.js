import z from 'zod';
export const adminLoginValidator = z.object({
    email: z.email(),
    password: z.string().min(6)
});