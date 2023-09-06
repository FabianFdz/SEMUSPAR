import Link from "next/link";
import { prismaClient } from "@/services/prismaClient";
import EstudiantesList, {
  EstudiantesInfoTable,
} from "@/components/estudiante/table/EstudiantesList";
import {
  Button,
  baseClasses,
  primaryClasses,
  secondaryClasses,
} from "@/components/lib/Button";
import RefreshArrow from "@/components/icons/RefreshArrow";
import RefreshButton from "@/components/lib/RefreshButton";
import EncargadosList from "@/components/estudiante/table/EncargadosList";

const fetchEncargados = async () => {
  const estudiantes = await prismaClient.encargado.findMany({
    include: {
      estudiante: {
        select: {
          nombre_completo: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return estudiantes;
};

interface Props {
  searchParams: Partial<EstudiantesInfoTable>;
}

export default async function Encargados({ searchParams }: Props) {
  const encargados = await fetchEncargados();

  return (
    <main className="flex flex-col w-full flex-1 px-20 text-center">
      <div className="mb-3">
        <h1 className="text-xl font-bold text-left">Encargados</h1>
      </div>
      <EncargadosList encargados={encargados} />
    </main>
  );
}

export const dynamic = "force-dynamic";
