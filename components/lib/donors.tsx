import { supabase } from "@/db/supabase";

export type Donor = {
  name: string;
  blood: string;
  phone: string;
  division: string;
  police_station: string;
  address: string;
};

export async function addDonor(donor: Donor) {
  const { data, error } = await supabase
    .from("blood_donors")
    .insert([donor])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function checkPhoneExists(phone: string) {
  const { data } = await supabase
    .from("blood_donors")
    .select("phone")
    .eq("phone", phone)
    .single();

  return !!data;
}

// Get donors with optional limit (only fetches what's needed)
export async function getDonors(limit?: number) {
  let query = supabase
    .from("blood_donors")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);
  return { data: data || [], count: count || 0 };
}

// Get all donors (for search functionality)
export async function getAllDonors() {
  const { data, error } = await supabase
    .from("blood_donors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}