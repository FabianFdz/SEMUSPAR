"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEstudiante } from "@/hooks/useEstudiante";

interface Props {
  estudianteId: number;
}

export default function DeleteEstudianteBtn({ estudianteId }: Props) {
  const router = useRouter();
  const { deleteEstudiante } = useEstudiante();
  const handleDelete = async () => {
    if (confirm(`¿Desea borrar el estudiante?`)) {
      await deleteEstudiante(estudianteId);
      router.push("/estudiantes");
    }
  };
  return (
    <button onClick={handleDelete} className="text-red-500 font-bold">
      Eliminar
    </button>
  );
}
