export const NOBLE_CLASSIC_PORTRAITS=[['male-lead','남성 · 검정'],['female-lead','여성 · 갈색'],['male-support','남성 · 은발'],['female-support','여성 · 검정'],['male-other','남성 · 적갈색'],['female-other','여성 · 금발']];

export const COMMONER_PORTRAITS=['male','female'].flatMap((gender)=>[['black','검정'],['brown','갈색'],['blond','금발'],['silver','은발'],['auburn','적갈색'],['blueblack','청흑발']].map(([hair,label])=>['commoner-'+gender+'-'+hair,(gender==='male'?'남성':'여성')+' · '+label]));

export const NOBLE_COLOR_PORTRAITS=['male','female'].flatMap((gender)=>[['black','검정'],['brown','갈색'],['blond','금발'],['silver','은발'],['auburn','적갈색'],['blueblack','청흑발']].map(([hair,label])=>['noble-'+gender+'-'+hair,(gender==='male'?'남성':'여성')+' · '+label]));
export const NOBLE_PORTRAITS=[...NOBLE_CLASSIC_PORTRAITS,...NOBLE_COLOR_PORTRAITS];
export const PORTRAITS=[...NOBLE_PORTRAITS,...COMMONER_PORTRAITS];
export function isCharacterImage(value){return typeof value==='string'&&((value.startsWith('preset:')&&PORTRAITS.some(([id])=>value==='preset:'+id))||(value.length<=420000&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value)));}
export function defaultPortrait(role=''){if(/여주/.test(role))return /서브/.test(role)?'female-support':'female-lead';if(/여성|여자/.test(role))return 'female-other';if(/서브남주/.test(role))return 'male-support';return 'male-lead';}
