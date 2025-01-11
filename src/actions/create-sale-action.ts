"use server"

import getToken from "@/auth/token"
import { CreateSaleSchema, ErrorResponseSchema, SuccessSchema } from "@/schemas"
import { cookies } from "next/headers"

type TypeActionState = {
    errors: string[]
}


export async function CreateSaleAction(prevState: TypeActionState, formData: FormData) {

    const sale = CreateSaleSchema.safeParse({
        date: formData.get('date')
    })

    if (!sale.success) {
        return {
            errors: sale.error.issues.map(issue => issue.message),
            success: '',
        }
    }

    const token = await getToken();
    const url = `${process.env.API_URL}/sale`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            date: sale.data.date,

        })
    })

    const json = await req.json() // es la respuesta de el backend al iniciar sesion con email y password

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error]
        }
    }

    console.log(json.message)
    const success = SuccessSchema.parse(json.message)

    return {
        errors: [],
        success
    }
}