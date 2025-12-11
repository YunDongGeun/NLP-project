import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../theme';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import { askQuestion } from '../../api/pdfApi';
import './ChatInterface.css';

const ChatInterface = ({ pdfFileName, sessionId, userId }) => {
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

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 서버에 질문 전송
      const response = await askQuestion(text, sessionId);
      console.log('서버 응답:', response);

      const aiMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        requestId: response.request_uuid,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('질문 전송 실패:', error);

      const errorMessage = {
        id: Date.now() + 1,
        type: 'system',
        content: `오류가 발생했습니다: ${error.message || '서버와 통신할 수 없습니다.'}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
