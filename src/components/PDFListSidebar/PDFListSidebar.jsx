import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { getUserSessions, removeUserSession } from '../../utils/sessionStorage';

const PDFListSidebar = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [pdfList, setPdfList] = useState([]);

  // 사용자가 변경되거나 사이드바가 열릴 때 PDF 목록 새로고침
  useEffect(() => {
    if (isOpen) {
      loadPDFList();
    }
  }, [isOpen, currentUser]);

  const loadPDFList = () => {
    const sessions = getUserSessions(currentUser.id);
    // 최신순으로 정렬
    const sortedSessions = sessions.sort((a, b) =>
      new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );
    setPdfList(sortedSessions);
  };

  const handlePDFClick = (session) => {
    navigate('/chat', {
      state: {
        pdfFile: { name: session.fileName },
        sessionId: session.sessionId,
        userId: currentUser.id
      }
    });
    onClose();
  };

  const handleDeletePDF = (e, sessionId) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지

    if (window.confirm('이 PDF를 목록에서 삭제하시겠습니까?')) {
      removeUserSession(currentUser.id, sessionId);
      loadPDFList(); // 목록 새로고침
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInDays < 7) return `${diffInDays}일 전`;

    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '350px',
          backgroundColor: theme.colors.background.main,
          boxShadow: theme.shadows.lg,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: theme.spacing.lg,
            borderBottom: `1px solid ${theme.colors.border.light}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                margin: 0,
              }}
            >
              내 PDF 목록
            </h2>
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                margin: `${theme.spacing.xs} 0 0 0`,
              }}
            >
              {currentUser.name} ({pdfList.length}개)
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: theme.typography.fontSize['2xl'],
              color: theme.colors.text.secondary,
              cursor: 'pointer',
              padding: theme.spacing.xs,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* PDF List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: theme.spacing.md,
          }}
        >
          {pdfList.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: theme.spacing['2xl'],
                color: theme.colors.text.tertiary,
              }}
            >
              <p style={{ fontSize: theme.typography.fontSize.lg, marginBottom: theme.spacing.sm }}>
                📄
              </p>
              <p style={{ fontSize: theme.typography.fontSize.base }}>
                업로드된 PDF가 없습니다
              </p>
            </div>
          ) : (
            pdfList.map((session) => (
              <div
                key={session.sessionId}
                onClick={() => handlePDFClick(session)}
                style={{
                  padding: theme.spacing.md,
                  marginBottom: theme.spacing.sm,
                  backgroundColor: theme.colors.background.secondary,
                  borderRadius: theme.borderRadius.md,
                  cursor: 'pointer',
                  transition: `all ${theme.animations.transition.normal}`,
                  border: `1px solid ${theme.colors.border.light}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.background.tertiary;
                  e.currentTarget.style.borderColor = theme.colors.primary.brand;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.background.secondary;
                  e.currentTarget.style.borderColor = theme.colors.border.light;
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.medium,
                        color: theme.colors.text.primary,
                        margin: 0,
                        marginBottom: theme.spacing.xs,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={session.fileName}
                    >
                      {session.fileName}
                    </p>
                    <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: theme.colors.text.secondary,
                        }}
                      >
                        {formatDate(session.uploadedAt)}
                      </span>
                      {session.chunks > 0 && (
                        <span
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.text.tertiary,
                          }}
                        >
                          • {session.chunks} 청크
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeletePDF(e, session.sessionId)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: theme.colors.text.tertiary,
                      cursor: 'pointer',
                      padding: theme.spacing.xs,
                      fontSize: theme.typography.fontSize.sm,
                      marginLeft: theme.spacing.sm,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.colors.accent.yellow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.colors.text.tertiary;
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PDFListSidebar;
