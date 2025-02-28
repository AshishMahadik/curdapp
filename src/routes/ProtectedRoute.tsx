import { AuthContext } from "@/context/authProvider"
import { useContext, useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator";


export default function ProtectedRoute() {

    const currentRoute = useLocation();
    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    function customNav(path: string) {
        nav(path);
    }

    useEffect(() => {
        if (!token) {
            nav('/login');
        }
    }, [token]);
    return <>
        <NavigationMenu className="px-10 py-4 flex justify-between max-w-full">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <h1 className="font-extrabold text-2xl">CURDAPP</h1>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList className="flex gap-12 border rounded-2xl overflow-hidden relative px-6 py-2">
                <span className={"w-14 h-0.5 bg-[#578E7E] absolute bottom-2 transition-all "+ (currentRoute.pathname=='/app/home'? 'left-4':'left-29')}>
                    <span className={"absolute bottom-0 left-0 bg-[#578E7E] w-0.5 transition-all "+ (currentRoute.pathname=='/app/home'? 'h-2':'h-0')}></span>
                    <span className={"absolute bottom-0 right-0 bg-[#578E7E] w-0.5 transition-all "+ (currentRoute.pathname=='/app/home'? 'h-0':'h-2')}></span>
                </span>
                <NavigationMenuItem onClick={() => customNav('/app/home')}>
                    {/* <Button variant={'ghost'}> */}
                        {/* <NavigationMenuLink itemType="button" onClick={() => customNav('/app/home')}> */}
                            Home
                        {/* </NavigationMenuLink> */}
                    {/* </Button> */}
                    {/* <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>Link</NavigationMenuLink>
                    </NavigationMenuContent> */}
                </NavigationMenuItem>
                <NavigationMenuItem onClick={() => customNav('/app/profile')}>
                    {/* <Button variant={'ghost'}> */}
                        {/* <NavigationMenuLink onClick={() => customNav('/app/profile')}> */}
                            Profile
                        {/* </NavigationMenuLink> */}
                    {/* </Button> */}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <Separator />
        <div>
            <Outlet />
        </div>
    </>
}