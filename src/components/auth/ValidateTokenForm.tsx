import { validateTokenAction } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useActionState, useEffect, useState } from "react";

import { toast } from "react-toastify";


type TypeValidateTokenFormProps = {
    setIsValidToken: Dispatch<SetStateAction<boolean>>
    token: string
    setToken: Dispatch<SetStateAction<string>>
}
export default function ValidateTokenForm({setIsValidToken,token,setToken}: TypeValidateTokenFormProps) {

    const [isComplete, setIsComplete] = useState(false)

    // bind  espera a que se ejecute la funcion y crea una nueva funcion
    //bind toma una copia de validateTokenAction y se le peuden pasar parametros una vez que esté lista
    //token se comvierte en el primer parametro

    const validateTokenInput = validateTokenAction.bind(null, token)

    const [state, dispatch] = useActionState(validateTokenInput, {
        errors: [],
        success: ''
    })

        //como el use efect siempre se ejecuta, pues ejecutaremos el codigo dispatch solo cuando isComplete sea verdadero
      
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
            toast.success(state.success)
            setIsValidToken(true)

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
        <div className="flex justify-center gap-5 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white text-black" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white text-black" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white text-black" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white text-black" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white text-black" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white text-black" />
            </PinInput>
        </div>
    )
}