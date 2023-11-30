import * as z from "zod"
// Conditions for the form
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Nom trop court." }),
  username: z
    .string()
    .min(2, { message: "Le pseudo doit faire au moins 2 caractères." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir 8 caractères minimum." }),
})
