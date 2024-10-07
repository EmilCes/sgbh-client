"use client"

import Link from "next/link";
import { menuLinks } from "../../constants/menuLinks";
import { usePathname } from "next/navigation";

const Navbar = () => {

    const pathName = usePathname();

    return (
        <div className="bg-white flex items-center justify-between p-4 shadow-lg">
            <h1 className="ml-7 tracking-widest">FEI</h1>

            <div className="flex items-center space-x-12">
                {
                    menuLinks.map((link, index) => (
                        <Link
                            key={index} 
                            href={link.href}
                            className={`hover:text-blue-600 hover:underline-offset-4 ${
                                pathName === link.href ? "text-blue-600" : ""
                              }`}
                        >
                            {link.name}
                        </Link>
                    ))
                }
            </div>

            <div className=" w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white">E</span>
            </div>
        </div>
    )
}

export default Navbar;