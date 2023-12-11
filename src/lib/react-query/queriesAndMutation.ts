import { INewUser } from "@/types"
// Import react query
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query"
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
} from "../appwrite/api"

// Creatin the user
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  })
}

// Sign in into the account
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  })
}

// log out
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  })
}
