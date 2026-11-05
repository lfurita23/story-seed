# 2026-11-05 인증 프로젝트 분리 준비

- 전용 프로젝트: novel-team 조직의 story-seed (`utvoealamrtiuutdtvlb`). 실제 조회: Auth 사용자 0명, episodes/lore_books/novels 테이블, 모두 RLS 활성화. 보안 advisor 결과 없음.
- 운영 Site URL과 로그인/복구 리디렉션 4개를 전용 프로젝트에 저장했다.
- GitHub Pages workflow는 전용 프로젝트 URL과 공개 publishable key를 명시한다. 이전 공용 프로젝트를 가리키는 repository variables는 더 이상 사용하지 않는다. 관리자 키는 포함하지 않는다.
- 세션 저장 키는 `story-seed.utvoealamrtiuutdtvlb.auth`로 분리했다. 이전 세션을 새 프로젝트에 넘기지 않으며, 원고 키 `seosa.manual.v2`와 백업은 건드리지 않는다.
- 로그인/가입 화면에 전용 계정 재가입 안내를 추가했다. 기존 공용 프로젝트의 계정은 삭제/이전하지 않는다.
- 새 프로젝트의 이메일 인증은 ON 유지. SMTP는 아직 저장되지 않아 운영 전환/배포는 대기 중이다. 사용자는 직접 소유한 도메인이 없어 Gmail SMTP로 먼저 설정하기로 했다.
- Gmail SMTP: smtp.gmail.com, 465, Sender email/Username은 발송용 Gmail 전체 주소, Sender name은 Story Seed, Password는 사용자가 직접 만든 Google 앱 비밀번호. 2단계 인증 필요. 비밀번호는 Supabase 화면에 사용자가 직접 입력/저장하며 채팅/소스/문서에 기록하지 않는다.
- Gmail은 개인용 발송 서비스이므로 도달률/발송 제한이 있으며 서비스 확대 시 전용 발송 서비스로 전환한다.
- 검증: 기존 14개 테스트 통과, GitHub Pages 모드 build 통과, export JS에서 새 프로젝트 1개/기존 공용 프로젝트 0개/전용 세션 키 1개 확인. 실제 가입/메일 수신은 SMTP 설정 후 사용자가 검증해야 한다.
- SMTP 저장 및 수신 확인 후 이 변경을 master에 반영/배포하고 실제 배포 스크립트의 프로젝트 URL을 다시 비교한다. 그 전에는 Stage Diary 계정 삭제 함수를 활성화하지 않는다.

아래는 이전 공용 프로젝트 연결 당시 기록이며 현재 전용 프로젝트 설정으로 간주하지 않는다.

2026-11-02 로컬 테스트: 사용자의 승인으로 이전 공용 Supabase Confirm email을 임시 해제했습니다.

# 현재 적용: 기본 이메일 회원가입·로그인

사용자 요청에 따라 간편 로그인, CAPTCHA, 필수 2단계 인증은 추후 업데이트로 미뤘습니다. 아래 기존 확장 안내는 미래 작업 참고용입니다.

- 현재 Supabase 프로젝트를 .env.local의 URL/공개 Publishable key로 연결했습니다. 기존 환경값은 보존합니다.
- 이메일 가입 → Supabase가 요구하는 이메일 확인 → 이메일·비밀번호 로그인 → 작품 목록으로 이동합니다.
- 원고 화면에는 로그인 세션이 필요하며, 실제 Supabase 세션만 로그인 상태로 사용합니다. 비밀번호를 앱이 보관하지 않습니다.
- CAPTCHA/소셜 버튼/필수 MFA는 현재 화면과 로그인 경로에서 제외합니다. Supabase 서버의 CAPTCHA도 켜져 있으면 서버에서 별도로 비활성화해야 합니다. 기존 등록된 MFA가 있는 계정의 보안은 강제로 해제하지 않습니다.
- Site URL: http://localhost:3001/ (현재 로컬 검증 기준). Redirect allowlist: 로컬/배포 루트 및 각 reset-password/ 경로 4개. 배포 전 Site URL을 운영 주소로 바꾸는 것이 권장됩니다.
- GitHub 배포에 실제 인증을 연결하려면 Actions Variables에 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY를 설정하고 새 빌드가 필요합니다. .env.local은 Git에 올리지 않습니다.
- 실제 가입 이메일 수신과 정상 비밀번호 로그인은 사용자가 직접 입력해 검증합니다. 발송 제한이나 미확인 이메일은 화면의 안내를 확인합니다.
- 브라우저 원고는 여전히 계정별 분리/서버 동기화가 없습니다. 로그인 변경으로 기존 원고를 지우지 않습니다.

---

# 추후 확장 참고 (현재 활성화 아님)

# Story Seed 인증 연결 순서

현재 코드에는 이메일 인증, 구글·카카오 OAuth, 네이버 커스텀 OAuth 연결 버튼, Turnstile 자동입력 방지, 인증 앱(TOTP) 등록·검증 화면을 준비했습니다. 실제 프로젝트와 개발자 앱을 아직 만들지 않았으므로 실제 로그인 성공은 검증되지 않았습니다. 설정 완료 전에는 해당 제출/소셜 버튼이 비활성화됩니다. 활성화 플래그만 켜도 서비스 등록이 되는 것은 아닙니다.

## 1. 먼저 Supabase 프로젝트 만들기

https://supabase.com/dashboard 에서 가입 → New project → 개인 조직 선택 → 프로젝트명 `story-seed` → 데이터베이스 비밀번호 설정 → 가까운 리전 선택 → 생성합니다. 비밀번호는 본인 비밀번호 관리자에 보관하고 채팅이나 소스에 넣지 마세요. 요금제 선택과 약관 동의는 계정 소유자가 직접 진행합니다.

프로젝트 URL과 Publishable key를 확인합니다. `auth.env.example`의 공개 변수만 기존 `.env.local`에 추가하세요. 기존 파일의 다른 값을 덮어쓰지 마세요. service_role, secret key, OAuth Client Secret, Turnstile Secret은 프런트 코드나 NEXT_PUBLIC 변수에 넣지 않습니다.

Authentication → URL Configuration:
- Site URL: `https://lfurita23.github.io/story-seed/`
- Redirect URLs: `http://localhost:3001/security/`, `http://localhost:3001/reset-password/`, `https://lfurita23.github.io/story-seed/security/`, `https://lfurita23.github.io/story-seed/reset-password/`
- 이메일 확인을 활성화하고 운영용 SMTP와 발송 제한을 점검합니다.

## 2. Turnstile 자동입력 방지

Cloudflare 대시보드 https://dash.cloudflare.com/ → Turnstile → Add widget. Managed 방식, hostname `localhost`, `lfurita23.github.io`를 등록합니다. 공개 Site key만 `NEXT_PUBLIC_TURNSTILE_SITE_KEY`에 넣고, Secret key는 Supabase Auth의 Bot and Abuse Protection/CAPTCHA 설정에 Turnstile을 선택해 저장합니다. Supabase 쪽 CAPTCHA 보호도 반드시 켜야 직접 API 호출에도 검증이 적용됩니다. 실패·만료 시 새 토큰을 받아 다시 제출하며, 설정 누락 시 이메일 로그인·가입·재설정 메일 요청은 열리지 않습니다. 소셜 OAuth 흐름은 각 제공자의 보안 절차를 거치며 앱의 CAPTCHA가 모든 OAuth 요청을 보호한다고 가정하지 않습니다.

## 3. 구글

Google Cloud Console https://console.cloud.google.com/ 에서 OAuth 동의 화면/대상 사용자/웹 애플리케이션 클라이언트를 등록합니다. Supabase Google provider 화면에 표시되는 callback URL을 구글의 Authorized redirect URIs에 그대로 등록하고, Client ID와 Client Secret을 Supabase Google provider에 입력합니다. 클라이언트 비밀값은 GitHub나 브라우저에 넣지 않습니다. 테스트 모드에서는 테스트 계정 추가가 필요하며, 운영 공개 범위와 검증 요구사항을 확인하세요. 연결 검증 후 `NEXT_PUBLIC_GOOGLE_LOGIN=true`로 설정합니다.

## 4. 카카오

Kakao Developers https://developers.kakao.com/ 에서 앱 생성 → 카카오 로그인 활성화 → 플랫폼/웹 도메인 등록 → Supabase Kakao provider의 callback URL을 Redirect URI로 등록합니다. 이메일 등 필요한 동의항목과 사용 가능 권한을 확인하고, Supabase provider에 REST API key와 필요한 Client Secret을 저장합니다. 연결 검증 후 `NEXT_PUBLIC_KAKAO_LOGIN=true`로 설정합니다. 카카오톡 앱 자체에 비밀번호를 입력받는 기능이 아니라 카카오 계정 OAuth 로그인입니다.

## 5. 네이버 (별도 연결 검증 필요)

NAVER Developers https://developers.naver.com/apps/ 에서 네이버 로그인 앱을 등록합니다. Supabase 기본 provider에 네이버는 없으므로 Custom OAuth2 provider `custom:naver`를 구성하는 경로를 준비했습니다.
- Authorization: `https://nid.naver.com/oauth2.0/authorize`
- Token: `https://nid.naver.com/oauth2.0/token`
- UserInfo: `https://openapi.naver.com/v1/nid/me`
- Callback: 커스텀 provider 생성 화면의 URL을 네이버 앱에 등록

네이버 프로필은 `response` 아래에 id/email/name이 있으므로 Supabase attribute mapping과 token 교환 방식, PKCE 지원 여부를 실제 환경에서 확인해야 합니다. 이 문서는 네이버 호환 설정을 검증 완료했다고 주장하지 않습니다. 필요한 mapping이 대시보드에서 지원되지 않거나 토큰 교환이 호환되지 않으면 서버 측 인증 중계가 추가로 필요합니다. 브라우저에 Client Secret을 넣어 해결하지 마세요. 실제 가입·재로그인·취소·프로필 동의 거부를 통과하기 전에는 `NEXT_PUBLIC_NAVER_LOGIN=false`를 유지하세요. 공개 이용에는 네이버 검수 요구사항도 확인합니다.

## 6. 2단계 인증

로그인/소셜 콜백 후 `/security/`로 이동합니다. 등록된 TOTP가 없으면 인증 앱 등록 버튼 → QR 스캔 또는 수동 키 입력 → 6자리 코드 확인 순서입니다. 이후 로그인은 인증 앱 번호 검증이 필요합니다. Supabase가 확인한 `aal2` 상태여야 앱의 계정 연결된 화면으로 진행합니다. 로컬 플래그로 인증 완료를 표시하지 않습니다. 인증 키/QR을 별도 로컬 저장·로그 출력하지 않습니다.

인증 앱 분실 시 본인 확인을 거치는 관리자 복구 절차가 필요합니다. 복구 정책을 운영 전에 준비하고, 임의의 브라우저 버튼으로 등록된 인증을 해제하는 우회는 두지 않습니다. 기존 등록자에게는 새 비밀번호 변경 시에도 추가 인증이 필요합니다. 현재 복구 화면은 추가 인증이 필요하면 안내하고 변경을 중단하므로, 실제 계정 복구 동선을 점검해야 합니다.

중요한 범위: GitHub Pages는 정적 사이트입니다. 현재 원고는 `seosa.manual.v2` 브라우저 저장소이며 계정별 암호화/접근 권한/서버 동기화가 없습니다. AuthGuard는 정상 화면 흐름의 2단계 확인이며 로컬 저장 데이터를 서버 보안 경계로 보호하지 못합니다. 사용자별 보호가 필요하면 Supabase DB/Storage와 RLS에 `auth.uid()` 및 JWT `aal2` 조건을 적용하고 데이터 이전 계획을 별도로 구현해야 합니다. 인증 연결 전에는 기존 로컬 집필 화면을 유지합니다. 로그인·로그아웃 시 기존 원고를 삭제하거나 자동 업로드하지 않습니다.

## 7. 배포

GitHub 저장소 Settings → Secrets and variables → Actions → Variables에 `auth.env.example`의 공개 변수들을 동일 이름으로 등록합니다. workflow는 이 값들을 빌드 시 읽습니다. 코드 수정만으로 기존 배포의 인증 버튼이 활성화되지 않습니다. 실제 비밀값들은 각 인증 서비스 관리 화면에만 저장하세요. 이 작업은 자동 push 하지 않습니다.

## 실계정 검증 (설정 후 진행)

- 이메일 가입/인증, CAPTCHA 실패·만료·재시도, 잘못된 비밀번호, 재설정 메일
- 구글·카카오·네이버 각각 첫 가입/재로그인/취소/동의 거부
- 새 계정 TOTP 등록, 잘못된/만료된 번호 거절, 정상 번호만 통과
- 비밀번호/소셜 인증 직후 직접 `/` 접근 시 2단계 화면으로 이동, 새로고침과 로그아웃 후 재접근
- 기존 원고 및 이미지/회차 연결 보존, 서로 다른 계정 간 원고 분리가 아직 없음을 점검

공식 참고:
- https://supabase.com/docs/guides/auth/social-sign-in/auth-google
- https://supabase.com/docs/guides/auth/social-sign-in/auth-kakao
- https://supabase.com/docs/guides/auth/custom-oauth-providers
- https://developers.naver.com/docs/login/api/api.md
- https://supabase.com/docs/guides/auth/auth-captcha
- https://supabase.com/docs/guides/auth/auth-mfa/totp
- https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
