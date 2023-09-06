"use client";

import { useState } from "react";
import Table from "@/components/Table";
import Filtros from "./filtros/FiltrosEstudiantes";
import { Estudiante } from "@prisma/client";
import { estudiantesColumnsDef } from "./columns/columnsDef";

export interface EstudiantesInfoTable {
  id: number;
  estado: boolean;
  fecha_nacimiento: string;
  cedula: string;
  nombre_completo: string;
  email: string | null;
  instrumento: string;
  docente: string | null;
}

interface Props {
  estudiantes: Array<Estudiante>;
  searchParams: Partial<Estudiante>;
}

export default function EstudiantesList({ estudiantes, searchParams }: Props) {
  const [filteredEstudiantes, setFilteredEstudiantes] = useState(estudiantes);

  return (
    <>
      <Filtros
        data={estudiantes}
        searchParams={searchParams}
        filteredEstudiantes={filteredEstudiantes}
        setFilteredEstudiantes={setFilteredEstudiantes}
      />
      <Table columns={estudiantesColumnsDef} data={filteredEstudiantes} />
    </>
  );
}
