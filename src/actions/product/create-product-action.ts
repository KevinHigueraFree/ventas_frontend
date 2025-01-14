"use server"

import getToken from "@/auth/token";
import { DraftProductSchema, ErrorResponseSchema, SuccessSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

type TypeActionState = {
    errors: string[]
}


export async function CreateProductAction(prevState: TypeActionState, formData: FormData) {

    const product = DraftProductSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        enable: formData.get('enable') == 'true',
    })
    console.log(product)

    if (!product.success) {
        return {
            errors: product.error.issues.map(issue => issue.message),
            success: '',
        }
    }

    console.log(product)

    const token = await getToken();
    const url = `${process.env.API_URL}/product`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: product.data.name,
            price: product.data.price
        })
    })

    const json = await req.json() // es la respuesta de el backend al iniciar sesion con email y password
    console.log(json)
    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error]
        }
    }

    revalidatePath('/admin/product')
    const success = SuccessSchema.parse(json.message)

    return {
        errors: [],
        success
    }
}