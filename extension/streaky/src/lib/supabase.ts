import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const supabaseUrl = process.env.SUPABASE_URL as string;

const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
