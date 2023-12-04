import { IContextType, IUser } from "@/types"
import { createContext, useContex, useEffect, useState } from "react"

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

// wrap the entire app and provide the access to the context

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Define the state of the user
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return <AuthContext.Provider></AuthContext.Provider>
}

export default AuthProvider
