import test from 'node:test';
import assert from 'node:assert/strict';
import {securityDestination,verifiedTotp} from '../src/lib/auth-security.mjs';
test('deferred MFA only blocks login when explicitly enabled',()=>{
 assert.equal(securityDestination(null,'aal2'),'/login/');
 for(const level of [null,undefined,'aal1','unexpected'])assert.equal(securityDestination({user:{}},level,true),'/security/');
 assert.equal(securityDestination({user:{}},'aal2'),'/');
});
test('unverified enrollment and unrelated factors are not accepted as registered TOTP',()=>{
 const confirmed={id:'confirmed',factor_type:'totp',status:'verified'};
 assert.equal(verifiedTotp([{id:'pending',factor_type:'totp',status:'unverified'},{factor_type:'phone',status:'verified'}]),null);
 assert.equal(verifiedTotp([confirmed]),confirmed);
});

test('basic email login accepts a real session without MFA but rejects signed-out access',()=>{assert.equal(securityDestination(null),'/login/');assert.equal(securityDestination({user:{}},'aal1'),'/')});
