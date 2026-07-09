import { create } from "zustand";
import type { User as supabaseUser } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { getApiToken } from "../api/token";
import useTokenStore from "./useTokenStore";

interface UserState {
  user: supabaseUser | null;
  loading: boolean;
  setUser: (user: supabaseUser | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  logOut: () => Promise<void>;
}

let authListener: { data: { subscription: { unsubscribe: () => void } } } | null = null;

const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  initialize: async () => {
    set({ loading: true });

    const { data } = await supabase.auth.getSession();

    const user = data.session?.user ?? null;

    if (user) {
      const token = await getApiToken(user.id);
      if (token) {
        useTokenStore.getState().setToken(token);
      }
    }

    set({ user: user ?? null, loading: false });

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    if (authListener) {
      authListener.data.subscription.unsubscribe();
    }

    authListener = supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, loading: false });
    }) as typeof authListener;
  },
  logOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

export default useUserStore;
