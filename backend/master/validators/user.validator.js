import {z} from 'zod';

export const userLoginValidator = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export const userRegisterValidator = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
});

