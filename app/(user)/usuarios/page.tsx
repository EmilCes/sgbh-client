"use client"

import { jwtDecode } from 'jwt-decode';

import TableManager from '@/components/general/TableManager';
import { userTableFields } from './constants';
import { deleteUser, getUsers } from '@/lib/api/users';
import { UserFormCard } from './UserFormCard';
import { User } from '@/types/user';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DecodedToken {
  role: string;
}

const UserPage = () => {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        if (decodedToken.role !== "ADMIN") {
          router.push("/aulas");
        }
      } catch(error) {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router])

  return (
    <TableManager<User>
      title="Gestión de Usuarios"
      columns={userTableFields}
      idField="idUser"
      fetchData={getUsers}
      deleteFunction={deleteUser}
      FormCard={UserFormCard}
    />
  );
};

export default UserPage;