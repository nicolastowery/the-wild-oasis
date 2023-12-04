import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yzaheafpxamvbxsothlm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6YWhlYWZweGFtdmJ4c290aGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4NDU0MzcsImV4cCI6MjAxMTQyMTQzN30.Oc9eUY1jM3ydynLWtm6vXflXqkXQ2IQ7NwKGzEsahE0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
