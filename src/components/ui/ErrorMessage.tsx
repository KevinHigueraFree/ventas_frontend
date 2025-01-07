import { ReactNode } from "react";

export default function ErrorMessage({ children }: { children: ReactNode }) {
    return (
        <>
            <p className="my-2 p-2 bg-red-600 text-center  text-gray-300 font-black uppercase text-sm">{children}</p>
        </>
    )
}