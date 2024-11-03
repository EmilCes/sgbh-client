"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "@/components/ui/input"
import userSchema from "@/validations/userSchema";
import { useEffect, useState } from "react";
import { createUser, updateUser } from "@/lib/api/users";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { User } from "@/types/user";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface UserFormCardProps {
    onClose: () => void;
    onUserAdded: () => void;
    userData?: User | null;
}

const UserForm = ({ onClose, onUserAdded, userData }: UserFormCardProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: userData || {}
    });

    useEffect(() => {
        if (userData) {
            form.reset({
                ...userData
            });
        }
    }, [userData, form])

    async function onSubmit(values: z.infer<typeof userSchema>) {
        setIsLoading(true);
        setError(null);

        try {
            if (userData) {
                await updateUser(userData.idUser, values);
            } else {
                await createUser(values);
            }

            form.reset();
            onUserAdded();
        } catch (err: any) {
            if (err.message === "Unauthorized") {
                setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
            } else {
                setError(err instanceof Error ? err.message : 'Ocurrió un error al crear el usuario');
            }
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre (s) *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellidos *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apellidos" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="institutionalEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Institucional</FormLabel>
                                <FormControl>
                                    <Input placeholder="Correo institucional" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rol</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Roles</SelectLabel>
                                                <SelectItem value="ADMIN">Adminstrador</SelectItem>
                                                <SelectItem value="USER">Usuario Normal</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                                (userData ?
                                    'Actualizando...' : 'Registrando...')
                                : (userData ?
                                    'Actualizar' : 'Registrar')
                        }
                    </Button>
                </div>

            </form>
        </Form>
    )

}

export default UserForm;