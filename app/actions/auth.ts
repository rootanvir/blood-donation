"use server";

import * as crypto from 'crypto';
import { redirect } from 'next/navigation';
import { createSession } from '@/components/lib/auth';

export async function managerLogin(formData: FormData) {
    const inputUser = (formData.get("user") as string)?.trim();
    const inputPass = (formData.get("pswd") as string)?.trim();

    if (!inputUser || !inputPass) {
        throw new Error("ইউজার নাম এবং পাসওয়ার্ড দিতে হবে");
    }

    if (!process.env.ENCRYPTED_ADMIN_USER || !process.env.ENCRYPTED_ADMIN_PASS) {
        throw new Error(".env.local ফাইলে তথ্য পাওয়া যায়নি");
    }

    const storedUserMD5 = process.env.ENCRYPTED_ADMIN_USER.trim();
    const storedPassMD5 = process.env.ENCRYPTED_ADMIN_PASS.trim();

    const inputUserMD5 = crypto.createHash('md5').update(inputUser).digest('hex');
    const inputPassMD5 = crypto.createHash('md5').update(inputPass).digest('hex');

    const userMatch = inputUserMD5 === storedUserMD5;
    const passMatch = inputPassMD5 === storedPassMD5;

    if (!userMatch || !passMatch) {
        throw new Error("ইউজার নাম অথবা পাসওয়ার্ড ভুল");
    }

    // Create secure session
    await createSession(inputUser);
    
    // Redirect to manager
    redirect("/manager");
}