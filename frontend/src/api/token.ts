import { supabase } from "../lib/supabase";

export async function getApiToken(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("api_tokens")
    .select("*")
    .eq("user_id", userId)
    .eq("revoked", false)
    .single();

  if (error) {
    console.error("Error fetching token:", error.message);
    return null;
  }

  return data?.token ?? null;
}

export async function createApiToken(userId: string): Promise<string | null> {
  const token = crypto.randomUUID();

  const { data, error } = await supabase
    .from("api_tokens")
    .insert({
      user_id: userId,
      token,
      revoked: false,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error creating token:", error.message);
    return null;
  }

  return data.token;
}
