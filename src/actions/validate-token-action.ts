"use server"

import ToastNotification from "@/components/ui/ToastNotification";
import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/schemas";

type TypeActionState = {
    errors: string[],
    success: string
}


export async function validateTokenAction(token: string, prevState: TypeActionState) {

    const resetPasswordToken = TokenSchema.safeParse(token)
    console.log('desde la accion de validar token');
    console.log(token);

    if (!resetPasswordToken.success) {
        return {
            errors: resetPasswordToken.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/auth/validate-token`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: resetPasswordToken.data
        }),// to become to JSON
    })


    const json = await req.json()
    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json) // transformamos el error de la variable json 
        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)
    return {
        errors: [],
        success
    }
}


