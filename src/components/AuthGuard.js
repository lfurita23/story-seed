'use client';
import {useEffect,useState} from 'react';
import {usePathname,useRouter} from 'next/navigation';
import {authConfigured,getAuth} from '../lib/auth-client';
import {securityDestination} from '../lib/auth-security.mjs';

const publicPaths=['/login','/signup','/forgot-password','/reset-password','/security'];
export default function AuthGuard({children}){
 const pathname=usePathname(),router=useRouter();const [allowed,setAllowed]=useState(''),[error,setError]=useState('');
 const isPublic=publicPaths.some(p=>pathname?.replace(/\/$/,'').endsWith(p));
 useEffect(()=>{if(!authConfigured||isPublic)return;let alive=true;const auth=getAuth();
 async function check(){try{const {data,error}=await auth.auth.getSession();if(error)throw error;if(!alive)return;const target=securityDestination(data.session);if(target==='/'){setAllowed(pathname);setError('')}else{setAllowed('');router.replace(target)}}catch{if(alive){setAllowed('');setError('계정 확인에 실패했습니다. 새로고침해 주세요.')}}}
 check();const {data}=auth.auth.onAuthStateChange(()=>{if(alive){setAllowed('');setTimeout(check,0)}});return()=>{alive=false;data.subscription.unsubscribe()}},[pathname,isPublic,router]);
 if(!authConfigured||isPublic||allowed===pathname)return children;
 return <main className="view-restoring" role="status">{error||'로그인 보안을 확인하고 있습니다.'}</main>;
}
