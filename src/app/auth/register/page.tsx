import RegisterForm from "@/components/auth/RegisterForm"
import type { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
    title: "Ventas | Crear cuenta",
    description: "Crea una cuenta gratuita para realizar tus ventas en nuestra tienda virtual",
}

export default function page() {
    

    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Crea tu cuenta</h1>
            <p className="text-3xl font-bold">y realiza <span className='text-amber-500'>tus ventas</span>
            </p>
            <RegisterForm />

            <nav className="flex flex-col items-center gap-6  md:flex-row md:justify-between mt-10">
                <Link
                    href="/auth/login"
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </Link>
                <Link
                    href="/auth/forgot-password"
                >
                    ¿Olvidaste tu contraseña? Recupera tu cuenta
                </Link>
            </nav>

        </>

    )
}
