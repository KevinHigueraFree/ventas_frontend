"use client"

import { CreateProductAction } from "@/actions/product/create-product-action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import ProductForm from "./ProductForm"
import { Product } from "@/schemas"
import { EditProductAction } from "@/actions/product/edit-product-action"
import ErrorMessage from "../ui/ErrorMessage"

export default function EditProductForm({ product }: { product: Product }) {

    const router = useRouter()
    const editProductWithId = EditProductAction.bind(null, {product})

    const [state, dispatch] = useActionState(editProductWithId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/product')
        }

    }, [state])



    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >

            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            <ProductForm product={product} />

            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Guardar Cambios'
            />
        </form>
    )
}