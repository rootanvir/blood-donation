import { verifySession } from '@/components/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = await verifySession();
    
    if (isAuthenticated) {
        redirect('/manager');
    }
    
    return <>{children}</>;
}