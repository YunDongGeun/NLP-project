import { useState } from 'react';
import { useTheme } from '../theme';
import { Button, Navbar, UploadArea } from '../components';

const ChatPDFClone = () => {
  const theme = useTheme();
  const [uploadedFile, setUploadedFile] = useState(null);

  const navItems = [
    { label: '홈', href: '#home' },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'PDF 업로드',
      description: 'PDF 파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요.'
    },
    {
      step: '2',
      title: '질문하기',
      description: 'PDF 내용에 대해 궁금한 것을 자유롭게 질문하세요.'
    },
    {
      step: '3',
      title: '답변 받기',
      description: 'AI가 PDF를 분석하여 정확한 답변을 제공합니다.'
    }
  ];

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    console.log('File uploaded:', file);
  };

  return (
    <div style={{ backgroundColor: theme.colors.background.secondary, minHeight: '100vh' }}>
      <Navbar
        logoText="NLP Project"
        navItems={navItems}
      />

      {/* Hero Section */}
      <section id="home" style={{
        padding: '6rem 1rem 4rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: theme.typography.fontSize['5xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.lg,
          lineHeight: theme.typography.lineHeight.tight
        }}>
          PDF와 대화하세요
        </h1>
        <p style={{
          fontSize: theme.typography.fontSize.xl,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing['2xl'],
          maxWidth: '700px',
          margin: '0 auto',
          marginBottom: theme.spacing['2xl']
        }}>
          AI 기반 ChatPDF로 모든 PDF 문서와 자연스럽게 대화하고,<br />
          필요한 정보를 빠르게 찾아보세요
        </p>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <UploadArea
            title="PDF 파일을 업로드하세요"
            description="PDF를 드래그 앤 드롭하거나 클릭하여 업로드"
            icon={<span style={{ fontSize: '4rem' }}>📄</span>}
            onFileSelect={handleFileUpload}
            acceptedFileTypes=".pdf"
            maxFileSizeMB={32}
          />
          {uploadedFile && (
            <p style={{
              marginTop: theme.spacing.md,
              color: theme.colors.accent.green,
              fontSize: theme.typography.fontSize.base
            }}>
              ✓ {uploadedFile.name} 업로드 완료!
            </p>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: theme.spacing.md,
          justifyContent: 'center',
          marginTop: theme.spacing['2xl'],
          flexWrap: 'wrap'
        }}>
          <Button variant="primary" size="lg">
            시작하기
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{
        backgroundColor: theme.colors.background.main,
        padding: '6rem 1rem',
        borderTop: `1px solid ${theme.colors.border.light}`,
        borderBottom: `1px solid ${theme.colors.border.light}`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: theme.typography.fontSize['4xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            textAlign: 'center',
            marginBottom: theme.spacing['2xl']
          }}>
            사용 방법
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: theme.spacing['2xl']
          }}>
            {howItWorks.map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: theme.borderRadius.full,
                  backgroundColor: theme.colors.primary.brand,
                  color: theme.colors.text.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  margin: '0 auto',
                  marginBottom: theme.spacing.lg
                }}>
                  {item.step}
                </div>
                <h3 style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.text.secondary,
                  lineHeight: theme.typography.lineHeight.relaxed
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatPDFClone;
