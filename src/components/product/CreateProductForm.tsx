"use client"

import { CreateProductAction } from "@/actions/product/create-product-action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function CreateProductForm() {

    const router = useRouter()

    const [state, dispatch] = useActionState(CreateProductAction, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if (state.success) {
            toast.success(state.success,
                {
                    onClose: () => {
                        router.push('/admin/product')
                    },
                    onClick: () => {
                        router.push('/admin/product')
                    }
                }
            )
        }
    }, [state])

    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >

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
                />
            </div>

            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Crear Producto'
            />
        </form>
    )
}