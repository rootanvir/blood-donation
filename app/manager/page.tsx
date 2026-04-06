// app/manager/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ManagerDashboard from './components/ManagerDashboard';

export default async function ManagerPage() {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get('manager_logged_in')?.value === 'true';

    if (!isLoggedIn) {
        redirect('/manager/login');
    }

    return <ManagerDashboard />;
}