"use server"

import getToken from "@/auth/token"
import { DraftProductSchema, ErrorResponseSchema, Product, SuccessSchema } from "@/schemas"
import { revalidatePath } from "next/cache"

type TypeActionState = {
    errors: string[],
    success: string
}

//pasamos product para obtener habilitado o deshabilido y el id
export async function EditProductAction({ product }: { product: Product }, prevState: TypeActionState, formData: FormData) {

    console.log(formData.get('enable'))

    const productData = {
        name: formData.get('name'),
        price: Number(formData.get('price')),
        enable: product.enable
    }

    const productFormated = DraftProductSchema.safeParse(productData)

    if (!productFormated.success) {
        return {
            errors: productFormated.error.issues.map(err => err.message),
            success: ''
        }
    }

    const token = await getToken()


    const url = `${process.env.API_URL}/product/${product.id}`


    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: productFormated.data.name,
            price: productFormated.data.price,
            enable: productFormated.data.enable
        })
    })

    const json = await req.json()

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }

    //limpiar el cache de  una pagina para que  cuando ingrese ahi se recargue nuevamente con los datos correctos
    revalidatePath('/admin/product')

    // limpia solo el cache de la peticion que tiene esta etiqueta  (all-products)
    //revalidateTag('/admin/all-products')


    
    const success = SuccessSchema.parse(json)


    return {
        errors: [],
        success
    }
}
