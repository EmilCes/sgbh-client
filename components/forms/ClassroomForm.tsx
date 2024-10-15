import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import classroomSchema from "@/validations/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Classroom } from "@/types/classroom";
import { useEffect, useState } from "react";
import { createClassroom, updateClassroom } from "@/lib/api/classrooms";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Checkbox } from "../ui/checkbox";


interface ClassroomFormProps {
    onClose: () => void;
    onClassroomAdded: () => void;
    classroomData?: Classroom | null;
}

const ClassroomForm = ({ onClose, onClassroomAdded, classroomData }: ClassroomFormProps) => {
    console.log(classroomData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof classroomSchema>>({
        resolver: zodResolver(classroomSchema),
        defaultValues: classroomData || {}
    });

    useEffect(() => {
        if (classroomData) {
            form.reset({
                ...classroomData,
                level: classroomData.level ? Number(classroomData.level) : undefined,
                computerEquipment: classroomData.computerEquipment ? Number(classroomData.computerEquipment) : undefined,
                deskWithChair: classroomData.deskWithChair ? Number(classroomData.deskWithChair) : undefined,
                currentChairs: classroomData.currentChairs ? Number(classroomData.currentChairs) : undefined,
                currentTables: classroomData.currentTables ? Number(classroomData.currentTables) : undefined,
                maxChairsCapacity: classroomData.maxChairsCapacity ? Number(classroomData.maxChairsCapacity) : undefined,
                maxTablesCapacity: classroomData.maxTablesCapacity ? Number(classroomData.maxTablesCapacity) : undefined
            });
        };
    }, [classroomData, form]);

    async function onSubmit(values: z.infer<typeof classroomSchema>) {
        setIsLoading(true);
        setError(null);

        try {
            if (classroomData) {
                console.log('ClassroomId: ' + classroomData.idClassroom);
                await updateClassroom(classroomData.idClassroom, values);
            } else {
                await createClassroom(values);
            }

            form.reset();
            onClassroomAdded();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ocurrio un error al crear el aula");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del Aula</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingresa el nombre del aula" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">

                    <FormField
                        control={form.control}
                        name="building"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Edificio</FormLabel>
                                <FormControl>
                                    <Input placeholder="Edificio" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nivel</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nivel" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="width"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ancho</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ancho (M)" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="length"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Largo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Largo (M)" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="computerEquipment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Equipos de Computo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Equipos de computo" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="deskWithChair"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Escritorios con Silla</FormLabel>
                                <FormControl>
                                    <Input placeholder="Escritorios con silla" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="currentChairs"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sillas Actuales</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sillas Actuales" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="currentTables"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mesas Actuales</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mesas Actuales" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxChairsCapacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sillas Máximas</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sillas Máximas" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxTablesCapacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mesas Máximas</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mesas Máximas" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lamps"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lámparas</FormLabel>
                                <FormControl>
                                    <Input placeholder="Lámparas" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="thermalLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nivel Térmico</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nivel Térmico" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                </div>

                <div className="mt-4">
                    <FormField
                        control={form.control}
                        name="airConditioning"
                        render={({ field }) => (
                            <FormItem
                                className="flex flex-row items-start space-x-3 space-y-0"
                            >
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    ¿Cuenta con aire acondicionado?
                                </FormLabel>
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

                <div className="flex justify-between pt-4">
                    <Button variant="destructive" onClick={onClose} disabled={isLoading}>Cancelar</Button>
                    <Button type="submit" disabled={isLoading}>
                        {
                            isLoading
                                ?
                                (classroomData ?
                                    'Actualizando...' : 'Registrando...')
                                : (classroomData ?
                                    'Actualizar' : 'Registrar')
                        }
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default ClassroomForm;

