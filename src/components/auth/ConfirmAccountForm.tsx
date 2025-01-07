"use client"
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { confirmAccountAction } from '@/actions/confirm-account-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import ErrorMessage from '../ui/ErrorMessage'
import SuccessMessage from '../ui/SuccessMessage'
export default function ConfirmAccountForm() {


    const router = useRouter()
    const [isComplete, setIsComplete] = useState(false)
    const [token, setToken] = useState("")


    // bind  espera a que se ejecute la funcion y crea una nueva funcion 
    const confirmAccountWithToken = confirmAccountAction.bind(null, token)

    const [state, dispatch] = useActionState(confirmAccountWithToken, {
        errors: [],
        success: ''
    })


    useEffect(() => {
        if (isComplete) {
            dispatch()
        }
    }, [isComplete])

    useEffect(() => {

        if (state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if (state.success) {
            toast.success(state.success, {
                onClose: () => {
                    router.push('/auth/login')
                }
            })
        }
    }, [state])


    const handleChange = (token: string) => {
        setIsComplete(false)
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }
    return (
        <>
            <div className='flex  justify-center gap-5 my-10'>
                <PinInput
                    value={token}
                    onChange={handleChange} // cada ves que se hace un cambio
                    onComplete={handleComplete} // caundo se llenan todos los campos
                >
                    <PinInputField className='h-10 w-10 border border-gray-600 shadow-md rounded-lg text-center text-black placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-600 shadow-md rounded-lg text-center text-black placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-600 shadow-md rounded-lg text-center text-black placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-600 shadow-md rounded-lg text-center text-black placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-600 shadow-md rounded-lg text-center text-black placeholder-white' />
                    <PinInputField className='h-10 w-10 border border-gray-600 shadow-md rounded-lg text-center text-black placeholder-white' />
                </PinInput>

            </div>
        </>
    )
}