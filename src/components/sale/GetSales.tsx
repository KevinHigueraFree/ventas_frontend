import { GetUserSalesAction } from "@/actions/get-sale-action"
import Link from "next/link";

export default async function GetSales() {
    const { sales } = await GetUserSalesAction();
    console.log(sales)
    return (
        <>
            {
                sales.length ? (
                    <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
                        {sales.map((sale, index) => (
                            <li key={sale.id} className="flex justify-between gap-x-6 p-5 ">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <p className="text-sm font-semibold leading-6 text-white">
                                            <Link href={`/admin/sale/${sale.id}`}>
                                                {index + 1}
                                            </Link>

                                        </p>
                                        <p className="text-xl font-bold text-amber-500">
                                            <Link href={`/admin/sale/${sale.id}`}>
                                                {index + 1}
                                            </Link>

                                        </p>
                                        <p className='text-gray-500  text-sm'>

                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-6">

                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center py-20">No hay ventas

                        <Link href={'/admin/sale/new'}>
                            Generar venta
                        </Link>
                    </p>
                )
            }
            <h1>Listado de ventas</h1>
        </>
    )

}