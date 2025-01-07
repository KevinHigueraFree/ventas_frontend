
import { resetPasswordAction } from "@/actions/reset-password-action"
import { Metadata } from "next"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"



export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  //generamos una copia de resetPasswordAction y con el nuevo parametro token
  const resetPasswordWithtoken = resetPasswordAction.bind(null, token)

  const [state, dispatch] = useActionState(resetPasswordWithtoken, {
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
      toast.success(state.success, {
        onClose: () => {
          router.push('/auth/login')// para cambiar de url
        }
      })
    }
  }, [state])


  return (
    <form
      className=" mt-14 space-y-5"
      noValidate
      action={dispatch}
    >
      <div className="flex flex-col gap-5">
        <label
          className="font-bold text-2xl"
        >Password</label>

        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg text-black"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-5">
        <label
          className="font-bold text-2xl"
        >Repetir Password</label>

        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg text-black"
          name="password_confirmation"
        />

      </div>

      <input
        type="submit"
        value='Guardar Password'
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  )
}