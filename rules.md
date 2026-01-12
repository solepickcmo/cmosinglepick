# 프로젝트 규칙 (Rules)

> AI가 코드 작성 시 반드시 참고해야 할 규칙들을 정의합니다.

---

## 📁 폴더 구조

```
프로젝트/
├── src/                    # 소스 코드
│   ├── components/         # 재사용 가능한 컴포넌트
│   ├── pages/              # 페이지 컴포넌트
│   ├── styles/             # 스타일 파일
│   ├── utils/              # 유틸리티 함수
│   └── assets/             # 이미지, 폰트 등 정적 자산
├── public/                 # 공개 정적 파일
├── docs/                   # 문서
├── tests/                  # 테스트 파일
└── .agent/                 # AI 워크플로우
    └── workflows/          # 커스텀 워크플로우
```

---

## 🎨 코드 컨벤션

### 일반 규칙
- 들여쓰기: **2 스페이스** 사용
- 파일명: **kebab-case** 사용 (예: `user-profile.js`)
- 변수/함수명: **camelCase** 사용 (예: `getUserData`)
- 상수: **UPPER_SNAKE_CASE** 사용 (예: `MAX_RETRY_COUNT`)
- 클래스/컴포넌트명: **PascalCase** 사용 (예: `UserProfile`)

### HTML
- 시맨틱 태그 사용 권장 (`header`, `nav`, `main`, `section`, `article`, `footer`)
- 접근성을 위해 `alt`, `aria-label` 등 속성 포함
- 클래스명: **BEM 방식** 권장 (예: `block__element--modifier`)

### CSS
- Vanilla CSS 기본 사용 (TailwindCSS는 요청 시에만)
- CSS 변수 활용하여 테마 관리
- 반응형 디자인 필수 (모바일 우선)

### JavaScript
- `const` 우선 사용, 필요시 `let` (var 사용 금지)
- 화살표 함수 권장
- 비동기 처리: `async/await` 사용
- 주석은 한국어로 작성

---

## 📚 라이브러리 사용 규칙

### 허용된 라이브러리
| 분류 | 라이브러리 | 용도 |
|------|------------|------|
| UI | Vanilla JS | 기본 |
| 스타일 | CSS Variables | 테마 관리 |
| 아이콘 | Font Awesome, Lucide | 아이콘 |
| 폰트 | Google Fonts | 타이포그래피 |

### 라이브러리 추가 시
- 사용자 승인 후 추가
- CDN 링크 우선 사용
- npm 패키지는 필요시에만

---

## 🎯 디자인 원칙

1. **Premium Look**: 고급스럽고 현대적인 디자인
2. **Dark Mode**: 다크 모드 지원 필수
3. **Responsive**: 모바일/태블릿/데스크톱 대응
4. **Animation**: 부드러운 마이크로 애니메이션
5. **Accessibility**: 접근성 고려 (색상 대비, 키보드 네비게이션)

---

## 🔧 개발 프로세스

1. **계획**: `implementation_plan.md`에 설계 먼저 작성
2. **구현**: 점진적으로 기능 구현
3. **테스트**: 브라우저에서 직접 확인
4. **기록**: `walkthrough.md`에 변경사항 기록
5. **업데이트**: `task.md` 상태 갱신

---

## ⚠️ 금지 사항

- ❌ 플레이스홀더 이미지 사용 금지 (실제 이미지 생성 또는 사용)
- ❌ 인라인 스타일 과다 사용 금지
- ❌ 하드코딩된 색상값 금지 (CSS 변수 사용)
- ❌ console.log 프로덕션 코드에 남기기 금지
- ❌ 주석 없는 복잡한 로직 금지

---

## 📝 커밋 메시지 규칙

```
[타입] 간단한 설명

- feat: 새로운 기능
- fix: 버그 수정
- style: 스타일 변경
- refactor: 리팩토링
- docs: 문서 수정
```

---

*이 규칙은 프로젝트 진행 중 필요에 따라 업데이트됩니다.*
