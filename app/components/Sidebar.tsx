"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { menuLinks } from "../../constants/menuLinks";
import Link from "next/link";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed z-50 p-2 top-16 left-4 flex items-center space-x-4">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {/* Condicional para cambiar de ícono según el estado */}
                    {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </button>

                <span className="text-base font-semibold">FEI</span>
            </div>

            {/* Sidebar con transición */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 dark:bg-slate-900 dark:border-slate-700 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                aria-label="Sidebar"
            >
                <div className="flex h-full flex-col overflow-y-auto px-3 py-4">

                    <ul className="mt-20 space-y-2 text-sm font-medium">
                        {menuLinks.map((link, index) => (

                            <li key={index}>
                                <Link
                                    href={link.href}
                                    className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 
                                            dark:text-white dark:hover:bg-slate-700">
                                    {link.icon && (
                                        <link.icon className="h-5 w-5" />
                                    )}
                                    <span className="ml-3 flex-1 whitespace-nowrap">{link.name}</span>
                                </Link>
                            </li>

                        ))}
                    </ul>

                    <div className="mt-auto flex">
                        <div className="flex w-full justify-between">
                            <span className="text-sm font-medium text-black dark:text-white">email@example.com</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-roledescription="more menu" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-black dark:text-white" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                            </svg>
                        </div>
                    </div>

                </div>
            </aside>
        </>
    );
};

export default Sidebar;
