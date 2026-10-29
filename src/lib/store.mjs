export const KEY='seosa.manual.v2';
export const empty=()=>({version:2,revision:0,works:[],episodes:[],characters:[]});
export function validate(d){
 if(!d||d.version!==2||!Number.isInteger(d.revision)||d.revision<0) throw Error('SEOSA v2 백업 파일이 아닙니다.');
 for(const name of ['works','episodes','characters']){if(!Array.isArray(d[name]))throw Error('데이터 목록이 올바르지 않습니다.');const ids=new Set();for(const r of d[name]){if(!r||typeof r.id!=='string'||!r.id||ids.has(r.id))throw Error('중복되거나 잘못된 ID입니다.');ids.add(r.id);for(const v of Object.values(r))if(typeof v!=='string'&&!Array.isArray(v))throw Error('잘못된 필드입니다.');}}
 const fields={works:['title','genre','status','summary','world','color','updatedAt'],episodes:['workId','title','number','content','status','updatedAt'],characters:['workId','name','role','personality','appearance','ability','memo','updatedAt']};
 for(const name of Object.keys(fields))for(const row of d[name])for(const key of fields[name])if(row[key]!==undefined&&typeof row[key]!=='string')throw Error('텍스트 필드 형식이 올바르지 않습니다.');
 const works=new Set(d.works.map(r=>r.id));const chars=new Map(d.characters.map(r=>[r.id,r]));
 for(const w of d.works)if(!w.title?.trim())throw Error('작품명이 없습니다.');
 for(const c of d.characters)if(!works.has(c.workId)||!c.name?.trim())throw Error('캐릭터 연결을 확인하세요.');
 for(const e of d.episodes){if(!works.has(e.workId)||!e.title?.trim()||!/^\d+$/.test(e.number)||Number(e.number)<1||!Array.isArray(e.characterIds)||e.characterIds.some(id=>chars.get(id)?.workId!==e.workId))throw Error('회차 연결을 확인하세요.');}
 for(const w of d.works){const nums=d.episodes.filter(e=>e.workId===w.id).map(e=>Number(e.number));if(new Set(nums).size!==nums.length)throw Error('동일 작품에 중복 회차 번호가 있습니다.');}return d;
}
export function read(storage){const raw=storage.getItem(KEY);return raw?validate(JSON.parse(raw)):empty();}
export function commit(storage,previous,next){validate(next);const raw=storage.getItem(KEY);if(raw){const current=validate(JSON.parse(raw));if(current.revision!==previous.revision)throw Error('다른 탭에서 변경했습니다. 백업 후 새로고침하세요.');storage.setItem(KEY+'.backup',raw);}else if(previous.revision!==0)throw Error('저장소가 변경되었습니다. 새로고침하세요.');const saved={...next,revision:previous.revision+1};storage.setItem(KEY,JSON.stringify(saved));return saved;}
export function merge(current,incoming,uuid){validate(incoming);const out=structuredClone(current);const wm=new Map(),cm=new Map();for(const w of incoming.works){const id=uuid();wm.set(w.id,id);out.works.push({...w,id});}for(const c of incoming.characters){const id=uuid();cm.set(c.id,id);out.characters.push({...c,id,workId:wm.get(c.workId)});}for(const e of incoming.episodes)out.episodes.push({...e,id:uuid(),workId:wm.get(e.workId),characterIds:e.characterIds.map(id=>cm.get(id))});return validate(out);}
