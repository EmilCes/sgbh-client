"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/lib/utils/auth";


export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        return redirect("/login");
      }
    }, [isAuthenticated, isLoading]);


    if (isLoading) {
      return <div>Cargando...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}