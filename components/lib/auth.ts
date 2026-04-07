import { cookies } from 'next/headers';

const SESSION_DURATION = 60 * 60 * 24 * 15;

export async function createSession(username: string) {
    try {
        const timestamp = Date.now();
        const secret = process.env.AUTH_SECRET;
        
        if (!secret) {
            throw new Error("AUTH_SECRET is not set");
        }
        
        // Use Web Crypto API instead of Node.js crypto
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const messageData = encoder.encode(`${username}|${timestamp}`);
        
        // Import key and create HMAC
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );
        
        const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
        const signatureHex = Array.from(new Uint8Array(signature))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        
        const token = btoa(`${username}|${timestamp}|${signatureHex}`);
        
        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: SESSION_DURATION,
            path: '/',
        });
    } catch (error) {
        console.error("Session creation error:", error);
        throw error;
    }
}

export async function verifySession(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;
        
        if (!token) return false;
        
        const decoded = atob(token);
        const parts = decoded.split('|');
        
        if (parts.length !== 3) return false;
        
        const [username, timestamp, signature] = parts;
        
        if (!username || !timestamp || !signature) return false;
        
        const sessionAge = (Date.now() - parseInt(timestamp)) / 1000;
        if (sessionAge > SESSION_DURATION) return false;
        
        const secret = process.env.AUTH_SECRET;
        if (!secret) return false;
        
        // Verify signature using Web Crypto API
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const messageData = encoder.encode(`${username}|${timestamp}`);
        
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );
        
        const expectedSignature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
        const expectedSignatureHex = Array.from(new Uint8Array(expectedSignature))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        
        return signature === expectedSignatureHex;
        
    } catch (error) {
        console.error("Session verification error:", error);
        return false;
    }
}

export async function destroySession() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('auth_token');
    } catch (error) {
        console.error("Session destroy error:", error);
    }
}