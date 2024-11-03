"use client"

import isAuth from '@/components/auth/isAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function HomePage() {

  const router = useRouter();

  useEffect(() => {
    router.push('/aulas');
  }, [router]);

  return (
    <div>Redirigiendo...</div>
  )
}

export default isAuth(HomePage);
