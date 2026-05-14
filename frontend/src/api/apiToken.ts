import { supabase } from "../lib/supabase";
import useUserStore from "../store/useUserStore";

interface ApiToken {
  user_id: string;
  token: string;
  revoked: boolean;
}

export async function getApiToken() {
  const user = useUserStore.getState().user;

  if (!user) return null;

  //check existing token
  const existingToken = await supabase
    .from("api_tokens")
    .select("*")
    .eq("user_id", user?.id)
    .eq("revoked", false)
    .single();

  //create token if not exist
  if (!existingToken.data) {
    const token = crypto.randomUUID();
    const tokenData: ApiToken = {
      user_id: user?.id,
      token,
      revoked: false,
    };
    const { data, error } = await supabase
      .from("api_tokens")
      .insert(tokenData)
      .select("*")
      .single();

    if (error) {
      console.error("Error creating API token:", error);
      return null;
    }

    return data?.token || null;
  }
  return existingToken.data.token;
}
