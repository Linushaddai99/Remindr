import { createClient } from "@supabase/supabase-js";
// Remove the local ImportMeta interface extension

const projectUrl = import.meta.env.VITE_PROJECT_URL;
const apiKey = import.meta.env.VITE_API_KEY


export const supabase = createClient(projectUrl, apiKey)