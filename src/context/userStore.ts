import { create } from 'zustand'
import nookies from 'nookies';

type UserStore = {
  user: string | null;
  setUser: (user: string | null) => void;
}

const initialUser = nookies.get(null).USER || null;

export const useUserStore = create<UserStore>((set) => ({
  user: initialUser,
  setUser: (user: string | null) => set({ user }),
}))
