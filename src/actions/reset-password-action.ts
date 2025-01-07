"use server"

import { ErrorResponseSchema, ResetPasswordSchema, SuccessSchema } from "@/schemas"

type TypeActionState = {
    errors: string[],
    success: string
}

// token lo esta mandando resetPasswordForm
export async function resetPasswordAction(token: string, prevState: TypeActionState, formData: FormData) {
    console.log(token)

    //obtenemos los valores de el formulario
    const resetPasswordInput = {
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    //safeParse es usado para poder manejar los errores
    const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)

    if (!resetPassword.success) {
        return {
            errors: resetPassword.error.issues.map(error => error.message),
            success: ''
        }

    }


    const url = `${process.env.API_URL}/auth/reset-password/${token}`
    console.log(url)
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: resetPasswordInput.password
        })
    })

    const json = await req.json()

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json) // transformamos el error de la variable json 
        return {
            errors: [error],
            success: ''
        }
    }

    const success =SuccessSchema.parse(json)

    return {
        errors: [],
        success
    }
}