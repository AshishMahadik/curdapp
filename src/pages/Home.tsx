import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";
import { useEffect, useState } from "react";

function Home() {

    const axiosPri = useAxios();
    const [employees, setEmployees] = useState([]);
    // const [user, setUser] = useState<>();

    useEffect(() => {
        const getEmployees = async () => {
            const response = await axiosPri.get(`/employees`, { withCredentials: true });
            setEmployees(response.data);
        }
        getEmployees();
        // console.log(employees);
    }, []);

    useEffect(() => {
        console.log('employees', employees);
    }, [employees]);

    // useEffect(() => {
    //     if (user?.token) {
    //         setToken(user.token);
    //     }
    //     console.log('user', user);
    // }, [user]);

    return <>
        <div className="grid place-items-center">
            {employees.map((item) => {
                return Object.entries(item).map(
                    (subItem, index) =>
                        <p key={index}> <strong>{subItem[0]}</strong> :{JSON.stringify(subItem[1])} </p>
                )
            })}
        </div>
        <div>
            <Button variant={'destructive'}>Logout</Button>
        </div>
    </>
}

export default Home;
