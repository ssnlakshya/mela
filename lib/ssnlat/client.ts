import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let ssnlatClient: SupabaseClient | null = null;

export function getSsnlatClient() {
  if (ssnlatClient) return ssnlatClient;

  const url = process.env.SSNLAT_SUPABASE_URL;
  const key = process.env.SSNLAT_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing SSNLAT_SUPABASE_URL or SSNLAT_SUPABASE_ANON_KEY");
  }

  ssnlatClient = createClient(url, key, {
    auth: { persistSession: false },
  });

  return ssnlatClient;
}
