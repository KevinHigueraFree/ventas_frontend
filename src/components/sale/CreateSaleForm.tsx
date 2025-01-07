"use client"

export default function CreateSaleForm() {


  return (
    <form
      className="mt-10 space-y-3"
      noValidate
    >
      <div className="space-y-3">
          <label htmlFor="name" className="text-sm uppercase font-bold">
              Fecha
          </label>
          <input
              id="sale"
              className="w-full p-3  border border-gray-100 bg-slate-100 text-black"
              type="date"
              placeholder="Fecha de la venta"
              name="sale"
          />
      </div>
     
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Venta'
      />
    </form>
  )
}