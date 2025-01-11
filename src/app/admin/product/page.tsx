import GetProducts from "@/components/product/GetProducts";
import GetSales from "@/components/sale/GetSales";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { useActionState, useState } from "react";
export const metadata: Metadata = {
    title: 'Productos - Productos que existen',
    description: 'Administrar los productos que existen'
}




export default async function ShowProductsPage() {


    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className="font-black text-4xl text-purple-950 my-5">Mis Productos</h1>
                    <p className="text-xl font-bold">Maneja y administra tus {''}
                        <span className="text-amber-500">productos</span>
                    </p>
                </div>
                <Link
                    href={'/admin/product/new'}
                    className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Crear Producto
                </Link>
            </div>

            <div className='p-10 mt-10  shadow-lg border '>
              {   <GetProducts /> }
            </div>
        </>
    )
}