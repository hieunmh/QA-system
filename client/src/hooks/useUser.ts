import { UserType } from '@/types/type';
import { create } from 'zustand';

interface useUserType {
  user: UserType | null,
  setUser: (user: UserType | null) => void;
}

export const useUser = create<useUserType>(set => ({
  user: null,
  setUser: (user: UserType | null) => set({ user })
}));