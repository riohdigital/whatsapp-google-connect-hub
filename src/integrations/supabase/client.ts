
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with public keys
// In a production environment, these should come from environment variables
const supabaseUrl = 'https://uoeshejtkzngnqxtqtbl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZXNoZWp0a3puZ25xeHRxdGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NTg3NDEsImV4cCI6MjA1OTEzNDc0MX0.URL7EMIL6dqMEJI33ZILQd3pO3AXKAB3zajBQQpx1kc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});
