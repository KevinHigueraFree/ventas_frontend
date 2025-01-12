import { Product } from '@/schemas'
import React from 'react'

export default function ProductForm({ product }: { product?: Product }) { // Al ser usado en edit y create, pondremos que product es optional con "?"
    return (
        <>

            <div className="space-y-3">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre
                </label>
                <input
                    id="name"
                    className="w-full p-3  border border-gray-100 bg-slate-100 text-black"
                    type="text"
                    placeholder="Nombre de el producto"
                    name="name"
                    defaultValue={product?.name} // si product existe, usar su nombre, sino usar vacio
                />
            </div>
            <div className="space-y-3">
                <label htmlFor="price" className="text-sm uppercase font-bold">
                    Precio
                </label>
                <input
                    id="price"
                    className="w-full p-3  border border-gray-100 bg-slate-100 text-black"
                    type="number"
                    placeholder="Precio de el producto"
                    name="price"
                    defaultValue={product?.price} // si product existe, usar su precio, sino usar vacio
                />
            </div>
        </>
    )
}
