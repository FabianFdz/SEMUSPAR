import EstudianteFacturacionForm from "@/components/estudiante/form/EstudianteFacturacionForm";
import { prismaClient } from "@/services/prismaClient";
import Link from "next/link";

const fetchEstudiante = async (cedula: string) => {
  const estudiante = await prismaClient.estudiante.findFirst({
    where: {
      cedula,
    },
    select: {
      id: true,
      facturacion: true,
    },
  });

  if (!estudiante) {
    throw new Error();
  }

  return estudiante;
};

interface Props {
  params: { slug: string };
}

export default async function EncargadosPage({ params: { slug } }: Props) {
  const estudiante = await fetchEstudiante(slug);

  return (
    <>
      <nav className="flex flex-row items-center justify-start space-x-6 border-b mb-8">
        <Link href={`/estudiantes/${slug}`}>Inicio</Link>
        <Link href={`/estudiantes/${slug}/encargados`}>Encargados</Link>
        <Link
          className="font-bold text-blue-900 border-b-2 border-blue-900"
          href={`/estudiantes/${slug}/facturacion`}
        >
          Facturación
        </Link>
      </nav>
      <EstudianteFacturacionForm estudiante={estudiante} />
    </>
  );
}
