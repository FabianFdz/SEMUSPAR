import { Estudiante } from "@prisma/client";
import SingleFilter from "./types/SingleFilter";
import { CustomFilter, estudiantesFilters } from "./FilterList";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { StatusChip } from "@/components/StatusChip";
import { Button } from "@/components/lib";

interface Filter {
  filterInfo: CustomFilter<Estudiante>;
  value: string | boolean;
}

interface Props {
  data: Estudiante[];
  setFilteredEstudiantes: Dispatch<SetStateAction<Estudiante[]>>;
}

export default function FiltrosAvanzados({
  data,
  setFilteredEstudiantes,
}: Props) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [filterValueToAdd, setFilterValueToAdd] = useState<string | null>(null);
  const [selectedOptionToAdd, setSelectedOptionToAdd] = useState<string | null>(
    null
  );

  const applyFilter = () => {
    console.log(filters);

    setFilteredEstudiantes(
      data.filter((row) => {
        const matches = filters.map((f) => {
          if (typeof f.value === "string") {
            return row[f.filterInfo.filterKey]
              ?.toString()
              .toLowerCase()
              .includes(f.value.toLowerCase());
          } else {
            return row[f.filterInfo.filterKey] === f.value;
          }
        });
        return !matches.includes(false);
      })
    );
  };

  const addModifyFilter = (filter: any) => {
    const [key, value] = Object.entries(filter)[0];
    const customFilter = estudiantesFilters.find(
      (value) => value.filterKey === key
    );
    if (customFilter) {
      const existingFilter = filters.find(
        (filter) => filter.filterInfo.filterKey === key
      );
      if (!existingFilter) {
        setFilters([
          ...filters,
          {
            filterInfo: { ...customFilter },
            value: value as string,
          },
        ]);
      } else {
        const filtersCopy = [...filters];
        for (let index = 0; index < filtersCopy.length; index++) {
          if (filtersCopy[index].filterInfo.filterKey === key) {
            filtersCopy[index].value = value as string;
          }
        }
        setFilters([...filtersCopy]);
      }
    }
  };

  const removeFilter = (key: keyof Estudiante) => {
    setFilters([
      ...filters.filter((filter) => filter.filterInfo.filterKey !== key),
    ]);
  };

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptionToAdd(event.target.value);
  };

  const handleLimpiarFiltros = () => {
    setFilters([]);
    setFilteredEstudiantes(data);
  };

  const handleAddFilterClick = () => {
    if (selectedOptionToAdd && filterValueToAdd) {
      setFilterValueToAdd(null);
      setSelectedOptionToAdd(null);
      addModifyFilter({
        [selectedOptionToAdd]: filterValueToAdd,
      });
    }
  };

  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className="bg-gray-100 rounded w-full p-4 mt-2 flex flex-col">
      <div className="flex flex-row items-center space-x-2 text-center mb-3">
        <label className="font-medium">Estado</label>
        {[true, false].map((status) => (
          <div
            key={status ? "true-status" : "false-status"}
            className="cursor-pointer"
            onClick={() =>
              addModifyFilter({
                estado: status,
              })
            }
          >
            {filters.some((f) => f.filterInfo.filterKey === "estado") ? (
              <StatusChip
                active={status}
                disabled={
                  (filters.find((f) => f.filterInfo.filterKey === "estado")
                    ?.value as boolean) !== status
                }
              />
            ) : (
              <StatusChip active={status} />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row space-x-2">
        <select
          value={selectedOptionToAdd ?? ""}
          onChange={handleOptionChange}
          className="w-2/12 py-1 px-2 text-base border border-primary rounded-md appearance-none focus:outline-none focus:ring-primary capitalize"
        >
          <option className="normal-case" value="" disabled>
            Seleccione un filtro...
          </option>
          {estudiantesFilters
            .filter(
              (filter) =>
                !filters.some(
                  (f) => f.filterInfo.filterKey === filter.filterKey
                ) && filter.type === "string"
            )
            .map((filter) => (
              <option
                className="capitalize"
                key={filter.filterKey}
                value={filter.filterKey}
              >
                {filter.displayName}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Valor..."
          value={filterValueToAdd ?? ""}
          onChange={(e) => setFilterValueToAdd(e.target.value)}
          className="py-1 px-2 rounded-md bg-white w-2/12 disabled:bg-gray-300 outline-none"
        />
        <Button
          variant="Secondary"
          disabled={!selectedOptionToAdd || !filterValueToAdd}
          onClick={handleAddFilterClick}
        >
          Agregar filtro
        </Button>
        <button
          className="py-2 px-3 bg-transparent underline text-blue-600 rounded-lg hover:no-underline active:underline"
          onClick={handleLimpiarFiltros}
        >
          Limpiar filtros
        </button>
      </div>
      <div className="flex flex-row flex-wrap mt-3">
        {filters.map((filter) => (
          <SingleFilter
            removeFilter={removeFilter}
            modifyFilter={addModifyFilter}
            customFilter={filter.filterInfo}
            defaultValue={filter.value as string}
            key={`${filter.filterInfo.filterKey}-${filter.value}`}
          />
        ))}
      </div>
    </div>
  );
}
