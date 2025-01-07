"use server"

import { ErrorResponseSchema, LoginSchema, SuccessSchema } from "@/schemas";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
type TypeActionState = {
    errors: string[]
}

export async function authenticate(prevState: any, formData: FormData) {



    const loginCredentials = {
        email: formData.get('email'), // obtenemos el campo email de formData con get('email')
        password: formData.get('password'),
    }


    //!validar
    const auth = LoginSchema.safeParse(loginCredentials)



    if (!auth.success) {
        const errors = auth.error.errors.map(error => error.message)
        return {
            errors//pasar los errores a el form
        }
    }

    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: auth.data.password,
            email: auth.data.email
        })
    })

    const json = await req.json() // es la respuesta de el backend al iniciar sesion con email y password

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)

        return {
            errors: [error]
        }
    }

    (await cookies()).set({
        name: 'ventas_token',// como se usará
        value: json,
        httpOnly: true,// solo next(servidor) podra acceder a este valor
        secure: process.env.NODE_ENV === 'production',
        path: '/',// donde será valido el link
        maxAge: 3600 * 24 * 30 // 30 dias
    })

    redirect('/admin')

}