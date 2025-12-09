import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../theme';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import './ChatInterface.css';

const ChatInterface = ({ pdfFileName }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: `${pdfFileName} 문서를 분석했습니다. 궁금한 점을 물어보세요!`,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

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

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // TODO: 백엔드 API 호출하여 AI 응답 받기
    // 현재는 임시 응답
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: '죄송합니다. AI 응답 기능은 아직 구현되지 않았습니다. 현재는 프론트엔드 UI만 구현되어 있으며, 백엔드 API와 연동하여 실제 PDF 분석 및 질문-답변 기능을 추가해야 합니다.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      className="chat-interface"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.colors.background.main,
      }}
    >
      {/* Header */}
      <div
        className="chat-header"
        style={{
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background.main,
          borderBottom: `1px solid ${theme.colors.border.light}`,
          flexShrink: 0,
        }}
      >
        <h3
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {pdfFileName}
        </h3>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="chat-messages"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: theme.spacing.md,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div
            style={{
              alignSelf: 'flex-start',
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              backgroundColor: theme.colors.background.secondary,
              borderRadius: theme.borderRadius.lg,
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            답변을 생성하는 중...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <SuggestedQuestions onQuestionClick={handleSendMessage} />

      {/* Input */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatInterface;
