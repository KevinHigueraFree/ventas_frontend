//DATA ACCESS LAYER
// revisar si un usuario tiene acceso, esta confirmado y su cuenta esta registrada

import "server-only"
import { cache } from 'react'
import { UserSchema } from "@/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {

    const token = (await cookies()).get('ventas_token')?.value;
    if (!token) {
        redirect('/auth/login')
    }

    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const session = await req.json()
    const result = UserSchema.safeParse(session)// para validar que los datos de session estan correctos

    if (!result.success) {
        redirect('/auth/login')
    }

    return {
        user: result.data,
        isAuth: true
    }
})


