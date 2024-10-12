import { z } from 'zod';

const classroomSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre del aula debe tener al menos un carácter" })
    .max(50, { message: "El nombre del aula debe ser de máximo 50 caracteres" }),

  building: z
    .string()
    .min(1, { message: "El nombre del edificio es obligatorio" })
    .max(50, { message: "El nombre del edificio debe ser máximo de 50 caracteres" }),

  level: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "El nivel debe ser un número" })
    .transform((value) => Number(value)),

  width: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)), { message: "El ancho debe ser un número válido" })
    .transform((value) => parseFloat(value)),

  length: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)), { message: "El largo debe ser un número válido" })
    .transform((value) => parseFloat(value)),

  computerEquipment: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "El número de equipos debe ser un número" })
    .transform((value) => Number(value)),

  deskWithChair: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "El número de mesas con sillas debe ser un número" })
    .transform((value) => Number(value)),

  currentChairs: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "El número de sillas actuales debe ser un número" })
    .transform((value) => Number(value)),

  currentTables: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "El número de mesas actuales debe ser un número" })
    .transform((value) => Number(value)),

  maxChairsCapacity: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "El número máximo de sillas debe ser un número" })
    .transform((value) => Number(value)),

  maxTablesCapacity: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "El número máximo de mesas debe ser un número" })
    .transform((value) => Number(value)),

  lamps: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), { message: "El número de lámparas debe ser un número" })
    .transform((value) => Number(value)),

  thermalLevel: z
    .string()
    .min(1, { message: "El nivel termico es obligatorio" })
    .max(50, { message: "El nivel termino debe ser máximo de 50 caracteres" }),

  airConditioning: z
    .boolean()
    .refine((value) => typeof value === "boolean", {
      message: "A/C debe ser un valor booleano (true/false)"
    })
});

export default classroomSchema;
