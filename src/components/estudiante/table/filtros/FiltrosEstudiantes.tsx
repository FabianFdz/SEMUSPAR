import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ExportarData from "../ExportarData";
import { useRouter } from "next/navigation";
import { Estudiante } from "@prisma/client";
import FiltrosAvanzados from "./FiltrosAvanzados";
import { EstudiantesInfoTable } from "../EstudiantesList";

interface Props {
  data: Array<Estudiante>;
  searchParams: Partial<Estudiante>;
  filteredEstudiantes: Array<Estudiante>;
  setFilteredEstudiantes: Dispatch<SetStateAction<Estudiante[]>>;
}

export default function FiltrosEstudiantes({
  data,
  searchParams,
  filteredEstudiantes,
  setFilteredEstudiantes,
}: Props) {
  const router = useRouter();
  const [openFiltrosAvanzados, setOpenFiltrosAvanzados] = useState(false);
  const [generalFiltro, setGeneralFiltro] = useState<string>("");
  const [filtrosAvanzados, setFiltrosAvanzados] = useState<
    Partial<EstudiantesInfoTable>
  >({});

  const generalFilterEstudiantes = (searchCriteria: string) => {
    setGeneralFiltro(searchCriteria);
    setFilteredEstudiantes(
      data.filter((row) =>
        Object.values(row)
          .join("")
          .toLowerCase()
          .includes(searchCriteria.trim().toLowerCase())
      )
    );
  };

  useEffect(() => {
    router.push(
      "/estudiantes?" +
        Object.keys(filtrosAvanzados)
          .map(
            (filtro) =>
              `${filtro}=${encodeURIComponent(
                filtrosAvanzados[filtro as keyof EstudiantesInfoTable] ?? ""
              )}`
          )
          .join("&")
    );
  }, [filtrosAvanzados, router]);

  useEffect(() => {
    if (!openFiltrosAvanzados) {
      setFilteredEstudiantes(data);
    } else {
      generalFilterEstudiantes("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openFiltrosAvanzados]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full space-x-3">
        <input
          type="text"
          value={generalFiltro}
          disabled={openFiltrosAvanzados}
          placeholder="Buscar estudiante..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            generalFilterEstudiantes(e.target.value)
          }
          className="border w-2/12 p-2 px-3 py-2 rounded-md bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
        />
        <button
          className="px-3 bg-transparent underline text-blue-600 rounded-lg hover:no-underline active:underline w-fit"
          onClick={() => setOpenFiltrosAvanzados(!openFiltrosAvanzados)}
        >
          Filtros avanzados...
        </button>
        <ExportarData data={filteredEstudiantes} />
      </div>
      <div className="flex flex-col w-full space-y-2 mt-3">
        {openFiltrosAvanzados && (
          <FiltrosAvanzados
            data={data}
            setFilteredEstudiantes={setFilteredEstudiantes}
          />
        )}
      </div>
    </div>
  );
}
