'use client';
import {GENRE_COVERS,resolveWorkCover} from '../lib/work-covers.mjs';
import WorkCover from './WorkCover';
export default function WorkCoverPicker({value,genre,title,onChange}){
 const selected=resolveWorkCover(value,genre);const explicit=value?.startsWith('genre:');
 return <fieldset className="work-cover-picker"><legend>작품 표지</legend><div className="work-cover-preview"><WorkCover value={value} genre={genre} title={title}/></div><p className="muted">{!selected?'작품명만 표시':(explicit?'선택한 표지: ':'장르에 맞는 기본 표지: ')+selected.genre}</p><div className="work-cover-modes"><button type="button" className={!explicit&&value!=='none'?'active':''} aria-pressed={!explicit&&value!=='none'} onClick={()=>onChange('auto')}>장르에 맞게 자동 선택</button><button type="button" className={value==='none'?'active':''} aria-pressed={value==='none'} onClick={()=>onChange('none')}>노이미지 · 작품명만</button></div><details className="work-cover-gallery"><summary>장르별 표지 예시 · {GENRE_COVERS.length}종</summary><div>{GENRE_COVERS.map(c=><button type="button" key={c.id} className={'work-cover-choice'+(value==='genre:'+c.id?' selected':'')} aria-pressed={value==='genre:'+c.id} onClick={()=>onChange('genre:'+c.id)}><span className="work-cover-choice-image"><WorkCover value={'genre:'+c.id} genre={c.genre} title={title}/></span><span>{c.genre}</span></button>)}</div></details></fieldset>;
}
