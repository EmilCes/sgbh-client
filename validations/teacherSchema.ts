import { z } from 'zod';

const teacherSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(70, { message: "El nombre debe tener un máximo de 70 caracteres" }),

  lastName: z
    .string()
    .min(1, { message: "El apellido es obligatorio" })
    .max(70, { message: "El apellido debe tener un máximo de 70 caracteres" }),

  personalNumber: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "El número personal debe ser un número" })
    .transform((value) => Number(value)),

  antiquity: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "La antigüedad debe ser un número" })
    .transform((value) => Number(value)),

  personalAccount: z
    .string()
    .min(1, { message: "La cuenta personal es obligatoria" })
    .max(50, { message: "La cuenta personal debe tener un máximo de 50 caracteres" }),

  institutionalAccount: z
    .string()
    .min(1, { message: "La cuenta institucional es obligatoria" })
    .max(52, { message: "La cuenta institucional debe tener un máximo de 52 caracteres" }),

  uvAdmissionDate: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), { message: "La fecha de ingreso a UV debe ser una fecha válida" })
    .transform((value) => new Date(value).toISOString()),

  birthdate: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), { message: "La fecha de nacimiento debe ser una fecha válida" })
    .transform((value) => new Date(value).toISOString()),

});

export default teacherSchema;
