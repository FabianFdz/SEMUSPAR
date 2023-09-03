import { StatusChip } from "@/components/StatusChip";
import { createColumnHelper } from "@tanstack/react-table";
import NombreCol from "./NombreCol";
import FechaNacimientoCol from "./FechaNacimientoCol";
import Header from "./Header";
import Link from "next/link";
import { Estudiante } from "@prisma/client";

const columnHelper = createColumnHelper<Estudiante>();
export const estudiantesColumnsDef = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    cell: (info) => {
      const isNew =
        info.row.original.created_at.valueOf() >
        Date.now() - 1000 * 60 * 60 * 24 * 7;

      const withoutProf =
        // The docente is alternativo, regular or is empty
        ["", "alternativo", "regular"].includes(
          (info.row.original.docente ?? "").trim().toLowerCase()
        ) && info.row.original.estado; // y se encuentra activo
      return (
        <div className="flex flex-row items-center space-x-2">
          <Link
            className="text-blue-600"
            href={`/estudiantes/${info.row.original.id}`}
          >
            #{info.getValue()}
          </Link>
          {withoutProf && (
            <div
              title="Sin profesor asignado"
              className="flex flex-row items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-800"
            >
              <p className="text-sm font-medium">Sin Profesor</p>
            </div>
          )}
          {isNew && (
            <div
              title="Nuevo"
              className="flex flex-row items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-800"
            >
              <p className="text-sm font-medium">Nuevo</p>
            </div>
          )}
        </div>
      );
    },
    header: () => <Header text="ID" />,
  }),
  columnHelper.accessor((row) => row.estado, {
    id: "estado",
    cell: (info) => <StatusChip active={info.getValue()} />,
    header: () => <Header text="Estado" />,
  }),
  columnHelper.accessor((row) => row.fecha_nacimiento, {
    id: "fecha_nacimiento",
    cell: (info) => <FechaNacimientoCol fechaNacimiento={info.getValue()} />,
    header: () => <Header text="Fecha de Nacimiento" />,
  }),
  columnHelper.accessor((row) => row.cedula, {
    id: "cedula",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <Header text="Cédula" />,
  }),
  columnHelper.accessor((row) => row.nombre_completo, {
    id: "nombre_completo",
    cell: (info) => (
      <NombreCol email={info.row.original.email} nombre={info.getValue()} />
    ),
    header: () => <Header text="Nombre Completo" />,
  }),
  columnHelper.accessor((row) => row.instrumento, {
    id: "instrumento",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <Header text="Instrumento(s)" />,
  }),
  columnHelper.accessor((row) => row.docente, {
    id: "docente",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <Header text="Profesor" />,
  }),
];
