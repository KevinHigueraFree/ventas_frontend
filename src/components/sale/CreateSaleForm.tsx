"use client"

import { CreateSaleAction } from "@/actions/create-sale-action"
import { useActionState, useEffect, useState } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"
import { User } from "@/schemas"
import { useRouter } from "next/navigation"



export default function CreateSaleForm() {

  const router = useRouter()

  const [state, dispatch] = useActionState(CreateSaleAction, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
    if (state.success) {
      toast.success(state.success,
        {
          onClose: () => {
            router.push('/admin')
          },
          onClick: () => {
            router.push('/admin')
          }
        }
      )
    }
  }, [state])




  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >

      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Fecha
        </label>
        <input
          id="date"
          className="w-full p-3  border border-gray-100 bg-slate-100 text-black"
          type="date"
          placeholder="Fecha de la venta"
          name="date"
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