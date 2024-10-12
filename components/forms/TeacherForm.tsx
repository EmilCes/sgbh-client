"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import teacherSchema from "@/validations/teacherSchema";
import { useEffect, useState } from "react";
import { createTeacher, updateTeacher } from "@/lib/api/teachers";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Teacher } from "@/types/teacher";


interface TeacherFormCardProps {
    onClose: () => void;
    onTeacherAdded: () => void;
    teacherData?: Teacher | null;
}

const TeacherForm = ({ onClose, onTeacherAdded, teacherData }: TeacherFormCardProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof teacherSchema>>({
        resolver: zodResolver(teacherSchema),
        defaultValues: teacherData || {}
    });

    useEffect(() => {
        if (teacherData) {
            form.reset({
                ...teacherData,
                personalNumber: teacherData.personalNumber ? Number(teacherData.personalNumber) : undefined,
                antiquity: teacherData.antiquity ? Number(teacherData.antiquity) : undefined
            });
        }
    }, [teacherData, form])

    async function onSubmit(values: z.infer<typeof teacherSchema>) {
        setIsLoading(true);
        setError(null);

        try {
            if (teacherData) {
                await updateTeacher(teacherData.idTeacher, values);
            } else {
                await createTeacher(values);
            }

            form.reset();
            onTeacherAdded();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrio un error al crear el profesor');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre (s)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellidos</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apellidos" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="personalNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numero de Personal</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Numero de personal" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="antiquity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Antigüedad</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Antigüedad" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="personalAccount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cuenta Personal</FormLabel>
                                <FormControl>
                                    <Input placeholder="Cuenta personal" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="institutionalAccount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cuenta Institucional</FormLabel>
                                <FormControl>
                                    <Input placeholder="Cuenta institucional" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="uvAdmissionDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Admisión a UV</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Fecha de admisión a la UV" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="birthdate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Nacimiento</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Fecha de nacimiento" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <br></br>

                <div className="flex justify-between pt-4">
                    <Button variant="destructive" onClick={onClose} disabled={isLoading}>Cancelar</Button>
                    <Button type="submit" disabled={isLoading}>
                        {
                            isLoading 
                            ? 
                                (teacherData ? 
                                    'Actualizando...' : 'Registrando...') 
                            : (teacherData ? 
                                    'Actualizar' : 'Registrar') 
                        }
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default TeacherForm;
