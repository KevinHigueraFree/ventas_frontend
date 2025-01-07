"use server"

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/schemas";

type TypeActionState = {
    errors: string[],
    success: string
}
export async function register(prevState: TypeActionState, formData: FormData) {

    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    }

    //!validar
    const register = RegisterSchema.safeParse(registerData)



    if (!register.success) {
        const errors = register.error.errors.map(error => error.message)
        return {
            errors,//pasar los errores a el form
            success: ''  // o ''  prevState: pone el valor previo de el state , osea ''
        }
    }
    //! registra usuario
    const url = `${process.env.API_URL}/auth/create-account`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: register.data.name,
            password: register.data.password,
            email: register.data.email

        }),// to become to JSON 
    })

    const json = await req.json()

    if (req.status === 409) {
        const error = ErrorResponseSchema.parse(json)
        return {
            success: '',
            errors: [error.error]
        }
    }

    const success = SuccessSchema.parse(json)

    return {
        success: success,
        errors: []
    }
}

