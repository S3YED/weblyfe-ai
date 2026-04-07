import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabaseAdmin: SupabaseClient | null = null;
let _supabase: SupabaseClient | null = null;

function getSupabaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://placeholder.supabase.co'
  );
}

function getSupabaseAnonKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'placeholder-anon-key'
  );
}

function getServiceRoleKey(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'placeholder-service-key'
  );
}

// Client-side (RLS enforced) — safe to call at runtime
export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey());
  }
  return _supabase;
}

// Server-side admin (bypasses RLS) — safe to call at runtime
export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(getSupabaseUrl(), getServiceRoleKey(), {
      auth: { persistSession: false },
    });
  }
  return _supabaseAdmin;
}

// Keep exports for backwards compat (but these may be undefined at build time)
export const supabase = undefined as unknown as SupabaseClient;
export const supabaseAdmin = undefined as unknown as SupabaseClient;
