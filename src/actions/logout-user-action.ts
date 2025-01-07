"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout(){
    console.log((await cookies()).get('ventas_token'));
   (await cookies()).delete('ventas_token')
   console.log((await cookies()).get('ventas_token'));
   redirect('/auth/login')
}