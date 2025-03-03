import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAxios } from "@/hooks/useAxios";
import { logout, self } from "@/services/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const nav = useNavigate();
    const axiosPri = useAxios();
    const [user, setUser] = useState<any>();

    useEffect(()=>{
        const getSelf = async() => {setUser(await self(axiosPri))};
        getSelf();
    },[])
    useEffect(() => {
        console.log('user', user);
    }, [user]);

    function logoutUser() {
        logout(axiosPri).then((data)=>{
            console.log(data);
            nav('/login');
        });
    }

    return <>
        <div className="w-68 mx-auto my-24">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    {/* <CardDescription>Let's See Yourself</CardDescription> */}
                </CardHeader>
                <CardContent className="">
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    <p>Role: {user?.role}</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant={'destructive'} onClick={logoutUser}>Logout</Button>
                </CardFooter>
            </Card>
        </div>
    </>
}