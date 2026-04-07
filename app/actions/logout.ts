"use server";

import { redirect } from 'next/navigation';
import { destroySession } from '@/components/lib/auth';

export async function logout() {
    await destroySession();
    redirect('/login');
}