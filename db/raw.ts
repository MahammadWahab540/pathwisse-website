import {env} from 'cloudflare:workers';
export function rawDb(){if(!env.DB)throw new Error('Database unavailable');return env.DB;}
export function allowedOrigin(request:Request){const origin=request.headers.get('origin');return origin==='https://pathwisse-capability.mahd-wahab.chatgpt.site'||origin===new URL(request.url).origin;}
export async function smallJson(request:Request){if(Number(request.headers.get('content-length')||0)>12000)throw new Error('Payload too large');const text=await request.text();if(text.length>12000)throw new Error('Payload too large');return JSON.parse(text);}
