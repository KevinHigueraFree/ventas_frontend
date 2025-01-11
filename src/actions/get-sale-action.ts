import getToken from "@/auth/token";
import { SaleAPIResponseSchema, SalesAPIResponseSchema } from "@/schemas";
import { cookies } from "next/headers";

export async function GetUserSalesAction() {
    const token = await getToken();
    const url = `${process.env.API_URL}/sale`
    console.log(url)

    const req = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })

    const json = await req.json();
    console.log(json.data)
    const sales=SalesAPIResponseSchema.parse(json.data)
    console.log(sales)
return{
    sales
}
}