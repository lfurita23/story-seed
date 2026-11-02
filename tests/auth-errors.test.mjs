import test from 'node:test';
import assert from 'node:assert/strict';
import {authError} from '../src/lib/auth-errors.mjs';
test('duplicate signup directs an existing member to login instead of asking them to retry',()=>{for(const error of [{code:'user_already_exists'},{message:'User already registered'}])assert.match(authError(error),/이미 가입된 이메일.*로그인/)});
test('authentication errors separate wrong credentials, unconfirmed accounts, mail limits and service failure',()=>{assert.match(authError({code:'invalid_credentials'}),/비밀번호/);assert.match(authError({code:'email_not_confirmed'}),/인증/);assert.match(authError({code:'over_email_send_rate_limit'}),/한도/);assert.match(authError({code:'unexpected_failure'}),/unexpected_failure/);assert.doesNotMatch(authError({code:'secret-value',message:'private details'}),/private details|secret-value/)});
