import {PORTRAITS,NOBLE_CLASSIC_PORTRAITS,NOBLE_COLOR_PORTRAITS,COMMONER_PORTRAITS,isCharacterImage,defaultPortrait} from '../lib/character-images.mjs';
export default function CharacterImage({character,className=''}){
 const value=isCharacterImage(character.image)?character.image:'preset:'+defaultPortrait(character.role);
 if(value.startsWith('data:'))return <span className={'character-image uploaded '+className} role="img" aria-label={character.name?character.name+' 프로필 이미지':'선택한 이미지'} style={{backgroundImage:`url("${value}")`}}/>;
 const id=value.slice(7);const kind=id.startsWith('commoner-')?'commoner':id.startsWith('noble-')?'noble-color':'classic';
 const options=kind==='commoner'?COMMONER_PORTRAITS:kind==='noble-color'?NOBLE_COLOR_PORTRAITS:NOBLE_CLASSIC_PORTRAITS;
 const index=Math.max(0,options.findIndex(([key])=>key===id));
 return <span className={'character-image preset '+kind+' '+className} role="img" aria-label={options[index][1]+' 기본 이미지'} style={{backgroundPosition:(index%3)*50+'% '+(Math.floor(index/3)*(kind==='classic'?100:100/3))+'%'}}/>;
}
