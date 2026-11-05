import test from 'node:test';
import assert from 'node:assert/strict';
import {GENRE_COVERS,resolveWorkCover} from '../src/lib/work-covers.mjs';
test('every supported genre has a unique cover',()=>{assert.equal(GENRE_COVERS.length,17);assert.equal(new Set(GENRE_COVERS.map(c=>c.id)).size,17);for(const c of GENRE_COVERS)assert.equal(resolveWorkCover('auto',c.genre).id,c.id)});
test('legacy cover selections display calm genre covers without changing saved data',()=>{for(const color of ['violet','green','night',undefined])assert.equal(resolveWorkCover(color,'로맨스 판타지').id,'romantasy');assert.equal(resolveWorkCover('auto','이전 사용자 장르').id,'other')});
test('title-only is explicit and arbitrary paths cannot become image URLs',()=>{assert.equal(resolveWorkCover('none','판타지'),null);assert.equal(resolveWorkCover('genre:sf','로맨스').id,'sf');assert.equal(resolveWorkCover('genre:../../secret','로맨스').id,'romance')});
