# Jerry in OZ Prompter — PRD (Product Requirements Document)

## 1. 프로젝트 개요

| 항목          | 내용                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| 프로젝트명    | Jerry in OZ Prompter                                                    |
| 타입          | PWA (Progressive Web App)                                               |
| 목적          | 유튜브 촬영용 개인 프롬프터 앱 (전용 프롬프터 하드웨어 + 스마트폰 연동) |
| 타겟 디바이스 | iPhone / Android (Galaxy) 둘 다 지원                                    |
| 배포 방식     | GitHub Pages (무료)                                                     |
| 개발 도구     | Claude Code CLI + Cursor AI                                             |
| 현재 버전     | v1.0.1                                                                  |
| 배포 URL      | https://kyuyong.github.io/jerry-prompter/                               |

---

## 2. 기술 스택

| 항목       | 기술                              |
| ---------- | --------------------------------- |
| 프레임워크 | React 18 (Vite 기반)              |
| 스타일링   | Tailwind CSS v3                   |
| 상태 관리  | Zustand (persist 미들웨어)        |
| 로컬 저장  | localStorage                      |
| PWA        | Vite PWA Plugin (vite-plugin-pwa) |
| 라우팅     | React Router DOM v6 (HashRouter)  |
| 배포       | GitHub Pages (gh-pages 패키지)    |

---

## 3. 프로젝트 구조

```
jerry-prompter/
├── public/
│   └── icons/
│       └── icon.svg              # PWA 아이콘 (SVG)
├── src/
│   ├── main.jsx                  # React 루트 + HashRouter
│   ├── App.jsx                   # 라우팅 + PWA 업데이트 알림
│   ├── index.css                 # Tailwind 기본
│   ├── store/
│   │   └── useStore.js           # Zustand 전역 상태
│   ├── pages/
│   │   ├── EditorPage.jsx        # 스크립트 작성/관리 화면
│   │   └── PrompterPage.jsx      # 실제 프롬프터 실행 화면
│   ├── components/
│   │   ├── ScriptList.jsx        # 스크립트 목록 탭
│   │   ├── ControlBar.jsx        # 하단 컨트롤 바
│   │   ├── SettingsPanel.jsx     # 설정 슬라이드업 패널
│   │   └── ProgressBar.jsx       # 진행률 표시바
│   └── hooks/
│       ├── useScroll.js          # 자동 스크롤 (rAF 기반)
│       ├── useWakeLock.js        # 화면 꺼짐 방지
│       └── useRemote.js          # 블루투스 리모콘 키 매핑
├── index.html
├── vite.config.js                # PWA + 버전 define + base 경로
├── tailwind.config.js
└── package.json
```

---

## 4. 화면 구성 (2개 페이지)

### 4-1. Editor Page (`/#/`)

스크립트를 작성하고 관리하는 화면

- 상단: 앱 타이틀(버전 표시) + 스크립트 목록 탭 (추가/삭제 버튼)
- 중앙: 제목 입력 + 텍스트 에디터 (textarea, 붙여넣기 가능)
- 하단: "▶ 프롬프터 시작" 버튼

### 4-2. Prompter Page (`/#/prompter`)

실제 촬영 시 사용하는 풀스크린 프롬프터 화면

- 상단: 진행률 표시바 (얇은 바, 퍼센트 표시)
- 중앙: 스크롤되는 스크립트 텍스트
- 하단: 컨트롤 바 (← 편집 / 속도 −• + / ▶⏸ / ⚙)
- 설정 패널 (슬라이드업): 각종 슬라이더, 색상 선택, 반전, 블루투스 키 참조표

---

## 5. 기능 상세 스펙

### 5-1. 스크립트 관리 ✅ 구현완료

- 스크립트 여러 개 저장 (localStorage 자동 저장)
- 스크립트별 제목 + 내용 저장
- 스크립트 추가 / 삭제 / 선택
- 선택한 스크립트가 프롬프터에 로드됨

### 5-2. 자동 스크롤 ✅ 구현완료

- 프롬프터 시작 시 자동 스크롤 ON
- `requestAnimationFrame` 기반 부드러운 스크롤 (tick을 effect 내부에 정의, 클로저 안전)
- 재생/일시정지 토글 버튼
- 스크롤 속도: 0.5단계 ~ 10단계 (0.5 스텝), 기본값 2
- 스크롤 중 화면 터치 → 일시정지, 손 떼면 재생 재개

### 5-3. 진행률 표시 ✅ 구현완료

- 화면 상단 얇은 프로그레스 바 (초록색)
- 현재 스크롤 위치 기준 퍼센트 계산
- 우측 상단 숫자 퍼센트 표시

### 5-4. 블루투스 리모콘 키 매핑 ✅ 구현완료

블루투스 리모콘은 키보드 입력으로 인식됨 (대부분의 프롬프터 리모콘 공통)

| 키                | 동작                 |
| ----------------- | -------------------- |
| `Space` / `Enter` | 재생 / 일시정지 토글 |
| `ArrowUp`         | 스크롤 속도 증가     |
| `ArrowDown`       | 스크롤 속도 감소     |
| `ArrowLeft`       | 스크롤 위로 (약간)   |
| `ArrowRight`      | 스크롤 아래로 (약간) |
| `Home`            | 맨 위로 이동         |
| `End`             | 맨 아래로 이동       |

> 키 매핑 참조표는 설정 패널 하단에서 확인 가능  
> v2: 설정 화면에서 키 재매핑 UI 추가 예정

### 5-5. 화면 반전 ✅ 구현완료

- 좌우 반전 토글: `transform: scaleX(-1)` 적용
- 상하 반전 토글: `transform: scaleY(-1)` 적용
- 둘 다 동시에 켤 수 있음 (180도 회전 효과)

### 5-6. 색상 설정 ✅ 구현완료

- 배경색 선택: 프리셋 버튼 (검정, 흰색, 남색, 회색) + 커스텀 컬러피커
- 텍스트 색 선택: 프리셋 버튼 (흰색, 검정, 노랑, 초록) + 커스텀 컬러피커
- 기본값: 배경 검정 + 텍스트 흰색

### 5-7. 텍스트 설정 슬라이더 ✅ 구현완료 (값 일부 조정됨)

| 슬라이더              | 범위          | 기본값 | 비고          |
| --------------------- | ------------- | ------ | ------------- |
| 글자 크기             | 16px ~ 80px   | 36px   |               |
| 좌우 마진             | 0px ~ 120px   | 40px   |               |
| 줄 간격 (line-height) | 1.2 ~ 2.5     | 1.8    | step 0.1      |
| 스크롤 속도           | 0.5 ~ 10      | 2      | step 0.5 변경 |

> 스크롤 공식: `speed × 12 px/s` (예: 속도2 = 24px/s)

### 5-8. 화면 꺼짐 방지 (Wake Lock) ✅ 구현완료

- 프롬프터 페이지 진입 시 자동으로 Wake Lock 활성화
- 페이지 이탈 시 자동 해제
- Wake Lock API 미지원 브라우저는 무시 (graceful degradation)

---

## 6. PWA 설정 ✅ 구현완료

- `vite-plugin-pwa`로 서비스 워커 자동 생성
- `registerType: 'prompt'` — 새 버전 감지 시 사용자에게 업데이트 여부 확인
- `display: fullscreen` — 주소창 완전히 숨김
- `viewport-fit=cover` — Galaxy 등 Android 제스처 내비게이션 safe area 대응
- `env(safe-area-inset-*)` — ControlBar/SettingsPanel/EditorPage 하단 겹침 방지
- 오프라인 캐싱: 서비스 워커로 앱 전체 캐싱

> ⚠️ 현재 아이콘은 SVG 1개. iOS/일부 Android에서 홈화면 아이콘이 표시되려면 PNG 192×512 추가 필요

---

## 7. 설정값 저장 ✅ 구현완료

Zustand `persist` 미들웨어로 localStorage 자동 동기화

```
localStorage key: "jerry-prompter"
저장 항목: scripts (배열), activeScriptId, settings (객체)
미저장: isPlaying (재실행 시 항상 정지 상태로 시작)
```

---

## 8. 개발 순서 진행 현황

| 단계    | 내용                                          | 상태      |
| ------- | --------------------------------------------- | --------- |
| Phase 1 | Vite + React + Tailwind + PWA 기본 세팅       | ✅ 완료   |
| Phase 2 | Editor Page — 스크립트 작성/저장/관리         | ✅ 완료   |
| Phase 3 | Prompter Page — 텍스트 표시 + 자동 스크롤     | ✅ 완료   |
| Phase 4 | 컨트롤 바 + 설정 패널 (슬라이더, 색상, 반전)  | ✅ 완료   |
| Phase 5 | 블루투스 리모콘 키 매핑                       | ✅ 완료   |
| Phase 6 | Wake Lock + PWA 아이콘 + 배포 테스트          | ⚠️ 부분완료 (PNG 아이콘 미완) |
| Phase 7 | 음성 인식 자동 스크롤 (v2)                    | ⏳ 예정   |

---

## 9. GitHub Pages 배포

```bash
# 1. 소스 코드 push
git push origin main

# 2. GitHub Pages 배포 (gh-pages 브랜치 자동 생성)
npm run deploy
```

배포 URL: `https://kyuyong.github.io/jerry-prompter/`  
GitHub: `https://github.com/Kyuyong/jerry-prompter`

> GitHub Pages 설정: Settings → Pages → Branch: gh-pages / (root)

---

## 10. v2 예정 기능

- [ ] 음성 인식 자동 스크롤 (Web Speech API — 읽은 위치 자동 추적)
- [ ] 리모콘 키 커스텀 매핑 UI (설정 패널에서 직접 지정)
- [ ] 스크립트 파일 가져오기 (.txt / .md import)
- [ ] 폰트 선택 (나눔고딕, 프리텐다드 등 한국어 최적화 폰트)
- [ ] 클라우드 동기화 (Google Drive 연동)
- [ ] PNG 아이콘 추가 (192×192, 512×512) — iOS 홈화면 아이콘 개선

---

## 11. 버전 히스토리

| 버전   | 날짜       | 주요 변경 사항                                    |
| ------ | ---------- | -------------------------------------------------- |
| v1.0.0 | 2026-06-17 | 초기 구현 (전체 기능 Phase 1~6)                   |
| v1.0.1 | 2026-06-17 | Galaxy safe area 수정, 스크롤 버그 수정, 속도 개선, PWA 업데이트 알림 추가, 버전 표시 추가 |
