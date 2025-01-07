import Image from "next/image"

export default function Logo() {
    return (
        <>
            {/*   <img src="../../../public/logo.svg" alt="kevin higuera" width={400} height={100} /> */}
            <Image src="/frontend/src/public/logo.svg" alt="Logo de ventas" width={0} height={0} className="w-full" priority />
        </>
    )
}
