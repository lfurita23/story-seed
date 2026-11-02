export function authError(error){
 const code=error?.code||'',text=error?.message||'';
 if(code==='user_already_exists'||code==='email_exists'||/already registered|already exists/i.test(text))return '이미 가입된 이메일입니다. 회원가입 대신 로그인해 주세요.';
 if(code==='invalid_credentials'||/invalid login|invalid credentials/i.test(text))return '이메일 또는 비밀번호를 확인해 주세요.';
 if(code==='email_not_confirmed'||/email not confirmed/i.test(text))return '이메일 인증이 완료되지 않은 기존 계정입니다. 인증 상태를 확인해 주세요.';
 if(code==='signup_disabled')return '현재 회원가입이 중지되어 있습니다. 관리자에게 문의해 주세요.';
 if(code==='email_address_not_authorized'||/email address not authorized/i.test(text))return '현재 메일 발송 설정으로는 이 주소에 인증 메일을 보낼 수 없습니다. 발송 서비스 연결이 필요합니다.';
 if(code==='over_email_send_rate_limit'||/email.*(rate limit|limit exceeded)/i.test(text))return '메일 발송 한도에 도달했습니다. 잠시 후 다시 시도하거나 메일 발송 서비스 설정을 확인해 주세요.';
 if(code==='email_address_invalid'||/invalid email|email.*invalid/i.test(text))return '이메일 주소 형식을 확인해 주세요.';
 if(code==='weak_password'||/password/i.test(text))return '비밀번호 조건을 확인하거나 비밀번호 찾기를 이용해 주세요.';
 if(/captcha/i.test(text))return '자동입력 방지 확인이 만료되었거나 실패했습니다. 다시 확인해 주세요.';
 if(/provider|oauth/i.test(text))return '소셜 로그인 연결을 완료하지 못했습니다. 설정 또는 동의 상태를 확인해 주세요.';
 if(/rate limit|too many|seconds/i.test(text))return '요청이 많습니다. 잠시 후 다시 시도해 주세요.';
 if(/fetch|network/i.test(text))return '연결하지 못했습니다. 네트워크 상태를 확인해 주세요.';
 return '요청을 완료하지 못했습니다. '+(/^[a-z_]{1,70}$/.test(code)?'오류 코드: '+code:'잠시 후 다시 시도해 주세요.');
}
