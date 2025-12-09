import { useState } from 'react';
import { useTheme } from '../../theme';

const ChatInput = ({ onSend, disabled = false }) => {
  const theme = useTheme();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
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
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: theme.spacing.sm,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background.main,
        borderTop: `1px solid ${theme.colors.border.light}`,
      }}
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
        disabled={disabled}
        rows={1}
        style={{
          flex: 1,
          padding: theme.spacing.sm,
          border: `1px solid ${theme.colors.border.medium}`,
          borderRadius: theme.borderRadius.md,
          fontSize: theme.typography.fontSize.base,
          fontFamily: theme.typography.fontFamily,
          color: theme.colors.text.primary,
          resize: 'none',
          minHeight: '44px',
          maxHeight: '120px',
          overflow: 'auto',
          outline: 'none',
          transition: `border-color ${theme.animations.transition.normal}ms ${theme.animations.easing.default}`,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = theme.colors.primary.brand;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = theme.colors.border.medium;
        }}
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        style={{
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          backgroundColor: theme.colors.primary.brand,
          color: theme.colors.text.white,
          border: 'none',
          borderRadius: theme.borderRadius.md,
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.medium,
          cursor: !input.trim() || disabled ? 'not-allowed' : 'pointer',
          opacity: !input.trim() || disabled ? 0.5 : 1,
          transition: `all ${theme.animations.transition.normal}ms ${theme.animations.easing.default}`,
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          if (input.trim() && !disabled) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = theme.shadows.md;
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        전송
      </button>
    </form>
  );
};

export default ChatInput;
