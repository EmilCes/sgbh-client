"use client"

import TableManager from "@/components/general/TableManager"
import { Classroom } from "@/types/classroom"
import { classroomTableFields } from "./constants"
import { deleteClassroom, getClassrooms } from "@/lib/api/classrooms"
import { ClassroomFormCard } from "./ClassroomFormCard"
import isAuth from "@/components/auth/isAuth"

export const ClassroomPage = () => {
  return (
    <TableManager<Classroom>
        title="Gestión de Aulas"
        columns={classroomTableFields}
        idField="idClassroom"
        fetchData={getClassrooms}
        deleteFunction={deleteClassroom}
        FormCard={ClassroomFormCard}
    />
  )
}

export default isAuth(ClassroomPage); 
