import Link from "next/link";
import { LoginButton, LogoutButton } from "./AuthButtons";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Menu() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex flex-row justify-start border-b mb-8 space-x-8 py-4 bg-gray-50">
      <Link
        className="text-2xl font-bold text-center ml-4 flex flex-row"
        href="/"
      >
        <Image
          alt="Logo"
          width={45}
          height={45}
          className="rounded-full mr-2"
          src={"/semuspar.svg"}
        />
        SEMUSPAR
      </Link>
      <div className="flex flex-row justify-between items-center space-x-6 text-gray-500">
        <Link
          href="/estudiantes"
          className="rounded hover:text-gray-900 transition-all ease-in-out duration-200 font-medium"
        >
          Estudiantes
        </Link>
        <Link
          href="/encargados"
          className="rounded hover:text-gray-900 transition-all ease-in-out duration-200 font-medium"
        >
          Encargados
        </Link>
      </div>
      <div className="flex flex-row space-x-5 absolute top-4 right-4">
        {!session && <LoginButton />}
        {session && (
          <>
            <div className="flex items-center space-x-3">
              <Image
                src={session.user?.image ?? ""}
                alt="Profile picture"
                className="rounded-full"
                width={35}
                height={35}
              />
              <div className="flex flex-col text-left mr-4">
                <strong>{session.user?.name} </strong>
                <span className="text-gray-400 mt-[-0.25rem]">
                  {session.user?.email}
                </span>
              </div>
              <LogoutButton />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
