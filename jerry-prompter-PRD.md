# Jerry in OZ Prompter — PRD (Product Requirements Document)

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | Jerry in OZ Prompter |
| 타입 | PWA (Progressive Web App) |
| 목적 | 유튜브 촬영용 개인 프롬프터 앱 (전용 프롬프터 하드웨어 + 스마트폰 연동) |
| 타겟 디바이스 | iPhone / Android (Galaxy) 둘 다 지원 |
| 배포 방식 | GitHub Pages (무료) |
| 개발 도구 | Claude Code CLI + Cursor AI |

---

## 2. 기술 스택

| 항목 | 기술 |
|---|---|
| 프레임워크 | React (Vite 기반) |
| 스타일링 | Tailwind CSS |
| 상태 관리 | Zustand |
| 로컬 저장 | localStorage |
| PWA | Vite PWA Plugin (vite-plugin-pwa) |
| 배포 | GitHub Pages (gh-pages 패키지) |

---

## 3. 프로젝트 구조

```
jerry-prompter/
├── public/
│   ├── manifest.json         # PWA 매니페스트
│   └── icons/                # 앱 아이콘 (192x192, 512x512)
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── store/
│   │   └── useStore.js       # Zustand 전역 상태
│   ├── pages/
│   │   ├── EditorPage.jsx    # 스크립트 작성/관리 화면
│   │   └── PrompterPage.jsx  # 실제 프롬프터 실행 화면
│   ├── components/
│   │   ├── ScriptList.jsx    # 스크립트 목록
│   │   ├── ControlBar.jsx    # 하단 컨트롤 바
│   │   ├── SettingsPanel.jsx # 설정 슬라이더 패널
│   │   └── ProgressBar.jsx   # 진행률 표시바
│   └── hooks/
│       ├── useScroll.js      # 자동 스크롤 로직
│       ├── useWakeLock.js    # 화면 꺼짐 방지
│       └── useRemote.js      # 블루투스 리모콘 키 매핑
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 4. 화면 구성 (2개 페이지)

### 4-1. Editor Page (`/`)
스크립트를 작성하고 관리하는 화면

- 상단: 스크립트 목록 (저장된 스크립트 리스트, 추가/삭제 버튼)
- 중앙: 텍스트 에디터 (textarea, 붙여넣기 가능)
- 하단: 저장 버튼 / 프롬프터 시작 버튼

### 4-2. Prompter Page (`/prompter`)
실제 촬영 시 사용하는 풀스크린 프롬프터 화면

- 상단: 진행률 표시바 (얇은 바, 퍼센트 표시)
- 중앙: 스크롤되는 스크립트 텍스트
- 하단: 컨트롤 바 (재생/정지, 속도, 설정 패널 토글)
- 설정 패널 (슬라이드업): 각종 슬라이더 및 토글

---

## 5. 기능 상세 스펙

### 5-1. 스크립트 관리
- 스크립트 여러 개 저장 (localStorage)
- 스크립트별 제목 + 내용 저장
- 스크립트 추가 / 삭제 / 선택
- 선택한 스크립트가 프롬프터에 로드됨

### 5-2. 자동 스크롤
- 기본값: 자동 스크롤 ON
- requestAnimationFrame 기반 부드러운 스크롤
- 재생/일시정지 토글 버튼
- 스크롤 속도 슬라이더 (1단계 ~ 10단계)
- 스크롤 중 손가락으로 터치하면 일시정지, 손 떼면 재생 재개

### 5-3. 진행률 표시
- 화면 상단 얇은 프로그레스 바
- 현재 스크롤 위치 / 전체 길이 기준 퍼센트 계산
- 숫자 퍼센트도 함께 표시 (선택)

### 5-4. 블루투스 리모콘 키 매핑
블루투스 리모콘은 키보드 입력으로 인식됨 (대부분의 프롬프터 리모콘 공통)

| 키 | 동작 |
|---|---|
| `Space` / `Enter` | 재생 / 일시정지 토글 |
| `ArrowUp` | 스크롤 속도 증가 |
| `ArrowDown` | 스크롤 속도 감소 |
| `ArrowLeft` | 스크롤 위로 (약간) |
| `ArrowRight` | 스크롤 아래로 (약간) |
| `Home` | 맨 위로 이동 |
| `End` | 맨 아래로 이동 |

> ⚠️ 실제 리모콘 키값은 테스트 후 조정 필요. 설정 화면에서 키 재매핑 가능하면 좋음 (v2 고려)

### 5-5. 화면 반전
- 좌우 반전 토글: `transform: scaleX(-1)` 적용
- 상하 반전 토글: `transform: scaleY(-1)` 적용
- 둘 다 동시에 켤 수 있음 (180도 회전 효과)

### 5-6. 색상 설정
- 배경색 선택: 프리셋 버튼 (검정, 흰색, 회색, 남색) + 커스텀 컬러피커
- 텍스트 색 선택: 프리셋 버튼 (흰색, 검정, 노랑, 초록) + 커스텀 컬러피커
- 기본값: 배경 검정 + 텍스트 흰색

### 5-7. 텍스트 설정 슬라이더
| 슬라이더 | 범위 | 기본값 |
|---|---|---|
| 글자 크기 | 16px ~ 80px | 36px |
| 좌우 마진 | 0px ~ 120px | 40px |
| 줄 간격 (line-height) | 1.2 ~ 2.5 | 1.8 |
| 스크롤 속도 | 1 ~ 10 | 3 |

### 5-8. 화면 꺼짐 방지 (Wake Lock)
- 프롬프터 페이지 진입 시 자동으로 Wake Lock 활성화
- 페이지 이탈 시 자동 해제
- Wake Lock API 미지원 브라우저는 무시 (에러 없이 graceful degradation)

---

## 6. PWA 설정

### manifest.json
```json
{
  "name": "Jerry Prompter",
  "short_name": "Prompter",
  "start_url": "/",
  "display": "fullscreen",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

- display: `fullscreen` (주소창 완전히 숨김)
- 오프라인 캐싱: 서비스 워커로 앱 전체 캐싱 (vite-plugin-pwa 자동 처리)

---

## 7. 설정값 저장

모든 설정은 localStorage에 저장되어 앱 재실행 시 유지

```js
// 저장 키 예시
"jerry-prompter-scripts"     // 스크립트 목록 (JSON 배열)
"jerry-prompter-settings"    // 글자 크기, 속도, 색상 등 설정값
```

---

## 8. 개발 순서 (권장)

1. **Phase 1**: Vite + React + Tailwind + PWA 기본 세팅
2. **Phase 2**: Editor Page — 스크립트 작성/저장/관리
3. **Phase 3**: Prompter Page — 텍스트 표시 + 자동 스크롤
4. **Phase 4**: 컨트롤 바 + 설정 패널 (슬라이더, 색상, 반전)
5. **Phase 5**: 블루투스 리모콘 키 매핑
6. **Phase 6**: Wake Lock + PWA 아이콘 + 배포 테스트
7. **Phase 7 (v2)**: 음성 인식 자동 스크롤 추가

---

## 9. GitHub Pages 배포

```bash
# 배포 설정 (vite.config.js)
base: '/jerry-prompter/'   # 레포 이름에 맞게 수정

# 배포 명령
npm run build
npm run deploy   # gh-pages 패키지 사용
```

배포 후 URL: `https://[github아이디].github.io/jerry-prompter/`

---

## 10. v2 예정 기능

- 음성 인식 자동 스크롤 (Web Speech API)
- 리모콘 키 커스텀 매핑 UI
- 스크립트 파일 가져오기 (.txt / .md)
- 폰트 선택 (가독성 좋은 한국어 폰트)
- 클라우드 동기화 (Google Drive 연동)
