import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl) throw new Error("Missing VITE_SUPABASE_URL env variable");
if (!supabaseKey) throw new Error("Missing VITE_SUPABASE_ANON_KEY env variable");

export const supabase = createClient(supabaseUrl, supabaseKey);
