# iii (아이셋) 소개용 홈페이지

서버 비용 없이 배포 가능한 정적 웹사이트입니다.

## 포함 기능
- 브랜드/회사 소개
- 제품 카테고리 소개 (확장 가능)
- 룩북 섹션
- 스마트스토어, 인스타그램, 블로그 연결
- 모바일 반응형 레이아웃
- 관리자 페이지(`admin.html`, 브라우저 로컬 저장 기반)

## 사용 방법
1. `index.html`을 브라우저에서 열면 바로 동작합니다.
2. 하단의 `관리자 페이지` 링크 또는 `admin.html` 직접 접속
3. 비밀번호 `iset2026!` 입력 후 콘텐츠 수정/저장
4. 저장값은 현재 브라우저의 `localStorage`에 보관됩니다.

## 퍼블리싱(무료 배포) 방법

### 1) GitHub Pages (가장 쉬움)
1. 이 폴더를 GitHub 저장소로 push
2. GitHub 저장소 → **Settings → Pages** 이동
3. **Build and deployment**에서 Source를 `Deploy from a branch` 선택
4. Branch를 `main`(또는 `work`) / 폴더는 `/ (root)` 선택 후 Save
5. 1~3분 뒤 배포 URL 접속 (`https://<계정>.github.io/<저장소명>/`)

> 주의: GitHub Pages의 프로젝트 경로 배포 시 `admin.html`은
> `https://<계정>.github.io/<저장소명>/admin.html`로 접속합니다.

### 2) Netlify
1. netlify.com 가입
2. `Add new site` → `Import an existing project` (GitHub 연결)
3. Build command 비우고, Publish directory를 `/` 또는 루트로 설정
4. Deploy 클릭하면 자동 배포

### 3) Cloudflare Pages
1. Cloudflare Pages에서 GitHub 저장소 연결
2. Framework preset: `None`
3. Build command 비움, Output directory: `/`
4. Deploy

## 운영 팁
- 로고는 관리자 페이지의 `로고 URL`에 실제 브랜드 로고 주소를 넣어 교체하세요.
- `제품 카테고리 JSON`과 `룩북 JSON`으로 손쉽게 확장할 수 있습니다.
- 관리자 비밀번호는 `admin.js`의 `ADMIN_PASSWORD` 값을 변경하세요.


### 4) 404가 뜰 때 빠른 체크
1. 저장소 루트에 `index.html`이 있는지 확인
2. GitHub 저장소 → Settings → Pages에서 Source를 **GitHub Actions**로 변경
3. Actions 탭에서 `Deploy static site to GitHub Pages` 워크플로우가 성공했는지 확인
4. 배포 주소는 `https://<계정>.github.io/<저장소명>/` 형식인지 확인

5. 브랜치가 `master`인 경우도 있으니 Pages 워크플로우가 실행된 브랜치를 확인
6. `404.html` fallback이 배포되었는지 확인 (경로 진입 시 자동으로 `index.html`로 이동)


### 9) 지금 화면처럼 `pages-build-deployment`만 보일 때 (스크린샷 케이스)
- 이 화면은 **GitHub 기본 Pages 빌드 워크플로우**만 보이는 상태입니다.
- 보통 원인은 2가지입니다:
  1. Pages Source가 `Deploy from a branch`로 되어 있음
  2. 우리가 만든 `.github/workflows/pages.yml` 파일이 기본 브랜치(`main`)에 아직 없음

해결 순서:
1. **Settings → Pages → Source**를 `GitHub Actions`로 변경
2. `main` 브랜치의 파일 목록에서 `.github/workflows/pages.yml` 존재 확인
3. 없으면 이 PR을 `main`에 머지(또는 `work` 브랜치 내용을 `main`으로 push)
4. 다시 **Actions** 탭으로 이동
5. 왼쪽에 `Deploy static site to GitHub Pages`가 보이면 클릭 후 실행

참고: `pages-build-deployment`만 있는 상태에서도 branch 배포는 되지만, 현재 프로젝트는 Actions 기반 배포를 기준으로 작성되어 있어 Source를 `GitHub Actions`로 맞추는 것이 가장 안전합니다.


### 10) 현재처럼 `main`은 비어 있고 codex 브랜치만 있을 때 (지금 상태)
지금 캡처처럼 `main`은 초기 커밋만 있고, 실제 홈페이지 파일은 `codex/...` 브랜치(PR #2)에 있는 상태입니다.

가장 빠른 복구 순서:
1. GitHub 상단 **Pull requests** 클릭
2. `#2` PR 열기 (브랜치: `codex/create-mobile-responsive-homepage-for-brand`)
3. 아래 **Merge pull request** → **Confirm merge**
4. 머지 후 저장소 **Code** 탭에서 브랜치를 `main`으로 두고 `index.html` 파일이 보이는지 확인
5. **Settings → Pages** 에서 아래 중 하나 선택
   - 간단 배포: `Deploy from a branch` + Branch `main` + `/ (root)`
   - Actions 배포: `GitHub Actions` + Actions 탭에서 `Deploy static site to GitHub Pages` 실행

확인 URL:
- 메인: `https://sichorangc-blip.github.io/hp/`
- 관리자: `https://sichorangc-blip.github.io/hp/admin.html`


## 관리자 모드 개선 (신규)
- 관리자 비밀번호 변경: `admin.html`에서 새 비밀번호를 저장하면 다음 로그인부터 적용됩니다.
- 제품 카테고리/룩북 빠른 추가: JSON 직접 편집 없이 폼으로 항목 추가가 가능합니다.
- 이미지 파일 업로드 지원: 로고/룩북 이미지를 파일로 선택하면 Data URL로 변환해 저장합니다.

### FTP 없이 이미지 올리는 방법
1. **가장 쉬움**: 관리자 페이지에서 바로 파일 업로드 (브라우저 저장)
2. **공유 URL 필요 시**: GitHub 저장소에 이미지 업로드 후 Raw URL 사용
3. **외부 무료 호스팅**: Cloudinary/Imgur 같은 이미지 호스팅의 HTTPS URL 사용

### 인스타 해시태그 룩북 모드
- 관리자 페이지에서 `룩북 모드`를 `인스타 해시태그 링크 모드`로 바꾸고 태그를 입력하면,
  메인 룩북 영역에서 해시태그 카드(`#tag`)가 렌더링됩니다.
- 참고: 인스타그램 정책상 외부 웹사이트에서 해시태그 이미지를 무단 자동 수집하는 방식은 제한될 수 있어,
  본 구현은 안전한 링크 방식으로 제공합니다.

- 버튼형 이미지 업로드: `로고 파일 선택 → 선택 이미지 적용`, `룩북 파일 선택 → 선택 이미지 적용`으로 비개발자도 쉽게 반영 가능
- 해시태그 입력칸 + 버튼: `해시태그 추가`, `해시태그 비우기`, 미리보기 제공
