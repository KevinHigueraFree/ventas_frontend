"use server"

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/schemas";

type TypeActionState = {
    errors: string[],
    success: string
}


export async function confirmAccountAction(token: string, prevState: TypeActionState) {

    const confirmToken = TokenSchema.safeParse(token)

    if (!confirmToken.success) {
        return {
            errors: confirmToken.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    //! confirm usuario
    const url = `${process.env.API_URL}/auth/confirm-account`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: confirmToken.data
        }),// to become to JSON 
    })

    const json = await req.json()

    if(!req.ok){
        const {error}=ErrorResponseSchema.parse(json) // transformamos el error de la variable json 
        return{
            errors:[error],
            success:''
        }
    }

    const success=SuccessSchema.parse(json)
    return {
        errors: [],
        success
    }
}


