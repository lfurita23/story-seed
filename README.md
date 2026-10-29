# Story Seed · 서사(SEOSA)
작품, 회차 원고, 캐릭터와 세계관을 직접 관리하는 Next.js 사이트입니다. AI 생성이나 유료 API를 사용하지 않습니다.

사이트: https://lfurita23.github.io/story-seed/

## Windows에서 실행
Node.js 22 LTS 권장. 프로젝트 폴더에서:

```powershell
npm.cmd ci
npm.cmd run dev
```
http://localhost:3000 접속. 테스트: `node --test tests/store.test.mjs`.

## 저장과 백업
데이터는 현재 브라우저의 localStorage에 저장됩니다. 로그인, 서버 DB, 기기 간 동기화는 없습니다. 공용 PC에서는 사용하지 마세요. 원고는 데이터 백업 메뉴에서 JSON으로 내려받아 별도 보관하세요.

로컬 주소와 배포 주소는 별도 저장 공간입니다. 기존 원고는 로컬 사이트에서 JSON 내보내기 후 배포 사이트에서 병합 가져오기를 사용하세요. 같은 파일을 여러 번 가져오면 복제본이 생깁니다. 저장 키 `seosa.manual.v2`는 유지합니다.

## 배포
master에 push하면 GitHub Actions가 테스트, 정적 빌드, Pages 배포를 수행합니다. 저장소 Settings → Pages → Source는 GitHub Actions로 설정합니다.

로컬에서 배포 빌드를 확인하려면:
```powershell
$env:GITHUB_PAGES = 'true'
npm.cmd run build
Remove-Item Env:GITHUB_PAGES
```
정적 출력은 out 폴더입니다. GitHub Pages에서는 /story-seed 경로로 서비스합니다. 정적 빌드 이후 `next start`는 사용하지 않습니다.

## 공개 범위
사이트 코드와 Git 기록은 공개됩니다. 개인 원고와 JSON 백업, .env 파일은 커밋하지 마세요. 이전 AI API 파일은 공개 코드와 공개 이력에서 제외했습니다. 공개 전 원본 Git 기록과 API 파일은 작업 PC의 .git 폴더에만 별도 보관했습니다.
