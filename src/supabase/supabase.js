import { createClient }

from "@supabase/supabase-js";


const supabaseUrl =

"https://zllhlzzvdudgtdkjgrvq.supabase.co";


const supabaseKey =

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsbGhsenp2ZHVkZ3Rka2pncnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDgxODUsImV4cCI6MjA5NzUyNDE4NX0.cnQdLbApVQF5qNzR7af8K2LJxqbA8lrqBUOTedJaQsg";


export const supabase =

createClient(

supabaseUrl,

supabaseKey

);