import { supabase } from "@/db/supabase";

export type Donor = {
  name: string;
  blood: string;
  phone: string;
  division: string;
  station: string;
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