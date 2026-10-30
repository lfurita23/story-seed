# Story Seed 이메일 인증 연결

현재 로그인/회원가입/비밀번호 찾기/새 비밀번호 설정 페이지와 로그아웃이 구현되어 있습니다. 아직 Supabase 프로젝트를 연결하지 않았으므로 실제 인증과 이메일 발송은 동작하지 않습니다. 연결 전에는 제출이 비활성화되고 안내가 표시됩니다. 성공을 가장하는 테스트 계정은 없습니다.

1. Supabase에서 프로젝트를 준비하고 Email 인증을 활성화합니다. 가입 시 이메일 확인을 켜고 비밀번호 최소 길이를 8자 이상으로 설정합니다.
2. 프로젝트 URL과 publishable key를 기존 .env.local에 추가합니다. 기존 내용을 지우지 마세요. .env.example의 두 변수 이름을 참고합니다. service_role 키나 secret 키를 사용하지 마세요.
3. Authentication의 URL Configuration에서 Site URL과 Redirect URLs를 설정합니다. 로컬은 http://localhost:3001/ 과 http://localhost:3001/reset-password/ (실제 실행 포트에 맞춰 변경), 배포 주소는 https://lfurita23.github.io/story-seed/ 와 https://lfurita23.github.io/story-seed/reset-password/ 입니다. 인증 확인 이메일은 Site URL로 돌아오게 합니다.
4. 개발 서버를 재시작합니다. 정상/잘못된 비밀번호 로그인, 이메일 인증 전 로그인, 인증 링크, 재설정 메일과 만료 링크, 새 비밀번호 변경, 로그아웃을 실제 계정으로 점검합니다. 메일 발송 제한과 SMTP 설정도 확인하세요.
5. GitHub Pages는 빌드 시 환경 변수가 필요합니다. 이후 배포할 때 GitHub Actions에 두 공개 변수를 전달해야 합니다. 이번 작업에서는 원격 설정과 배포를 변경하지 않았습니다.

계정 인증은 브라우저 저장 원고의 접근 제어나 계정별 동기화를 제공하지 않습니다. 기존 seosa.manual.v2 데이터는 유지되며 로그인/로그아웃 시 삭제하거나 다른 계정 데이터로 옮기지 않습니다. 공용 PC에서는 원고가 다음 사용자에게 보일 수 있으므로 개인 기기와 JSON 백업을 사용하세요. 사용자별 원고 저장/권한은 별도 서버 DB 단계에서 구현해야 합니다. Supabase가 발급한 세션만 SDK가 관리하며 앱에서 비밀번호를 저장하지 않습니다.

원본 문서: https://supabase.com/docs/guides/auth/passwords
