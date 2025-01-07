import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata:Metadata={
    title: "Ventas | Recuperar contraseña",
    description: "Sigue las instrucciones para recuperar tu cuenta",   
}

export default function page() {

    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">sigue  las instrucciones<span className='text-amber-500'>y recupera tu cuenta</span>
            </p>
            <ForgotPasswordForm/>

            <nav className="flex flex-col items-center gap-6  md:flex-row md:justify-between mt-10">
                <Link
                    href="/auth/login"
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </Link>
                <Link
                    href="/auth/register"
                >
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>


        </>

    )
}
