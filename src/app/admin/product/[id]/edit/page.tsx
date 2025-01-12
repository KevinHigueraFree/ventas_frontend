import { Metadata } from 'next'
import Link from 'next/link'
import React  from 'react'
import EditProductForm from '@/components/product/EditProductForm'
import { GetProductAction } from '@/api/productsAPI'

//es una funcion de next asi que se llamam automaticamente
// le decimos que retornara un :Promise<Metadata> para tener buen autocompletado
export async function generateMetadata({ params }: { params: { id: string } }):Promise<Metadata>{
    const {product}=await GetProductAction(params.id)
    return{
        title: `Ventas - ${product.name}`,
        description: `Ventas - ${product.name} `
    }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
    // Espera a que la Promise se resuelva
    const paramsResolved = await params
    // Accede a la propiedad 'id'
    const id = paramsResolved.id

    const {product} = await GetProductAction(id)
console.log(product)

    return (
        <>
            <>
                <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                    <div className='w-full md:w-auto'>
                        <h1 className='font-black text-4xl text-purple-950 my-5'>
                            Editar Producto:
                        </h1>
                        <p className="text-xl font-bold">Llena el formulario y para editar el {''}
                            <span className="text-amber-500">producto</span>
                        </p>
                    </div>
                    <Link
                        href={'/admin/product'}
                        className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                    >
                        Volver
                    </Link>
                </div>
                <div className='p-10 mt-10  shadow-lg border '>
                    <EditProductForm
                        product={product}
                    />
                </div>
            </>
        </>
    )
}
