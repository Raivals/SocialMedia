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
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"

import {
  useCreateUserAccount,
  useSingInAccount,
} from "@/lib/react-query/queriesAndMutation"
import { useUserContext } from "@/context/AuthContext"

const SignupForm = () => {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate()
  // Fake field for a loader when you submit the form
  // Self made Hook
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount()

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSingInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // create the user
    const newUser = await createUserAccount(values)

    if (!newUser) {
      return toast({
        title: "Création échoué. Essayez encore.",
      })
    }
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

        <h2 className="pt-5 h3-bold md:h2-bold sm:pt-12">Créer un compte</h2>
        <p className="mt-2 text-light-3 small-medium md:base-regular">
          Pour utiliser Snapgram, entrez les détails de votre compte.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5 mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pseudo</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingAccount ? (
              <div className="gap-2 flex-center">
                {" "}
                <Loader />
                Loading...
              </div>
            ) : (
              "Je m'inscris"
            )}
          </Button>
          <p className="mt-2 text-center text-small-regular text-light-2">
            {" "}
            Vous avez déjà un compte ?{" "}
          </p>
          <Link
            to="/sign-in"
            className="ml-1 text-primary-500 text-small-semibold"
          >
            Log in
          </Link>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm
