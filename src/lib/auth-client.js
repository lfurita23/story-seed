'use client';
import {createClient} from '@supabase/supabase-js';
let client;
export const authConfigured=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
export function getAuth(){
 if(!authConfigured)return null;
 if(!client)client=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:'story-seed.auth'}});
 return client;
}
export function authUrl(route='') {return window.location.origin+(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/'+(route?route+'/':'');}
export {authError} from './auth-errors.mjs';
