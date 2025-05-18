import { create } from 'zustand'
import { useEffect } from 'react'
import { useAuthenticationService } from '../service/AuthenticationService'

type UserStore = {
  user: string | null;
  setUser: (user: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: string | null) => set({ user }),
}))

export const useSyncUserWithAuth = () => {
  const auth = useAuthenticationService()
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [auth, setUser])
}
