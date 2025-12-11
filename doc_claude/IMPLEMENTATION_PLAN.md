# PDF 채팅 인터페이스 구현 계획

## 📋 프로젝트 개요

PDF를 업로드한 후 왼쪽에 PDF 뷰어, 오른쪽에 채팅 인터페이스를 표시하는 기능을 구현합니다.

---

## 🎯 목표

1. PDF 업로드 후 새로운 페이지로 라우팅
2. 왼쪽 50%에 PDF 뷰어 표시
3. 오른쪽 50%에 채팅 인터페이스 표시
4. 업로드된 PDF 파일을 채팅 페이지로 전달
5. 반응형 디자인 (모바일에서는 세로 배치)

---

## 🛠 필요한 라이브러리 설치

### 1. React Router (페이지 라우팅)
```bash
npm install react-router-dom
```

### 2. PDF 뷰어 라이브러리
**옵션 A: react-pdf (추천)**
```bash
npm install react-pdf pdfjs-dist
```
- 장점: 가볍고 커스터마이징 가능
- 단점: 기본 UI 제공하지 않음

**옵션 B: @react-pdf-viewer/core**
```bash
npm install @react-pdf-viewer/core @react-pdf-viewer/default-layout pdfjs-dist
```
- 장점: 풍부한 UI (줌, 페이지 네비게이션 등)
- 단점: 패키지 크기가 큼

**권장: react-pdf 사용** (더 가볍고 충분한 기능 제공)

### 3. 상태 관리 (선택 사항)
현재는 React Router의 state를 통해 파일 전달 가능하므로 추가 라이브러리 불필요

---

## 📂 새로운 파일 구조

```
src/
├── pages/
│   ├── ChatPDFClone.jsx          # 기존: 랜딩 페이지 (PDF 업로드)
│   └── PDFChatPage.jsx            # 신규: PDF + 채팅 통합 페이지
├── components/
│   ├── PDFViewer/
│   │   ├── PDFViewer.jsx          # 신규: PDF 뷰어 컴포넌트
│   │   ├── PDFViewer.css
│   │   └── index.js
│   └── ChatInterface/
│       ├── ChatInterface.jsx      # 신규: 채팅 UI 컴포넌트
│       ├── ChatMessage.jsx        # 신규: 개별 메시지 컴포넌트
│       ├── ChatInput.jsx          # 신규: 채팅 입력창 컴포넌트
│       ├── ChatInterface.css
│       └── index.js
├── App.jsx                        # 수정: 라우터 설정 추가
└── main.jsx                       # 기존 유지
```

---

## 🔧 상세 구현 단계

### Step 1: React Router 설정

**파일: src/App.jsx**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPDFClone from './pages/ChatPDFClone';
import PDFChatPage from './pages/PDFChatPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPDFClone />} />
          <Route path="/chat" element={<PDFChatPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

---

### Step 2: 랜딩 페이지 수정 (PDF 업로드 → 채팅 페이지 이동)

**파일: src/pages/ChatPDFClone.jsx**

**수정 사항:**
1. `react-router-dom`의 `useNavigate` 훅 추가
2. `handleFileUpload` 함수 수정하여 파일 업로드 후 `/chat` 페이지로 이동
3. 업로드된 파일을 state로 전달

```jsx
import { useNavigate } from 'react-router-dom';

const ChatPDFClone = () => {
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (file) {
      // 파일을 state로 전달하며 /chat 페이지로 이동
      navigate('/chat', { state: { pdfFile: file } });
    }
  };

  // 나머지 코드는 동일...
};
```

---

### Step 3: PDF 뷰어 컴포넌트 생성

**파일: src/components/PDFViewer/PDFViewer.jsx**

**주요 기능:**
- PDF 파일을 props로 받아 렌더링
- 페이지 네비게이션 (이전/다음)
- 현재 페이지 번호 표시
- 줌 기능 (선택 사항)

**기본 구조:**
```jsx
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// PDF.js worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-viewer">
      <div className="pdf-controls">
        <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}>
          이전
        </button>
        <span>
          {pageNumber} / {numPages}
        </span>
        <button onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}>
          다음
        </button>
      </div>

      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PDFViewer;
```

**스타일링 포인트:**
- 높이 100%로 설정하여 부모 컨테이너 채우기
- 스크롤 가능하도록 `overflow-y: auto` 설정
- PDF 컨트롤 버튼 상단 고정 (sticky positioning)

---

### Step 4: 채팅 인터페이스 컴포넌트 생성

#### 4-1. ChatInterface (메인 컨테이너)

**파일: src/components/ChatInterface/ChatInterface.jsx**

**주요 기능:**
- 메시지 목록 표시
- 스크롤 자동 하단으로 이동
- 메시지 전송 처리
- 초기 웰컴 메시지 및 추천 질문 표시

**기본 구조:**
```jsx
import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatInterface = ({ pdfFileName }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: `${pdfFileName} 문서를 분석했습니다. 궁금한 점을 물어보세요!`,
      timestamp: new Date(),
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // TODO: 백엔드 API 호출하여 AI 응답 받기
    // 현재는 임시 응답
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: '죄송합니다. AI 응답 기능은 아직 구현되지 않았습니다.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h3>{pdfFileName}</h3>
      </div>

      <div className="chat-messages">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <SuggestedQuestions onQuestionClick={handleSendMessage} />

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
```

#### 4-2. ChatMessage (개별 메시지)

**파일: src/components/ChatInterface/ChatMessage.jsx**

**메시지 타입:**
- `user`: 사용자 메시지 (오른쪽 정렬, 파란색)
- `assistant`: AI 응답 (왼쪽 정렬, 회색)
- `system`: 시스템 메시지 (중앙 정렬, 작은 글씨)

```jsx
const ChatMessage = ({ message }) => {
  const { type, content, timestamp } = message;

  return (
    <div className={`chat-message chat-message-${type}`}>
      <div className="message-content">
        {content}
      </div>
      <div className="message-timestamp">
        {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};
```

#### 4-3. ChatInput (입력창)

**파일: src/components/ChatInterface/ChatInput.jsx**

**주요 기능:**
- 텍스트 입력
- Enter 키로 전송 (Shift+Enter는 줄바꿈)
- 전송 버튼

```jsx
import { useState } from 'react';
import { Button } from '../Button';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
        rows={1}
      />
      <Button type="submit" variant="primary">
        전송
      </Button>
    </form>
  );
};
```

#### 4-4. SuggestedQuestions (추천 질문)

**파일: src/components/ChatInterface/SuggestedQuestions.jsx**

nextComponent.png에서 보이는 추천 질문 버튼들 구현

```jsx
const SuggestedQuestions = ({ onQuestionClick }) => {
  const questions = [
    "LCS 와같은 타입 기반 RAG 방법들과 통합을 효과적으로 조율해야 할 과제들을 요약해 주세요",
    "두 방법의 이점이나 약점을 각각의 모델별로 정리해 주세요",
    "두 전략의 미래에는 영역이 이상으로 많은 장점들은 공간이 더보이나 공간이 존재할 가능성을 분석해 주세요",
    "정보 평가와 점검보완시 백날 방법과 상반될 결제 요인들은 무엇들인가요",
  ];

  return (
    <div className="suggested-questions">
      {questions.map((question, index) => (
        <button
          key={index}
          className="suggested-question-btn"
          onClick={() => onQuestionClick(question)}
        >
          {question}
        </button>
      ))}
    </div>
  );
};
```

---

### Step 5: 통합 페이지 생성 (PDFChatPage)

**파일: src/pages/PDFChatPage.jsx**

**주요 기능:**
- 좌우 분할 레이아웃 (50% / 50%)
- 왼쪽: PDF 뷰어
- 오른쪽: 채팅 인터페이스
- 업로드된 파일이 없으면 홈으로 리다이렉트

```jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PDFViewer from '../components/PDFViewer';
import ChatInterface from '../components/ChatInterface';
import './PDFChatPage.css';

const PDFChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfFile = location.state?.pdfFile;

  useEffect(() => {
    if (!pdfFile) {
      // 파일이 없으면 홈으로 리다이렉트
      navigate('/');
    }
  }, [pdfFile, navigate]);

  if (!pdfFile) {
    return null;
  }

  return (
    <div className="pdf-chat-page">
      <div className="pdf-section">
        <PDFViewer file={pdfFile} />
      </div>

      <div className="chat-section">
        <ChatInterface pdfFileName={pdfFile.name} />
      </div>
    </div>
  );
};

export default PDFChatPage;
```

**스타일링:**
```css
.pdf-chat-page {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.pdf-section {
  flex: 1;
  border-right: 1px solid #e5e7eb;
  overflow: auto;
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 반응형: 모바일에서는 세로 배치 */
@media (max-width: 768px) {
  .pdf-chat-page {
    flex-direction: column;
  }

  .pdf-section {
    flex: 0 0 50vh;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
}
```

---

## 🎨 스타일링 가이드

### 채팅 인터페이스 스타일

**테마 색상 활용:**
- 사용자 메시지: `theme.colors.primary` (#FF6154)
- AI 메시지: `theme.colors.background.secondary` (#F8F9FA)
- 텍스트: `theme.colors.text.primary` (#1F2937)
- 보더: `theme.colors.border.light` (#E5E7EB)

**레이아웃:**
- 헤더: 고정 높이 (60px)
- 메시지 영역: flex-grow로 남은 공간 채우기
- 입력창: 고정 높이 (80px)

---

## 🚀 구현 순서

1. **Phase 1: 라우팅 설정** (30분)
   - React Router 설치
   - App.jsx에 라우터 설정
   - ChatPDFClone.jsx에서 navigate 추가

2. **Phase 2: PDF 뷰어** (1시간)
   - react-pdf 설치 및 설정
   - PDFViewer 컴포넌트 생성
   - 페이지 네비게이션 구현
   - 스타일링

3. **Phase 3: 채팅 UI** (1.5시간)
   - ChatInterface 컴포넌트 생성
   - ChatMessage 컴포넌트 생성
   - ChatInput 컴포넌트 생성
   - SuggestedQuestions 컴포넌트 생성
   - 메시지 전송/수신 로직 (임시)
   - 스타일링

4. **Phase 4: 통합 페이지** (30분)
   - PDFChatPage 생성
   - 레이아웃 구현
   - 파일 전달 로직 확인
   - 반응형 스타일링

5. **Phase 5: 테스트 및 디버깅** (30분)
   - 파일 업로드 → 페이지 이동 테스트
   - PDF 렌더링 테스트
   - 채팅 입력/표시 테스트
   - 반응형 테스트

**예상 총 소요 시간: 3.5 ~ 4시간**

---

## ⚠️ 예상되는 도전 과제

### 1. PDF.js Worker 설정
**문제:** PDF.js가 worker를 찾지 못하는 오류
**해결:**
```jsx
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
```

### 2. 파일 객체 전달
**문제:** React Router state로 전달한 파일이 새로고침 시 사라짐
**해결:**
- 단기: 파일이 없으면 홈으로 리다이렉트
- 장기: localStorage나 IndexedDB에 파일 저장

### 3. PDF 렌더링 성능
**문제:** 큰 PDF 파일의 경우 렌더링이 느림
**해결:**
- 한 번에 한 페이지만 렌더링
- 가상 스크롤링 구현 (고급)

### 4. 채팅 스크롤
**문제:** 새 메시지 추가 시 자동 스크롤이 안 될 수 있음
**해결:** useEffect + scrollIntoView 사용

### 5. 반응형 레이아웃
**문제:** 작은 화면에서 PDF와 채팅이 모두 보이기 어려움
**해결:**
- 모바일: 세로 배치 또는 탭 전환
- 태블릿: 50/50 유지

---

## 📝 추후 개선 사항

### 1. 백엔드 연동
- PDF 파일 서버 업로드
- AI API 연동 (OpenAI, Anthropic 등)
- 메시지 히스토리 저장

### 2. 고급 PDF 기능
- 텍스트 선택 및 하이라이트
- 페이지 썸네일
- 검색 기능
- 북마크

### 3. 채팅 고급 기능
- 마크다운 렌더링
- 코드 하이라이팅
- 파일 첨부
- 음성 입력

### 4. UX 개선
- 로딩 상태 표시
- 에러 핸들링
- 토스트 알림
- 다크 모드

### 5. 성능 최적화
- 코드 스플리팅
- 이미지 최적화
- 메모이제이션
- 가상 스크롤링

---

## 📦 최종 패키지 목록

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^6.x.x",
    "react-pdf": "^7.x.x",
    "pdfjs-dist": "^3.x.x"
  }
}
```

---

## ✅ 체크리스트

구현 전 확인 사항:
- [ ] Node.js 및 npm 버전 확인
- [ ] 현재 코드 백업 (git commit)
- [ ] 필요한 라이브러리 설치
- [ ] 테마 색상 및 스타일 가이드 검토

구현 후 확인 사항:
- [ ] 파일 업로드 후 페이지 이동 동작 확인
- [ ] PDF 렌더링 정상 작동 확인
- [ ] 채팅 입력 및 메시지 표시 확인
- [ ] 반응형 레이아웃 확인 (데스크톱, 태블릿, 모바일)
- [ ] 콘솔 에러 없음 확인
- [ ] git commit으로 변경사항 저장

---

## 🤝 협업 가이드

구현 중 질문이나 문제가 생기면:
1. 구현 중인 Phase 번호 명시
2. 발생한 오류 메시지 전달
3. 시도한 해결 방법 공유

---

**작성일:** 2025-12-09
**프로젝트:** NLP-Project (ChatPDF Clone)
**작성자:** Claude Code
