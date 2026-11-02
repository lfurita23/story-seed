'use client';
import Script from 'next/script';
import {useEffect,useRef,useState} from 'react';
export default function Captcha({siteKey,onToken,resetKey}){
 const host=useRef(null),callback=useRef(onToken);callback.current=onToken;const [loaded,setLoaded]=useState(false),[error,setError]=useState('');
 useEffect(()=>{if(!loaded||!window.turnstile||!host.current)return;setError('');const id=window.turnstile.render(host.current,{sitekey:siteKey,theme:'light',size:'flexible',language:'ko',callback:token=>callback.current(token),'expired-callback':()=>callback.current(''),'error-callback':()=>{callback.current('');setError('보안 확인을 불러오지 못했습니다. 다시 시도해 주세요.')}});return()=>{window.turnstile?.remove(id);callback.current('')}},[loaded,siteKey,resetKey]);
 return <div className="auth-captcha"><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setLoaded(true)} onError={()=>setError('보안 확인에 연결하지 못했습니다. 페이지를 새로고침해 주세요.')}/><div ref={host}/>{error&&<p role="alert" className="auth-error">{error}</p>}</div>;
}
