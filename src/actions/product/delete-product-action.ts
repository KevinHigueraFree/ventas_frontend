"use server"

import getToken from '@/auth/token'
import { ErrorResponseSchema, PasswordValidationSchema, Product, SuccessSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'

type TypeActionState = {
    errors: string[],
}
export default async function DeleteProductAction(productId: Product['id'], prevState: TypeActionState, formData: FormData) {

    //SAFEPARSE ES PARA RETORNAR VALOR
    const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'))
    console.log(currentPassword)

    if (!currentPassword.success) {
        return {
            errors: currentPassword.error.issues.map(issue => issue.message),
            success: ''
        }

    }

    //! comprobar password
    const token = await getToken()
    console.log(token)

    const checkPasswordURL = `${process.env.API_URL}/auth/check-password`
    console.log(checkPasswordURL)
    const checkPasswordReq = await fetch(checkPasswordURL, {
        //mode: 'no-cors',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: currentPassword.data
        })
    })

    const checkPasswordJson = await checkPasswordReq.json()
    console.log('kevin password', checkPasswordJson)
    console.log(checkPasswordReq)

    if (!checkPasswordReq.ok) {
        const { error } = ErrorResponseSchema.parse(checkPasswordJson)
        return {
            errors: [error],
            success: ''
        }
    }

    const deleteProductURL = `${process.env.API_URL}/product/${productId}`
    console.log(deleteProductURL)
    const deleteProductReq = await fetch(deleteProductURL, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

    const deleteProductJson = await deleteProductReq.json()

    console.log('kevin delete', deleteProductJson)

    if (!deleteProductReq.ok) {
        const { error } = ErrorResponseSchema.parse(deleteProductJson)
        return {
            errors: [error],
            success: ''
        }
    }

    //para actualizar cambios
    revalidatePath('/admin/product')
    const success = SuccessSchema.parse(deleteProductJson)

    return {
        errors: [],
        success
    }

}
