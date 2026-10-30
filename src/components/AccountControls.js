'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {getAuth,authError} from '../lib/auth-client';
export default function AccountControls(){
 const [user,setUser]=useState(null),[busy,setBusy]=useState(false),[error,setError]=useState('');
 useEffect(()=>{const auth=getAuth();if(!auth)return;let alive=true;auth.auth.getSession().then(({data})=>{if(alive)setUser(data.session?.user||null)});const {data}=auth.auth.onAuthStateChange((event,session)=>{if(alive)setUser(session?.user||null)});return()=>{alive=false;data.subscription.unsubscribe()}},[]);
 async function logout(){setBusy(true);setError('');try{const {error}=await getAuth().auth.signOut({scope:'local'});if(error)throw error;setUser(null)}catch(e){setError(authError(e))}finally{setBusy(false)}}
 return <div className="account-area">{user?<><span className="account-email" title={user.email}>{user.email}</span><button onClick={logout} disabled={busy}>{busy?'로그아웃 중…':'로그아웃'}</button></>:<><Link href="/login/">로그인</Link><Link href="/signup/" className="account-signup">회원가입</Link></>}{error&&<span role="alert" className="account-error">{error}</span>}</div>;
}
