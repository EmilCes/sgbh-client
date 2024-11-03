import { z } from 'zod';

const RoleEnum = z.enum(['ADMIN', 'USER']);

const userSchema = z.object({
    name: z
        .string()
        .min(1, { message: "El nombre es obligatorio" })
        .max(70, { message: "El nombre debe tener un máximo de 70 caracteres" }),

    lastName: z
        .string()
        .min(1, { message: "El apellido es obligatorio" })
        .max(70, { message: "El apellido debe tener un máximo de 70 caracteres" }),

    institutionalEmail: z
        .string()
        .email()
        .min(1, { message: "La cuenta institucional es obligatoria." })
        .max(52, { message: "La cuenta institucional debe tener un máximo de 52 caracteres" }),

    role: RoleEnum

});

export default userSchema;