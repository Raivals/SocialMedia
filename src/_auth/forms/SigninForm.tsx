import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"

import { useSingInAccount } from "@/lib/react-query/queriesAndMutation"
import { useUserContext } from "@/context/AuthContext"

const SigninForm = () => {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate()
  // Fake field for a loader when you submit the form
  // Self made Hook

  const { mutateAsync: signInAccount } = useSingInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // signup the user into a session
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      return toast({ title: "La connection a échoué, Veuillez réésayer." })
    }

    // Store the session in the react context
    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn) {
      form.reset()

      navigate("/")
    } else {
      return toast({ title: "Connexion échoué. Veuillez réésayer." })
    }
  }

  return (
    <Form {...form}>
      <div className="flex-col sm:w-420 flex-center">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="pt-5 h3-bold md:h2-bold sm:pt-12">Se connecter</h2>
        <p className="mt-2 text-light-3 small-medium md:base-regular">
          Bienvenue ! Veuillez entrer vos identifiants ainsi que votre mot de
          passe.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5 mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Allow a loading while submit the form */}
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="gap-2 flex-center">
                {" "}
                <Loader />
                Loading...
              </div>
            ) : (
              "Connexion"
            )}
          </Button>
          <p className="mt-2 text-center text-small-regular text-light-2">
            {" "}
            Vous n'avez pas de compte ?{" "}
          </p>
          <Link
            to="/sign-up"
            className="ml-1 text-primary-500 text-small-semibold"
          >
            Créer un compte
          </Link>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm
