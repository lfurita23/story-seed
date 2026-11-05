'use client';
import {resolveWorkCover} from '../lib/work-covers.mjs';
export default function WorkCover({value,genre,title}){
 const cover=resolveWorkCover(value,genre);
 return cover?<img className="work-cover-image" src={(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/covers/'+cover.id+'.webp?v=20261105'} alt="" loading="lazy" decoding="async"/>:<span className="work-cover-title-only"><span>{title?.trim()||'작품명을 입력하세요'}</span></span>;
}
