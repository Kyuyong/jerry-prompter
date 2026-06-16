# Jerry Prompter — 세션 인수인계

## 프로젝트 개요
유튜브 촬영용 PWA 프롬프터 앱 (React + Vite + Tailwind + Zustand + vite-plugin-pwa)
배포 URL: https://kyuyong.github.io/jerry-prompter/
GitHub: https://github.com/Kyuyong/jerry-prompter

---

## 완료된 작업

### Phase 1 — 초기 구현 (커밋: 8b2b67e)
- [x] Vite + React + Tailwind + Zustand + vite-plugin-pwa 프로젝트 세팅
- [x] EditorPage: 스크립트 작성/저장/삭제/선택 (localStorage 자동 저장)
- [x] PrompterPage: 풀스크린 + rAF 자동 스크롤
- [x] ControlBar: 재생/정지, 속도 +/-, 설정 버튼
- [x] SettingsPanel: 글자 크기/마진/줄간격/속도/색상/반전
- [x] ProgressBar: 상단 진행률 표시
- [x] useWakeLock: 화면 꺼짐 방지
- [x] useRemote: 블루투스 리모콘 키 매핑 (Space/Enter/화살표/Home/End)
- [x] PWA 아이콘(SVG), manifest, 서비스워커 설정
- [x] GitHub Pages 배포 설정 (base: '/jerry-prompter/', homepage 필드)
- [x] git 초기화 + remote 연결 (https://github.com/Kyuyong/jerry-prompter)

### Phase 2 — 갤럭시 피드백 수정 (커밋: 7141785)
- [x] 갤럭시 하단 내비게이션 바에 ControlBar 가려지는 문제 수정
  - `viewport-fit=cover` 추가 (index.html)
  - `env(safe-area-inset-bottom/top)` 인라인 스타일 적용 (ControlBar, SettingsPanel, EditorPage)
- [x] 스크롤 속도 개선
  - 공식: `speed * 20px/s` → `speed * 8px/s`
  - 단계: 1 단위 → 0.5 단위 (min 0.5, max 10)
  - 기본값: 3 → 2
- [x] SettingsPanel에 블루투스 리모콘 키 매핑 참고표 추가
- [x] PWA 새 버전 업데이트 알림
  - `registerType: 'autoUpdate'` → `'prompt'`
  - `useRegisterSW` 훅으로 "지금 업데이트 / 나중에" 다이얼로그 추가 (App.jsx)

---

## 현재 브랜치 상태

```
main (HEAD: 7141785)
├── 8b2b67e  feat: Jerry Prompter PWA 초기 구현
└── 7141785  fix: 갤럭시 safe area, 스크롤 속도, PWA 업데이트 알림 개선
```

아직 GitHub에 push 안 됨 — `git push origin main` 필요.

---

## TODO (PRD v2 + 미해결)

### 우선순위 높음
- [ ] **실기기 재테스트** — 갤럭시에서 safe area 패딩이 실제로 적용됐는지 확인
- [ ] **git push** — `git push origin main` 후 `npm run deploy`로 GitHub Pages 배포
- [ ] **PWA 아이콘 교체** — 현재 SVG 아이콘은 일부 기기에서 미지원. 192×192 / 512×512 PNG 파일 필요
  - `public/icons/icon-192.png`, `public/icons/icon-512.png` 추가 후 `vite.config.js` manifest 아이콘 항목 업데이트

### PRD v2 기능
- [ ] **음성 인식 자동 스크롤** — Web Speech API로 현재 읽는 위치 자동 추적
- [ ] **리모콘 키 커스텀 매핑 UI** — SettingsPanel에서 각 동작에 키를 직접 지정
- [ ] **스크립트 파일 가져오기** — .txt / .md 파일 import (input[type=file])
- [ ] **폰트 선택** — 나눔고딕, 프리텐다드 등 한국어 가독성 좋은 폰트 선택 UI
- [ ] **클라우드 동기화** — Google Drive 연동 (MCP Google Drive 툴 활용 가능)

### 개선 아이디어 (사용자 피드백 기반)
- [ ] 프롬프터 시작 시 카운트다운 (3-2-1) 옵션
- [ ] 스크롤 속도 숫자 표시 위치 개선 (현재 ControlBar 숫자가 작음)

---

## 주요 파일 구조

```
src/
├── App.jsx                  ← UpdatePrompt 포함, 라우팅
├── store/useStore.js        ← Zustand (scripts, settings, isPlaying)
├── pages/
│   ├── EditorPage.jsx       ← 스크립트 편집
│   └── PrompterPage.jsx     ← 풀스크린 프롬프터
├── components/
│   ├── ControlBar.jsx       ← 재생/속도/설정 버튼 (safe area 처리됨)
│   ├── SettingsPanel.jsx    ← 설정 슬라이드업 패널 + BT 키 맵
│   ├── ProgressBar.jsx      ← 상단 진행률 바
│   └── ScriptList.jsx       ← 스크립트 탭 목록
└── hooks/
    ├── useScroll.js         ← rAF 스크롤 (speed * 8 px/s)
    ├── useWakeLock.js       ← 화면 꺼짐 방지
    └── useRemote.js         ← BT 리모콘 키 이벤트
```

## 배포 명령어
```bash
git push origin main          # 소스 push
npm run deploy                # GitHub Pages 배포 (dist → gh-pages 브랜치)
```
