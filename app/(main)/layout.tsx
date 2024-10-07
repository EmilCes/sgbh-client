import { Toaster } from "@/components/ui/toaster";
import Navbar from "../components/Navbar";
import UvNavbar from "../components/UvNavbar";
import "../globals.css";

export default function MainLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <UvNavbar />
        <Navbar />
        <main>
            {children}
        </main>
        <Toaster />
    </>
  );
}
