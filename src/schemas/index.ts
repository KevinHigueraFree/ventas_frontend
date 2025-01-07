import { z } from 'zod'

export const RegisterSchema = z.object({
    email: z.string()
        .min(1, { message: 'El email es obligatorio' })
        .email({ message: 'El email es inválido' }),

    name: z.string()
        .min(1, { message: 'El nombre es obligatorio' }),
    password: z.string()
        .min(8, { message: 'La contraseña debe tener almenos 8 caracteres' }),

    password_confirmation: z.string()
})




    .refine((data) => data.password === data.password_confirmation, {
        message: 'Las contraseñas no son iguales',
        path: ['password_confirmation'] // aquí señalamos la ruta a la que se lo agregamos
    })

export const TokenSchema = z.string({ message: 'Token inválido' })
    .length(6, { message: 'Token inválido' })


export const LoginSchema = z.object({
    email: z.string()
        .min(1, { message: 'El email es obligatorio' })
        .email({ message: 'El email es inválido' }),

    password: z.string()
        .min(8, { message: 'La contraseña debe tener almenos 8 caracteres' }),
})

export const ForgotPasswordSchema=z.object({
    email: z.string()
    .min(1, { message: 'El email es obligatorio' })
    .email({ message: 'El email es inválido' }),
})

export const ResetPasswordSchema = z.object({
    password: z.string()
            .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

//! los de respuesta
export const SuccessSchema = z.string().min(1, { message: 'Valor inválido' })
export const ErrorResponseSchema = z.object({
    error: z.string()
})

export const UserSchema=z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
  
})


// se crea el type User a apartir de el contenido de UserSchema
export type User=z.infer<typeof UserSchema>