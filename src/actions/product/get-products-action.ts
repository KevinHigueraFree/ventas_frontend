"use server"
import getToken from "@/auth/token";
import { ProductsAPIResponseSchema } from "@/schemas";

export async function GetProductsAction() {

    const token = await getToken();
    const url = `${process.env.API_URL}/product`
  
    const req = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        next:
        {
            tags:['all-products']
        }
    })

    const json = await req.json();

    const products = ProductsAPIResponseSchema.parse(json.data)
   
    return {
        products
    }
}