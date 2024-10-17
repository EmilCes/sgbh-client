"use client"

import LoginForm from "@/components/forms/LoginForm";
import { useAuth } from "@/lib/utils/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Login = () => {

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      return redirect("/aulas");
    }
  }, [isAuthenticated]);

  return (
    <>

      <div className="absolute top-0 right-0 bg-uvBlue text-white text-[16px] h-8 px-[2em] font-roboto font-bold">
        <a href="https://www.uv.mx" target="_blank">Universidad Veracruzana</a>
      </div>

      <div className="w-1/2 h-screen relative">
        <Image 
          className="object-cover"
          src="/images/login-cover.jpg"
          alt="Login Cover"
          fill
          priority
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center">

        <div className="text-[42px] text-[#666666] mb-6">
          <b className="font-extrabold">Inicio de Sesión</b>
        </div>

        <LoginForm />

      </div>
    </>
  );
};

export default Login;