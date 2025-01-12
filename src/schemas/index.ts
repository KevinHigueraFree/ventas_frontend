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
}).refine((data) => data.password === data.password_confirmation, {
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

export const ForgotPasswordSchema = z.object({
    email: z.string()
        .min(1, { message: 'El email es obligatorio' })
        .email({ message: 'El email es inválido' }),
})

export const ResetPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: 'El Password debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),

})



// se crea el type User a apartir de el contenido de UserSchema
export type User = z.infer<typeof UserSchema>


//! Productos
//validar formulario
export const DraftProductSchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre es obligatorio' }),
    price: z.coerce // Aceptar el precio como cadena
        .number({ message: 'Precio inválido' })
        .min(1, { message: 'Precio inválido' }),
    enable: z.boolean(),
})

export const ProductAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    enable: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const ProductsAPIResponseSchema = z.array(ProductAPIResponseSchema)// para usar una validacion como arreglo

export type Product = z.infer<typeof ProductAPIResponseSchema>

//! sales
export const CreateSaleSchema = z.object({
    date: z
        .string({
            required_error: "El campo fecha es requerido", // Mensaje si falta el campo
            invalid_type_error: "El campo fecha debe ser una cadena", // Mensaje si no es una cadena
        })
        .min(1, { message: "La fecha no puede estar vacía" }) // Validar que no sea una cadena vacía
        .refine(
            (value) => {
                // Intentar convertir la cadena a fecha
                const date = new Date(value);
                return !isNaN(date.getTime()); // Verificar que la fecha sea válida
            },
            {
                message: "Debe ser una fecha válida", // Mensaje si la fecha es inválida
            }
        )

        .transform((value) => {
            // Convertir la cadena a Date
            const date = new Date(value);
            // Formatear la fecha a YYYY-MM-DD
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`; // Retornar la fecha formateada
        })

        .refine((date) => {
            const parsedDate = new Date(date)
            // Obtener la fecha actual sin horas, minutos, segundos ni milisegundos
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            today.setDate(today.getDate() - 2);
            // Comparar la fecha proporcionada con la fecha actual
            return parsedDate >= today;
        }, {
            message: "La fecha debe ser igual o mayor a la fecha actual", // Mensaje de error personalizado
        }),
});

export const SaleAPIResponseSchema = z.object({
    id: z.number(),
    date: z.string(),
    userId: z.number(),
})
export const SalesAPIResponseSchema = z.array(SaleAPIResponseSchema)// para usar una validacion como arreglo

//! los de respuesta
export const SuccessSchema = z.string().min(1, { message: 'Valor inválido' })
export const ErrorResponseSchema = z.object({
    error: z.string()
})

