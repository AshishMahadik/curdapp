import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { register } from "@/services/api"
import { useContext } from "react"
import { AuthContext } from "@/context/authProvider"

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    })
})

function Signup() {

    // const { token, setToken } = useContext(AuthContext);
    const nav = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const user = await register(values);
            console.log(user);
            // setToken(user.accessToken);
            nav('/login');
        } catch(e) {
            console.log(e);
        }
    }

    return <>
        <div className="grid grid-cols-2">
            <div>
                <img className="h-screen w-full object-cover" src="./src/assets/bg.jpg" alt="bg" />
            </div>
            <div className="grid place-items-center">
                <Card className="w-[50%] border-0 shadow-none">
                    <CardHeader className="text-center">
                        <CardTitle className="text-5xl">Welcome</CardTitle>
                        <CardDescription>Signup to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="abc xyz" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="abc@xyz.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pasword</FormLabel>
                                            <FormControl>
                                                <Input placeholder="●●●●●●●●●●" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" variant="outline">Signup</Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link to={'/login'} className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </>
}

export default Signup;