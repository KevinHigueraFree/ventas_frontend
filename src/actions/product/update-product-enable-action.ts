"use server"

import getToken from "@/auth/token";
import SuccessMessage from "@/components/ui/SuccessMessage";
import { ProductAPIResponseSchema, ProductsAPIResponseSchema, SuccessSchema } from "@/schemas";
import { cookies } from "next/headers";


export async function UpdateProductEnableAction(productId:number) {
    const token = await getToken();
    const url = `${process.env.API_URL}/product/${productId}`

    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })

    const json = await req.json();
    console.log('DATOS KEVIN',json)
    const success = SuccessSchema.parse(json)

    return {
        success
    }
}