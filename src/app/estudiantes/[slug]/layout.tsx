import Link from "next/link";

export default function EstudiantesLayout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <main className="flex flex-col w-2/3 mx-auto px-20">
      <div className="flex flex-row mb-3 space-x-3">
        <h2 className="text-xl font-bold">
          Estudiante <span className="text-blue-600">#{slug}</span>
        </h2>
      </div>
      {children}
    </main>
  );
}
