import { create } from "zustand";
import { supabase } from "../lib/supabase";

interface ProfileState {
  profile: {
    id: string;
    name: string;
    username: string;
    bio: string | null;
    avatar_url: string;
    country: string | null;
    state: string | null;
    city: string | null;
  } | null;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  loading: boolean;
  setProfile: (profile: ProfileState["profile"]) => void;
  setLoading: (loading: boolean) => void;
  fetchProfile: () => Promise<void>;
}

const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: true,
  setProfile: (profile) => set({ profile }),
  socialLinks: [],
  setLoading: (loading) => set({ loading }),
  fetchProfile: async () => {
    set({ loading: true });
    try {
      const {
        data: { session },
        error: refreshError,
      } = await supabase.auth.refreshSession();

      if (refreshError || !session?.user) {
        console.error("Session refresh failed:", refreshError?.message);
        set({ profile: null, loading: false });
        return;
      }

      const user = session.user;
      const { data, error } = await supabase
        .from("profiles")
        .select(
          `
    *,
    social_links (    
      platform,
      url
    )
  `,
        )
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        set({ profile: null, loading: false });
        return;
      }

      set({
        profile: data,
        socialLinks: data.social_links ?? [],
        loading: false,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      set({ profile: null, loading: false });
    }
  },
}));
export default useProfileStore;
