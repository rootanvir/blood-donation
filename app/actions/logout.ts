"use server";

import { destroySession } from "@/components/lib/auth";

export async function logout() {
    await destroySession();
    // Don't redirect here - let the client handle it
    return { success: true };
}