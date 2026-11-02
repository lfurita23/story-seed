'use client';
import {useState} from 'react';
import {authConfigured,authError,authUrl,getAuth} from '../lib/auth-client';
const providers=[{key:'google',label:'구글',mark:'G',enabled:process.env.NEXT_PUBLIC_GOOGLE_LOGIN==='true'},{key:'custom:naver',label:'네이버',mark:'N',enabled:process.env.NEXT_PUBLIC_NAVER_LOGIN==='true'},{key:'kakao',label:'카카오',mark:'●',enabled:process.env.NEXT_PUBLIC_KAKAO_LOGIN==='true'}];
export default function SocialLogin(){
 const [busy,setBusy]=useState(''),[error,setError]=useState('');
 async function login(provider){if(!authConfigured||!provider.enabled)return;setBusy(provider.key);setError('');try{const {error}=await getAuth().auth.signInWithOAuth({provider:provider.key,options:{redirectTo:authUrl('security')}});if(error)throw error}catch(e){setError(authError(e));setBusy('')}}
 return <section className="social-login" aria-label="소셜 로그인과 회원가입"><p>간편 로그인 · 처음이면 회원가입</p><div>{providers.map(p=><button key={p.key} type="button" className={'social-button social-'+p.label} disabled={Boolean(busy)||!authConfigured||!p.enabled} onClick={()=>login(p)}><span aria-hidden="true">{p.mark}</span>{p.label}로 계속하기{(!authConfigured||!p.enabled)&&<small>연결 준비 중</small>}</button>)}</div>{error&&<p className="auth-error" role="alert">{error}</p>}</section>;
}
