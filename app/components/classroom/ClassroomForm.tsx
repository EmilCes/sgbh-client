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


interface ClassroomFormProps {
    onClose: () => void;
  }

const ClassroomForm = ({ onClose }: ClassroomFormProps) => {

    const form = useForm<z.infer<typeof classroomSchema>>({
        resolver: zodResolver(classroomSchema)
    });

    function onSubmit(values: z.infer<typeof classroomSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <div className="col-span-1">
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
                </div>

                <div className="grid grid-cols-3 gap-4">

                    {/* AQUI FALTA UNO */}

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
                </div>

                <div className="grid grid-cols-3 gap-4">
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
                </div>

                <div className="grid grid-cols-3 gap-4">
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

                </div>

                <div className="grid grid-cols-3 gap-4">

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

                    {/* Chechkox para aire acondicionado */}
                </div>

                <div className="flex justify-between pt-4">
                    <Button variant="destructive" onClick={onClose}>Cancelar</Button>
                    <Button type="submit">Registrar</Button>
                </div>

            </form>
        </Form>
    )
}

export default ClassroomForm;

