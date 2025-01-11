"use server"

import getToken from "@/auth/token";
import { CreateProductSchema, ErrorResponseSchema, SuccessSchema } from "@/schemas";

type TypeActionState = {
    errors: string[]
}


export async function CreateProductAction(prevState: TypeActionState, formData: FormData) {

    console.log(formData.get('price'))

    const product = CreateProductSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price')
        
    })



    if (!product.success) {
        return {
            errors: product.error.issues.map(issue => issue.message),
            success: '',
        }
    }

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

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error]
        }
    }


    const success = SuccessSchema.parse(json.message)

    return {
        errors: [],
        success
    }
}