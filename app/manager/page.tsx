import { verifySession } from '@/components/lib/auth';
import { redirect } from 'next/navigation';
import ManagerDashboard from './components/ManagerDashboard';

export default async function ManagerPage() {
    const isAuthenticated = await verifySession();
    
    if (!isAuthenticated) {
        // Use absolute URL to avoid confusion
        redirect('/login');
    }
    
    return <ManagerDashboard />;
}