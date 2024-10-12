"use client"

import Link from "next/link";
import { menuLinks } from "../../constants/menuLinks";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";

const Navbar = () => {

    const pathName = usePathname();

    return (
        <div className="bg-white flex items-center justify-between p-4 shadow-lg">
            <div className="ml-7">
                <h1 className="tracking-widest">FEI</h1>
            </div>

            <div className="flex items-center space-x-12">
                {
                    menuLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={`hover:text-blue-600 hover:underline-offset-4 ${pathName === link.href ? "text-blue-600" : ""
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))
                }
            </div>

            <div className="mr-7">
                <Avatar />
            </div>

        </div>
    )
}

export default Navbar;