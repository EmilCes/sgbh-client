import { Toaster } from "@/components/ui/toaster";
import UvNavbar from "../components/UvNavbar";

// app/login/layout.tsx
function UserLayout({ children }:
  { children: React.ReactNode }) {
  return (
    <>
      <UvNavbar />
      <div className="h-screen">
        {children}
      </div>
      <Toaster />
    </>
  );
}

export default UserLayout;
