// app/manager/page.tsx
import { verifySession } from '@/components/lib/auth';
import { redirect } from 'next/navigation';
import ManagerDashboard from './components/ManagerDashboard';

export default async function ManagerPage() {
    const isAuthenticated = await verifySession();

    if (!isAuthenticated) {
        redirect('/login');  // Changed from '/manager/login' to '/login'
    }

    return <ManagerDashboard />;
}