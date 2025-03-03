import { Button } from "@/components/ui/button";
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { useAxios } from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().min(6, {
        message: "Enter valid Email.",
    }),
    role: z.string().min(2, {
        message: "Role must be at least 2 characters.",
    }),
    department: z.string().min(2, {
        message: "Department must be at least 2 characters.",
    }),
})

function Home() {

    const employeeForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            department: "",
            role: ""
        },
    })

    const axiosPri = useAxios();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const getEmployees = async () => {
            const response = await axiosPri.get(`/employees`, { withCredentials: true });
            setEmployees(response.data);
        }
        getEmployees();
        console.log(employees);
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
            try {
                console.log('user');
            } catch (e) {
                console.log(e);
            }
        }

    return <>
        <div className="my-12 mx-64">
            <div className="flex justify-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}>Add Employee</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="mb-2">
                            <DialogTitle>Add Employee</DialogTitle>
                            {/* <DialogDescription>
                                Add a new Employee.
                            </DialogDescription> */}
                        </DialogHeader>
                        
                        <Form {...employeeForm}>
                            <form onSubmit={employeeForm.handleSubmit(onSubmit)} className="space-y-6 ">
                                <FormField
                                    control={employeeForm.control}
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
                                    control={employeeForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="xyz" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={employeeForm.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <FormControl>
                                                <Input placeholder="xyz" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={employeeForm.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Department</FormLabel>
                                            <FormControl>
                                                <Input placeholder="xyz" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full mt-2" variant="destructive">Save changes</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <Table className="text-center mt-6">
                <TableCaption>A list of employees.</TableCaption>
                <TableHeader>
                    <TableRow className="font-extrabold">
                        <TableHead className="text-left">Name</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Position</TableHead>
                        <TableHead className="text-center">Department</TableHead>
                        <TableHead className="text-center">Created By</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((item: any, index) =>
                        <TableRow key={index}>
                            <TableCell className="text-left">{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.position}</TableCell>
                            <TableCell>{item.department}</TableCell>
                            <TableCell className="text-center">{item.createdBy.name}</TableCell>
                            <TableCell className="text-right flex gap-2 justify-end">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"outline"}>Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit profile</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={employeeForm.handleSubmit(onSubmit)} className="grid gap-4 py-4"  {...employeeForm}>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input id="name" value={item.name} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="email" className="text-right">
                                                    Email
                                                </Label>
                                                <Input id="email" value={item.email} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="role" className="text-right">
                                                    Role
                                                </Label>
                                                <Input id="role" value={item.position} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="department" className="text-right">
                                                    Department
                                                </Label>
                                                <Input id="department" value={item.department} className="col-span-3" />
                                            </div>
                                        </form>
                                        <DialogFooter>
                                            <Button type="submit" variant={"outline"}>Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button variant={"outline"}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    </>
}

export default Home;
