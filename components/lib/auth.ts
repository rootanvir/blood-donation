import * as crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

function createSessionToken(username: string): string {
    const timestamp = Date.now();
    const secret = process.env.AUTH_SECRET!;
    
    // Create a unique session token with timestamp and HMAC signature
    const payload = `${username}|${timestamp}`;
    const signature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
    
    // Combine payload and signature
    return Buffer.from(`${payload}|${signature}`).toString('base64');
}

function verifySessionToken(token: string): boolean {
    try {
        const decoded = Buffer.from(token, 'base64').toString();
        const [username, timestamp, signature] = decoded.split('|');
        
        if (!username || !timestamp || !signature) return false;
        
        // Check if session is expired
        const sessionAge = (Date.now() - parseInt(timestamp)) / 1000;
        if (sessionAge > SESSION_DURATION) return false;
        
        // Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.AUTH_SECRET!)
            .update(`${username}|${timestamp}`)
            .digest('hex');
        
        return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        );
    } catch {
        return false;
    }
}

export async function createSession(username: string) {
    const token = createSessionToken(username);
    const cookieStore = await cookies();
    
    cookieStore.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: SESSION_DURATION,
        path: '/',
    });
}

export async function verifySession(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) return false;
    return verifySessionToken(token);
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
}