import { Table } from "@tanstack/react-table";
import React from "react";
import { StatusChip } from "./StatusChip";

interface PaginationProps {
  table: Table<any>;
}

export default function Pagination({ table }: PaginationProps) {
  return (
    <div className="flex flex-row justify-between">
      <select
        className="px-2 py-3 h-12 mt-4"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, table.getCoreRowModel().rows.length].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Mostrar {pageSize}
          </option>
        ))}
      </select>
      <div className="flex flex-col items-center mt-4 space-y-2">
        <div className="flex flex-row">
          <button
            className="border rounded-tl rounded-bl px-2 py-1 cursor-pointer"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border-y border-r px-2 py-1 cursor-pointer"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border-y border-r px-2 py-1 cursor-pointer"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border-y border-r rounded-tr rounded-bl px-2 py-1 cursor-pointer"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Página</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
      <span className="mt-4">
        Total: <strong>{table.getCoreRowModel().rows.length}</strong> persona
        {table.getCoreRowModel().rows.length === 1 ? "" : "s"}
      </span>
    </div>
  );
}
