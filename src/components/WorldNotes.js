'use client';
import {useEffect,useState} from 'react';
export default function WorldNotes({work,onSave,onDirtyChange,disabled}){
 const [editing,setEditing]=useState(false),[text,setText]=useState(work.world||''),[baseline,setBaseline]=useState(work.world||'');
 const dirty=editing&&text!==baseline;
 useEffect(()=>{onDirtyChange(dirty);return()=>onDirtyChange(false)},[dirty,onDirtyChange]);
 function edit(){setText(work.world||'');setBaseline(work.world||'');setEditing(true)}
 function cancel(){if(dirty&&!confirm('저장하지 않은 세계관 변경 사항을 버릴까요?'))return;setText(work.world||'');setBaseline(work.world||'');setEditing(false)}
 function submit(e){e.preventDefault();if(disabled)return;if(onSave(text)){setBaseline(text);setEditing(false)}}
 return <section className="panel world-panel"><div className="world-notes-heading"><div><span className="eyebrow">WORLDBUILDING NOTES</span><h2>{work.title}의 세계</h2><p className="muted">이야기의 배경과 규칙, 오래 기억할 설정을 모아두세요.</p></div>{!editing&&<button className="world-edit-button" onClick={edit} disabled={disabled}>세계관 편집</button>}</div><hr/>{editing?<form className="world-notes-form" onSubmit={submit}><label className="field" htmlFor="world-note-text">세계관 노트</label><textarea id="world-note-text" value={text} onChange={e=>setText(e.target.value)} autoFocus disabled={disabled} placeholder="배경, 시대, 장소, 세계의 규칙과 설정을 자유롭게 작성하세요."/><div className="world-notes-footer"><span>{dirty?'저장하지 않은 변경 있음':'공백 포함 '+text.length.toLocaleString()+'자'}</span><div><button type="button" onClick={cancel}>취소</button><button type="submit" className="primary" disabled={disabled}>저장</button></div></div></form>:<p className="pre world-text">{work.world||'아직 세계관 노트가 없습니다. 세계관 편집 버튼을 눌러 첫 설정을 기록해 보세요.'}</p>}</section>;
}
