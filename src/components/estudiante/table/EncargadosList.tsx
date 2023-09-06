"use client";

import { useState } from "react";
import Table from "@/components/Table";
import Filtros from "./filtros/FiltrosEncargados";
import { Encargado } from "@prisma/client";
import { encargadosColumnsDef } from "./columns/columnsDefEncargados";

export type EncargadosInfoTable = Encargado & {
  estudiante: { nombre_completo: string };
};

interface Props {
  encargados: Array<Encargado & { estudiante: { nombre_completo: string } }>;
}

export default function EncargadosList({ encargados }: Props) {
  const [filteredEncargados, setFilteredEncargados] = useState(encargados);

  return (
    <>
      <Filtros data={encargados} setFilteredEncargado={setFilteredEncargados} />
      <Table columns={encargadosColumnsDef} data={filteredEncargados} />
    </>
  );
}
