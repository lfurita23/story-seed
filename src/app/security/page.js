'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {authConfigured,getAuth} from '../../lib/auth-client';
export default function Page(){const router=useRouter();useEffect(()=>{if(!authConfigured){router.replace('/login/');return}let alive=true;getAuth().auth.getSession().then(({data,error})=>{if(alive)router.replace(!error&&data.session?'/':'/login/')});return()=>{alive=false}},[router]);return <main className="view-restoring" role="status">로그인 화면으로 이동하고 있습니다.</main>}
