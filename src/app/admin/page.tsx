import { verifySession } from "@/auth/dal";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
    title: 'Ventas - Panel de Administrador',
    description: 'Administrar las ventas que realizaste'
}

export default async function AdminPage() {

    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className="font-black text-4xl text-purple-950 my-5">Mis ventas</h1>
                    <p className="text-xl font-bold">Maneja y administra tus {''}
                        <span className="text-amber-500">ventas</span>
                    </p>
                </div>
                <Link
                    href={'/admin/sale/new'}
                    className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Crear venta
                </Link>
            </div>
        </>
    )
}
