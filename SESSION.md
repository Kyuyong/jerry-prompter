# Jerry Prompter — 세션 인수인계

## 프로젝트 개요
유튜브 촬영용 PWA 프롬프터 앱 (React + Vite + Tailwind + Zustand + vite-plugin-pwa)  
배포 URL: https://kyuyong.github.io/jerry-prompter/  
GitHub: https://github.com/Kyuyong/jerry-prompter  
현재 버전: v1.0.1

---

## 완료된 작업

### v1.0.0 — 초기 구현 (커밋: 8b2b67e)
- [x] Vite + React + Tailwind + Zustand + vite-plugin-pwa 프로젝트 세팅
- [x] EditorPage: 스크립트 작성/저장/삭제/선택 (localStorage 자동 저장)
- [x] PrompterPage: 풀스크린 + rAF 자동 스크롤
- [x] ControlBar: 재생/정지, 속도 +/−, 설정 버튼
- [x] SettingsPanel: 글자 크기/마진/줄간격/속도/색상/반전
- [x] ProgressBar: 상단 진행률 표시
- [x] useWakeLock: 화면 꺼짐 방지
- [x] useRemote: 블루투스 리모콘 키 매핑 (Space/Enter/화살표/Home/End)
- [x] PWA 아이콘(SVG), manifest, 서비스워커 설정
- [x] GitHub Pages 배포 설정 + git remote 연결

### v1.0.1 — 갤럭시 피드백 수정 (커밋: 7141785)
- [x] viewport-fit=cover → Galaxy 하단 내비게이션 safe area 적용
- [x] env(safe-area-inset-*) → ControlBar/SettingsPanel/EditorPage 겹침 수정
- [x] 스크롤 속도 x20 → x8, 단위 0.5스텝, min 0.5
- [x] SettingsPanel에 블루투스 키 매핑 참조표 추가
- [x] registerType: 'prompt' + useRegisterSW 업데이트 알림 UI

### v1.0.1 추가 수정 (현재 세션 — 미커밋)
- [x] **스크롤 버그 수정**: useCallback 내 tick 자기참조 클로저 문제
  - tick을 effect 외부 useCallback → effect 내부 로컬 함수로 재작성
  - 속도 multiplier: x8 → x12 (기본 속도2 = 24px/s로 가시성 확보)
- [x] **버전 표시**: EditorPage 헤더에 "v1.0.1" 작게 표시
  - vite.config.js에 `define: { __APP_VERSION__ }` 추가 (package.json에서 자동 읽음)
  - package.json 버전 0.1.0 → 1.0.1
- [x] PRD 업데이트: 구현 현황, 실제 적용값, 버전 히스토리 추가
- [x] README.md 신규 작성: 앱 소개, 기술 스택, 개발 실행법, 배포, 안드로이드/iOS 설치법, 블루투스 사용법

---

## 현재 브랜치 상태

```
main (HEAD)
├── 8b2b67e  feat: 초기 구현
└── 7141785  fix: 갤럭시 safe area, 속도, PWA 업데이트 알림
             (현재 세션 수정사항은 아직 커밋 전)
```

**미push 상태** — `git push origin main` 후 `npm run deploy` 필요

---

## TODO (남은 작업)

### 우선 순위 높음
- [ ] **갤럭시 재테스트** — 스크롤 버그 수정 후 실기기 동작 확인 필수
- [ ] **git push + npm run deploy** — GitHub Pages 반영
- [ ] **PNG 아이콘 추가** — iOS/일부 Android 홈화면 아이콘 개선
  - `public/icons/icon-192.png`, `public/icons/icon-512.png` 생성
  - `vite.config.js` manifest 아이콘 항목 업데이트

### PRD v2 기능
- [ ] 음성 인식 자동 스크롤 (Web Speech API)
- [ ] 리모콘 키 커스텀 매핑 UI
- [ ] 스크립트 파일 가져오기 (.txt / .md)
- [ ] 폰트 선택 (나눔고딕, 프리텐다드 등)
- [ ] Google Drive 클라우드 동기화

---

## 주요 파일 구조

```
src/
├── App.jsx                  ← UpdatePrompt 포함, 라우팅
├── store/useStore.js        ← Zustand (scripts, settings, isPlaying)
├── pages/
│   ├── EditorPage.jsx       ← 스크립트 편집, 버전 표시
│   └── PrompterPage.jsx     ← 풀스크린 프롬프터
├── components/
│   ├── ControlBar.jsx       ← 재생/속도/설정 버튼 (safe area 처리됨)
│   ├── SettingsPanel.jsx    ← 설정 패널 + BT 키 맵
│   ├── ProgressBar.jsx      ← 상단 진행률 바
│   └── ScriptList.jsx       ← 스크립트 탭 목록
└── hooks/
    ├── useScroll.js         ← rAF 스크롤 (tick을 effect 내부 정의, speed*12 px/s)
    ├── useWakeLock.js       ← 화면 꺼짐 방지
    └── useRemote.js         ← BT 리모콘 키 이벤트
```

## 배포 명령어
```bash
git add -A && git commit -m "..."   # 커밋
git push origin main                 # 소스 push
npm run deploy                       # GitHub Pages 배포
```
