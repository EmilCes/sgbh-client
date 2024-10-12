"use client"

import { useAuth } from "@/lib/utils/auth";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

const Avatar = () => {

    const { logout } = useAuth();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className=" w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer">
                    <span className="text-white">U</span>
                </div>
            </PopoverTrigger>

            <PopoverContent className="bg-gray-100 shadow-md p-2 focus:outline-none rounded-sm">
                <button
                    onClick={() => logout()}
                    className="w-full text-left text-gray-800 hover:bg-gray-200 rounded-sm p-1"
                >
                    Cerrar Sesión
                </button>
            </PopoverContent>
        </Popover>
    )
}

export default Avatar;