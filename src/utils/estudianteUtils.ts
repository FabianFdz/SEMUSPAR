import * as XLSX from "xlsx";
import { convertDateStandard } from "./personaUtils";
import { EstudianteFullData, FileRow } from "@/global.types";
import { Estudiante, Encargado, Facturacion } from "@prisma/client";

/**
 * Parses CSV data of estudiantes and returns an array of EstudianteFullData objects
 *
 * @param {FileRow[]} csvData The CSV data to parse
 * @returns {EstudianteFullData[]} An array of EstudianteFullData objects parsed from the CSV data
 */
export function parseEstudiantesData(
  rows: FileRow[]
): Array<EstudianteFullData> {
  const estudiantes: Array<EstudianteFullData> = [];
  for (let row of rows) {
    const [diaMatricula, mesMatricula, anioMatricula] = row[
      "3.1 Fecha de Matrícula"
    ]
      ?.trim()
      .split("/");
    const newEstudiante: Omit<
      Estudiante,
      "id" | "created_at" | "updated_at" | "facturacion_id"
    > = {
      adecuacion: row["1.9 ¿Posee Adecuación Curricular?"]
        ?.toLowerCase()
        ?.trim()
        .includes("no"),
      cedula: row[
        "1.1 Cédula de la persona estudiante (Nacionales) o Número DIMEX (Extranjeros)"
      ]
        ?.trim()
        .split(".")[0],
      consideraciones_medicas:
        row[
          "1.11 ¿Posee alguna enfermedad, factor de riesgo o toma algún medicamento?"
        ]?.trim(),
      direccion: row["1.13 Dirección exacta del domicilio actual"]?.trim(),
      docente: row[
        "2.2 Para estudiantes mayores de 18 años: Marque la opción del plan que desea matricular:"
      ]
        ?.trim()
        .split(" ")[0],
      email: row["1.4 Correo electrónico"]?.trim(),
      enfermedades:
        row[
          "1.12 Especifique la opción seleccionada de la pregunta anterior"
        ]?.trim(),
      estado: true,
      estado_comentario: "",
      fecha_matricula: new Date(
        parseInt(anioMatricula),
        parseInt(mesMatricula) - 1,
        parseInt(diaMatricula)
      ),
      fecha_nacimiento: convertDateStandard(
        row["1.5 Fecha de Nacimiento"]?.trim()
      ),
      fecha_retiro: null,
      grado_academico: row["1.7 Grado Académico en el 2023"]?.trim(),
      institucion_academica:
        row["1.8 Institución académica de la persona estudiante"]?.trim(),
      instrumento: row["2.1 Instrumento o Curso"]?.trim(),
      nombre_completo:
        row["1.2 Apellidos y Nombre de la persona estudiante"]?.trim(),
      telefono: row["1.3 Teléfono de la persona estudiante"]?.trim(),
      tipo_adecuacion:
        row["1.10 Indique el tipo de Adecuación Curricular"]?.trim(),
      lugar_trabajo: "",
      trabaja: false,
    };

    const encargados = [];

    const encargadoPadre: Omit<
      Encargado,
      "id" | "created_at" | "updated_at" | "estudiante_id"
    > = {
      email: row["4.3 Correo electrónico del Padre o Encargado"]?.trim(),
      lugar_trabajo: row["4.5 Lugar de trabajo del Padre o Encargado"]?.trim(),
      nombre_completo: row["4.1 Nombre completo del Padre o Encargado"]?.trim(),
      ocupacion: row["4.4 Ocupación del Padre o Encargado"]?.trim(),
      parentezco: "PADRE",
      telefono: row["4.2 Teléfono del Padre o Encargado"]?.trim(),
    };

    if (encargadoPadre.nombre_completo.trim() !== "") {
      encargados.push(encargadoPadre);
    }

    const encargadoMadre: Omit<
      Encargado,
      "id" | "created_at" | "updated_at" | "estudiante_id"
    > = {
      email: row["4.8 Correo electrónico de la Madre o Encargada"]?.trim(),
      lugar_trabajo:
        row["4.10 Lugar de trabajo de la Madre o Encargada"]?.trim(),
      nombre_completo:
        row["4.6 Nombre completo de la Madre o Encargada"]?.trim(),
      ocupacion: row["4.9 Ocupación de la Madre o Encargada"]?.trim(),
      parentezco: "MADRE",
      telefono: row["4.7 Teléfono de la Madre o Encargada"]?.trim(),
    };

    if (encargadoMadre.nombre_completo.trim() !== "") {
      encargados.push(encargadoMadre);
    }

    const facturacion: Omit<Facturacion, "id" | "created_at" | "updated_at"> = {
      cedula: row["5.2 Número de Identificación"]?.trim(),
      email: row["5.3 Correo electrónico"]?.trim(),
      nombre_completo:
        row[
          "5.1 Apellidos y Nombre de la persona a la que se le enviará el comprobante electrónico de pago de mensualidades."
        ],
      pago: "Regular",
    };

    estudiantes.push({
      estudiante: { ...newEstudiante },
      facturacion: { ...facturacion },
      encargados,
    });
  }

  return estudiantes;
}

/**
 * Extracts the sheet ID from a Google Sheets URL.
 * @param {string} url - The Google Sheets URL.
 * @returns {string | null} - The extracted sheet ID, or null if not found.
 */
export function getSheetIdFromUrl(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

/**
 * Exports a JSON object to an Excel file.
 * @param {object} data - The JSON object to export.
 * @param {string} filePath - The path where the Excel file should be saved.
 * @returns A promise that resolves with the file path if the export is successful.
 */
export function exportToJsonToExcel(data: object[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");
  XLSX.writeFile(workbook, "EstudiantesExport.xlsx");
}

/**
 * Compares two dates and determines if there are less than "n" months between them.
 * @param date1 The first date.
 * @param date2 The second date.
 * @param n The number of months.
 * @returns True if there are less than "n" months between the dates, false otherwise.
 */
function hasLessThanNMonthsBetween(
  date1: Date,
  date2: Date,
  n: number
): boolean {
  const diffYears = date2.getFullYear() - date1.getFullYear();
  const diffMonths = date2.getMonth() - date1.getMonth();
  const totalMonths = diffYears * 12 + diffMonths;

  return totalMonths < n;
}

/**
 * Compares two dates and determines if it's in the same enroll period.
 * @param date1 The first date.
 * @param date2 The second date.
 * @returns True if it's in the same period of matricula, false otherwise.
 */
export function isInThisPeriod(date1: Date, date2: Date): boolean {
  return hasLessThanNMonthsBetween(date1, date2, 3); // 3 because the period of enroll is every 3 months
}
