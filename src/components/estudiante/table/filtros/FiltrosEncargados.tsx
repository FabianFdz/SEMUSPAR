import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Encargado } from "@prisma/client";
import { EncargadosInfoTable } from "../EncargadosList";

interface Props {
  data: Array<EncargadosInfoTable>;
  setFilteredEncargado: Dispatch<SetStateAction<EncargadosInfoTable[]>>;
}

export default function FiltrosEncargado({
  data,
  setFilteredEncargado,
}: Props) {
  const [generalFiltro, setGeneralFiltro] = useState<string>("");

  const generalFilterEstudiantes = (searchCriteria: string) => {
    setGeneralFiltro(searchCriteria);
    setFilteredEncargado(
      data.filter((row) =>
        Object.values(row)
          .join("")
          .toLowerCase()
          .includes(searchCriteria.trim().toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full space-x-3">
        <input
          type="text"
          value={generalFiltro}
          placeholder="Buscar encargado..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            generalFilterEstudiantes(e.target.value)
          }
          className="border w-2/12 p-2 px-3 py-2 rounded-md bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
