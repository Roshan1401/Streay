import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ejjtcbyqgtqzksnzcbrg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqanRjYnlxZ3RxemtzbnpjYnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDA3MjIsImV4cCI6MjA5MDcxNjcyMn0.ibXbENVG8U7ViETdlvpDBKBtLMOJ9Fp8Z_A6cW3PBFo";

export const supabase = createClient(supabaseUrl, supabaseKey);
