"use client"

import loginSchema from "@/validations/loginSchema";
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
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/login";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/utils/auth";


const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const { token } = await loginUser(values);
            login(token);
            router.push('/aulas');
        } catch {
            toast({
                title: "Error",
                description: "Hubo un error al iniciar sesión",
                variant: "destructive"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-2/4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo</FormLabel>
                            <FormControl>
                                <Input placeholder="Correo electrónico" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Contraseña" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <br></br>

                <Button
                    type="submit"
                    className="w-full text-center flex justify-center mt-4 min-h-12 font-roboto">
                    Iniciar Sesión
                </Button>

            </form>
        </Form>
    )
}

export default LoginForm;

