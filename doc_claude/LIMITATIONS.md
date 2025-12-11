# 프로젝트 시연 시 발견 가능한 단점 및 제한사항

## 1. 사용자 인증 시스템 부재
- **문제**: 실제 로그인/회원가입 기능이 없고 하드코딩된 2개의 가짜 계정만 존재
- **영향**: 프로덕션 환경에 배포 불가능, 실제 사용자 데이터 관리 불가
- **위치**: [src/context/AuthContext.jsx](src/context/AuthContext.jsx)

## 2. 세션 관리의 보안 취약점
- **문제**: 세션 ID를 localStorage에 평문으로 저장
- **영향**: 브라우저 개발자 도구로 누구나 세션 ID 확인 및 조작 가능
- **위치**: [src/utils/sessionStorage.js](src/utils/sessionStorage.js)
- **보안 리스크**: XSS 공격 시 모든 세션 정보 탈취 가능

## 3. PDF 삭제 기능의 불완전성
- **문제**: PDF를 삭제해도 localStorage에서만 제거되고 서버에는 여전히 존재
- **영향**: 서버 스토리지 낭비, 삭제된 PDF에 세션 ID로 여전히 접근 가능
- **위치**: [src/components/PDFListSidebar/PDFListSidebar.jsx](src/components/PDFListSidebar/PDFListSidebar.jsx)
- **시연 시**: "삭제한 PDF가 서버에서 사라지나요?"라는 질문에 답변 불가

## 4. 에러 처리 부족
- **문제**: 네트워크 에러, 타임아웃, 서버 500 에러 등에 대한 구체적인 처리 없음
- **영향**: 서버 장애 시 사용자에게 모호한 에러 메시지만 표시
- **위치**:
  - [src/pages/ChatPDFClone.jsx:61-62](src/pages/ChatPDFClone.jsx#L61-L62)
  - [src/components/ChatInterface/ChatInterface.jsx:62](src/components/ChatInterface/ChatInterface.jsx#L62)
- **시연 시**: 서버가 다운되면 앱이 graceful하게 처리하지 못함

## 5. 파일 크기 제한 검증 미흡
- **문제**: UploadArea 컴포넌트에서 32MB 제한을 설정했지만 서버 측 제한과 일치 여부 불명확
- **영향**: 클라이언트에서 통과해도 서버에서 거부될 수 있음
- **위치**: [src/pages/ChatPDFClone.jsx:193](src/pages/ChatPDFClone.jsx#L193)

## 6. PDF 뷰어의 제한적 기능
- **문제**: 텍스트 선택, 복사, 검색 기능 없음 (TextLayer 비활성화)
- **영향**: 사용자가 PDF 내용을 직접 복사하거나 검색할 수 없음
- **위치**: [src/components/PDFViewer/PDFViewer.jsx:204](src/components/PDFViewer/PDFViewer.jsx#L204)
- **이유**: TextLayer CSS 충돌 문제로 비활성화

## 7. 채팅 히스토리 미저장
- **문제**: 페이지를 새로고침하거나 다른 PDF로 이동하면 채팅 내역 모두 소실
- **영향**: 사용자가 이전 대화 내용을 다시 볼 수 없음
- **위치**: [src/components/ChatInterface/ChatInterface.jsx:11-18](src/components/ChatInterface/ChatInterface.jsx#L11-L18)
- **시연 시**: "이전 질문을 다시 보고 싶어요"에 대응 불가

## 8. 반응형 디자인 미흡
- **문제**: 모바일/태블릿 화면에 대한 최적화 부족
- **영향**:
  - PDF 뷰어와 채팅창의 고정 레이아웃이 작은 화면에서 깨짐
  - 사이드바가 화면 대부분을 가림
- **위치**:
  - [src/pages/PDFChatPage.css](src/pages/PDFChatPage.css)
  - [src/components/PDFListSidebar/PDFListSidebar.jsx:22-27](src/components/PDFListSidebar/PDFListSidebar.jsx#L22-L27)

## 9. 동시 업로드 처리 불가
- **문제**: 여러 PDF를 동시에 업로드할 수 없음
- **영향**: 사용자가 여러 문서를 분석하려면 하나씩 순차적으로 업로드 필요
- **위치**: [src/pages/ChatPDFClone.jsx:42-68](src/pages/ChatPDFClone.jsx#L42-L68)

## 10. 로딩 상태 UX 개선 필요
- **문제**:
  - PDF 업로드 중 진행률 표시 없음 (단순 "업로드 중..." 텍스트만)
  - AI 응답 대기 중 타이핑 애니메이션 없음
- **영향**: 큰 PDF 업로드 시 사용자가 멈춘 것으로 착각 가능
- **위치**:
  - [src/pages/ChatPDFClone.jsx:189](src/pages/ChatPDFClone.jsx#L189)
  - [src/components/ChatInterface/ChatInterface.jsx:123-134](src/components/ChatInterface/ChatInterface.jsx#L123-L134)

## 11. 보너스: API 키/인증 없음
- **문제**: 서버 API가 인증 없이 누구나 접근 가능한 것으로 보임
- **영향**: 악의적인 사용자가 무제한으로 API 호출 가능
- **위치**: [src/api/pdfApi.js](src/api/pdfApi.js)

## 12. 보너스: 브라우저 호환성 검증 부재
- **문제**: PDF.js worker URL이 최신 브라우저에서만 동작할 수 있음
- **영향**: 구형 브라우저 사용자가 PDF를 볼 수 없을 수 있음
- **위치**: [src/components/PDFViewer/PDFViewer.jsx:7-10](src/components/PDFViewer/PDFViewer.jsx#L7-L10)

---

## 개선 우선순위

### 높음 (시연에 직접 영향)
- 에러 처리 개선 (4번)
- 채팅 히스토리 저장 (7번)
- 로딩 상태 UX (10번)

### 중간 (품질 문제)
- PDF 뷰어 기능 개선 (6번)
- 반응형 디자인 (8번)
- PDF 삭제 기능 완성 (3번)

### 낮음 (프로토타입 단계에서 허용 가능)
- 사용자 인증 시스템 (1번)
- 세션 보안 (2번)
- API 인증 (11번)
