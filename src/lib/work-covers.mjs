export const GENRE_COVERS=[
 ['romantasy','로맨스 판타지'],['romance','로맨스'],['fantasy','판타지'],['modern-fantasy','현대 판타지'],['martial-arts','무협'],['fusion-fantasy','퓨전 판타지'],['sf','SF'],['mystery','미스터리·추리'],['thriller','스릴러'],['horror','공포'],['historical','역사·대체역사'],['drama','드라마'],['healing','일상·힐링'],['sports','스포츠'],['bl','BL'],['gl','GL'],['other','기타']
].map(([id,genre])=>({id,genre}));
export function resolveWorkCover(value,genre){
 if(value==='none')return null;
 const explicit=GENRE_COVERS.find(c=>value==='genre:'+c.id);
 return explicit||GENRE_COVERS.find(c=>c.genre===genre)||GENRE_COVERS.find(c=>c.id==='other');
}
