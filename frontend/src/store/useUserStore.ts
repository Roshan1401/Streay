import { create } from "zustand";
import type { User as supabaseUser } from "@supabase/supabase-js";

interface UserState {
  user: supabaseUser | null;
  loading: boolean;
  setUser: (user: supabaseUser | null) => void;
  setLoading: (loading: boolean) => void;
  logOut: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  logOut: () => set({ user: null }),
}));
