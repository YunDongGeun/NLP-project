import { useTheme } from '../../theme';

const SuggestedQuestions = ({ onQuestionClick }) => {
  const theme = useTheme();

  const questions = [
    "이 논문의 주요 내용을 요약해주세요",
    "연구 방법론에 대해 설명해주세요",
    "실험 결과는 어떻게 나왔나요?",
    "이 논문의 한계점은 무엇인가요?",
  ];

  return (
    <div
      style={{
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background.secondary,
        borderTop: `1px solid ${theme.colors.border.light}`,
      }}
    >
      <div
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.sm,
          fontWeight: theme.typography.fontWeight.medium,
        }}
      >
        추천 질문
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: theme.spacing.sm,
        }}
      >
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            style={{
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              backgroundColor: theme.colors.background.main,
              color: theme.colors.text.primary,
              border: `1px solid ${theme.colors.border.light}`,
              borderRadius: theme.borderRadius.md,
              fontSize: theme.typography.fontSize.sm,
              textAlign: 'left',
              cursor: 'pointer',
              transition: `all ${theme.animations.transition.normal}ms ${theme.animations.easing.default}`,
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.background.tertiary;
              e.target.style.borderColor = theme.colors.primary.brand;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme.colors.background.main;
              e.target.style.borderColor = theme.colors.border.light;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
