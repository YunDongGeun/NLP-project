import { useTheme } from '../../theme';

const ChatMessage = ({ message }) => {
  const theme = useTheme();
  const { type, content, timestamp } = message;

  const messageStyles = {
    user: {
      backgroundColor: theme.colors.primary.brand,
      color: theme.colors.text.white,
      alignSelf: 'flex-end',
      borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 ${theme.borderRadius.lg}`,
    },
    assistant: {
      backgroundColor: theme.colors.background.secondary,
      color: theme.colors.text.primary,
      alignSelf: 'flex-start',
      borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0`,
    },
    system: {
      backgroundColor: theme.colors.background.tertiary,
      color: theme.colors.text.secondary,
      alignSelf: 'center',
      borderRadius: theme.borderRadius.md,
      fontSize: theme.typography.fontSize.sm,
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    },
  };

  if (type === 'system') {
    return (
      <div
        style={{
          ...messageStyles.system,
          textAlign: 'center',
          margin: `${theme.spacing.md} auto`,
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '75%',
        marginBottom: theme.spacing.md,
        ...(type === 'user' ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }),
      }}
    >
      <div
        style={{
          ...messageStyles[type],
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {content}
      </div>
      <div
        style={{
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.text.tertiary,
          marginTop: theme.spacing.xs,
          ...(type === 'user' ? { textAlign: 'right' } : { textAlign: 'left' }),
        }}
      >
        {new Date(timestamp).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  );
};

export default ChatMessage;
