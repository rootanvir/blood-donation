"use server";

import * as crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function managerLogin(formData: FormData) {
    const inputUser = (formData.get("user") as string)?.trim();
    const inputPass = (formData.get("pswd") as string)?.trim();

    if (!inputUser || !inputPass) {
        throw new Error("ইউজার নাম এবং পাসওয়ার্ড দিতে হবে");
    }

    if (!process.env.ENCRYPTED_ADMIN_USER || !process.env.ENCRYPTED_ADMIN_PASS) {
        throw new Error(".env.local ফাইলে তথ্য পাওয়া যায়নি। ফাইলের নাম .env.local রাখুন");
    }

    try {
        const storedUserMD5 = process.env.ENCRYPTED_ADMIN_USER.trim();
        const storedPassMD5 = process.env.ENCRYPTED_ADMIN_PASS.trim();

        const inputUserMD5 = crypto.createHash('md5').update(inputUser).digest('hex');
        const inputPassMD5 = crypto.createHash('md5').update(inputPass).digest('hex');

        const userMatch = inputUserMD5 === storedUserMD5;
        const passMatch = inputPassMD5 === storedPassMD5;

        if (!userMatch || !passMatch) {
            throw new Error("ইউজার নাম অথবা পাসওয়ার্ড ভুল");
        }

        // ================== SUCCESS ==================
        const cookieStore = await cookies();
        cookieStore.set('manager_logged_in', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        // Redirect without throwing error in catch block
        redirect("/manager");

    } catch (error: any) {
        // This is important: Let NEXT_REDIRECT pass through
        if (error.message === 'NEXT_REDIRECT') {
            throw error;   // Re-throw redirect so Next.js can handle it
        }

        console.error("Login error:", error.message);
        throw new Error(error.message || "লগইন ব্যর্থ হয়েছে");
    }
}