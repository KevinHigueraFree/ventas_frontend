"use client"

import { GetProductsAction } from "@/actions/product/get-products-action";
import { UpdateProductEnableAction } from "@/actions/product/update-product-enable-action";
import { formatCurrency, formatDate } from "@/utils";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
// Definir el tipo de un producto
type Product = {
    id: number;
    name: string;
    price: number;
    enable: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function GetProducts() {
    // Especificar el tipo del estado
    const [products, setProducts] = useState<Product[]>([]);



    useEffect(() => {
        console.log('ejecutandose')
        const fetchProducts = async () => {
            const { products } = await GetProductsAction();
            setProducts(products);
            console.log('se llama get actions')
        };
        fetchProducts();

    }, []);


    // Función para manejar el clic en el botón
    async function handleClick(productId: number) {
        try {
            const success = await UpdateProductEnableAction(productId);
            // Actualizar el estado de los productos después de la actualización
            const { products } = await GetProductsAction();
            setProducts(products);
            if (success) {
                toast.success(success.success)
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }
    return (
        <>
            <h1>Listado de productos</h1>
            {
                products.length ? (
                    <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
                        {products.map((product, index) => (
                            <li key={product.id} className="flex justify-between gap-x-6 p-5 ">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">

                                        <p className="text-sm font-semibold leading-6 text-white">
                                            <Link href={`/admin/product/${product.id}`}>
                                                {product.name}
                                            </Link>

                                        </p>

                                        <p className="text-xl font-bold text-amber-500">
                                            {formatCurrency(product.price)}
                                        </p>

                                        <button
                                            onClick={() => { handleClick(product.id) }}
                                            className={product.enable ? "bg-green-600  rounded-sm px-2 py-1" : "bg-red-600 rounded-sm px-2 py-1"}
                                        >
                                      
                                                {product.enable ? "Disponible" : "No disponible"}
                                            
                                        </button>





                                        <p className='text-gray-500  text-sm'>
                                            Ultima actualización:
                                            <span className="font-bold"> {formatDate(product.updatedAt)}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-6">

                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center py-20">No hay productos

                        <Link href={'/admin/product/new'}>
                            Generar Producto
                        </Link>
                    </p>
                )
            }

        </>
    )
}