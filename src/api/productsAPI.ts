"use server"
import { request } from "http";
import { notFound, redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { cache } from 'react'
import getToken from "@/auth/token";
import { ProductAPIResponseSchema } from "@/schemas";


export const GetProductAction = cache(async (productId: string)=> {

    const token = getToken()
    const url = `${process.env.API_URL}/product/${productId}`
    const req = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await req.json();

    if (!req.ok) {
        notFound()
    }

    const product = ProductAPIResponseSchema.parse(json)

    return {
        product
    }
})