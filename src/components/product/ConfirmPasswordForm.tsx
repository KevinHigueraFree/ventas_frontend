import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DialogTitle } from "@headlessui/react"
import DeleteProductAction from "@/actions/product/delete-product-action"
import { useActionState, useEffect } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"
import { SuccessSchema } from "@/schemas"

export default function ConfirmPasswordForm() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    // con + los convertimos en numero
    const productId = +searchParams.get('deleteProductId')!// con ! le decimos que confie, que este valor existirá

    const deleteProductWithPassword = DeleteProductAction.bind(null, productId)
    const [state, dispatch] = useActionState(deleteProductWithPassword, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            closeModal()
            //router.replace('/')
        }
    }, [state])

    const closeModal = () => {
        const hideModal = new URLSearchParams(searchParams.toString())
        hideModal.delete('deleteProductId')
        router.replace(`${pathname}?${hideModal}`)
    }



    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Eliminar Producto
            </DialogTitle>
            <p className="text-xl font-bold">Ingresa tu Password para {''}
                <span className="text-amber-500">eliminar el producto {''}</span>
            </p>
            <p className='text-gray-600 text-sm'>(Un producto eliminado y sus gastos no se pueden recuperar)</p>

            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}

            <form
                className=" mt-14 space-y-5"
                noValidate
                action={dispatch}
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="password"
                    >
                        Ingresa tu Password para eliminar
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name='password'
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <input
                        type="submit"
                        value='Eliminar Producto'
                        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
                    />
                    <button
                        className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
                        onClick={()=>{closeModal()}}
                    >Cancelar</button>
                </div>
            </form>

        </>
    )
}