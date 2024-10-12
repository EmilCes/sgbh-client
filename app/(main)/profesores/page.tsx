"use client"

import { deleteTeacher, getTeachers } from "@/lib/api/teachers";
import TableManager from "@/components/general/TableManager";
import { Teacher } from "@/types/teacher";
import { TeacherFormCard } from "./TeacherFormCard";
import { teacherTableFields } from "./constants";
import isAuth from "@/components/auth/isAuth";

const TeacherPage = () => {
  return (
    <TableManager<Teacher>
        title="Gestión de Profesores"
        columns={teacherTableFields}
        idField="idTeacher"
        fetchData={getTeachers}
        deleteFunction={deleteTeacher}
        FormCard={TeacherFormCard}
    />
  )
}

export default isAuth(TeacherPage);