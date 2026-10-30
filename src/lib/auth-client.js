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
export function authError(error){
 const text=error?.message||'';
 if(/invalid login|invalid credentials/i.test(text))return '이메일 또는 비밀번호를 확인해 주세요.';
 if(/email not confirmed/i.test(text))return '메일함에서 이메일 인증을 먼저 완료해 주세요.';
 if(/rate limit|too many|seconds/i.test(text))return '요청이 많습니다. 잠시 후 다시 시도해 주세요.';
 if(/password/i.test(text))return '비밀번호 조건을 확인하거나 비밀번호 찾기를 이용해 주세요.';
 if(/fetch|network/i.test(text))return '연결하지 못했습니다. 네트워크 상태를 확인해 주세요.';
 return '요청을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.';
}
