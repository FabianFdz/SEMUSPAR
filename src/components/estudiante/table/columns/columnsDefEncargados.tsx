import { createColumnHelper } from "@tanstack/react-table";
import NombreCol from "./NombreCol";
import Header from "./Header";
import { EncargadosInfoTable } from "../EncargadosList";
import Link from "next/link";

const columnHelper = createColumnHelper<EncargadosInfoTable>();
export const encargadosColumnsDef = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    cell: (info) => {
      // y se encuentra activo
      return <>#{info.getValue()}</>;
    },
    header: () => <Header text="ID" />,
  }),
  columnHelper.accessor((row) => row.nombre_completo, {
    id: "nombre_completo",
    cell: (info) => (
      <NombreCol email={info.row.original.email} nombre={info.getValue()} />
    ),
    header: () => <Header text="Nombre Completo" />,
  }),
  columnHelper.accessor((row) => row.ocupacion, {
    id: "ocupacion",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <Header text="Ocupación" />,
  }),
  columnHelper.accessor((row) => row.telefono, {
    id: "telefono",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <Header text="Teléfono" />,
  }),
  columnHelper.accessor((row) => row.parentezco, {
    id: "parentezco",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <Header text="Parentezco" />,
  }),
  columnHelper.accessor((row) => row.estudiante.nombre_completo, {
    id: "estudiante",
    cell: (info) => (
      <div className="space-x-1">
        <Link
          className="text-blue-600"
          href={`/estudiantes/${info.row.original.estudiante_id}`}
        >
          #{info.row.original.estudiante_id}
        </Link>
        <span>{info.getValue()}</span>
      </div>
    ),
    header: () => <Header text="Estudiante" />,
  }),
];
