import { verifySession } from '@/components/lib/auth';
import { redirect } from 'next/navigation';

export default async function ManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = await verifySession();
    
    if (!isAuthenticated) {
        redirect('/login');
    }
    
    return <>{children}</>;
}