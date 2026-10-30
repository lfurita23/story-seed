'use client';
import {useEffect,useRef,useState} from 'react';
export function useDeleteConfirmation(){
 const [request,setRequest]=useState(null);const resolve=useRef(null);
 useEffect(()=>()=>{resolve.current?.(false)},[]);
 function finish(value){const done=resolve.current;resolve.current=null;setRequest(null);done?.(value)}
 function confirmDelete(message){if(resolve.current)return Promise.resolve(false);return new Promise(done=>{resolve.current=done;setRequest(message)})}
 return [confirmDelete,request?<DeleteConfirmation message={request} onFinish={finish}/>:null];
}
function DeleteConfirmation({message,onFinish}){
 const dialog=useRef(null),cancel=useRef(null);
 useEffect(()=>{dialog.current.showModal();cancel.current.focus()},[]);
 return <dialog ref={dialog} className="delete-confirmation" aria-labelledby="delete-confirm-title" aria-describedby="delete-confirm-message" onCancel={e=>{e.preventDefault();onFinish(false)}}><div className="delete-confirm-content"><span className="delete-confirm-icon" aria-hidden="true">!</span><h2 id="delete-confirm-title">삭제하시겠어요?</h2><p id="delete-confirm-message">{message}</p><div className="delete-confirm-actions"><button ref={cancel} type="button" onClick={()=>onFinish(false)}>취소</button><button type="button" className="delete-confirm-submit" onClick={()=>onFinish(true)}>삭제</button></div></div></dialog>;
}
