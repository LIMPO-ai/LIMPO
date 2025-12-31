// supabase.js
const supabaseUrl = "sb_publishable_Kwtr59qmzPDmPes_0yKfEA_aPmYE9Zd"; // replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGZudHplZ21paHZjcmZsdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjA4NDcsImV4cCI6MjA4MjM5Njg0N30.GfvKkgLxgFfwDe0XbbE1lzWNQXEHipHDwiHn7i9wZnc"; // replace with your Supabase anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Expose globally if needed
window.supabase = supabase;
