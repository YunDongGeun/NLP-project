import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTheme } from '../../theme';
import './PDFViewer.css';

// PDF.js worker 설정 - 로컬 node_modules 사용 (react-pdf와 호환되는 버전)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const PDFViewer = ({ file, sessionId, fileName }) => {
  const theme = useTheme();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF 로딩 오류:', error);
    setError('PDF를 불러올 수 없습니다. 서버를 확인해주세요.');
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages || 1));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="pdf-viewer-container">
      <div
        className="pdf-controls"
        style={{
          backgroundColor: theme.colors.background.secondary,
          borderBottom: `1px solid ${theme.colors.border.light}`,
          padding: theme.spacing.md,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }}>
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            style={{
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              backgroundColor: theme.colors.primary.brand,
              color: theme.colors.text.white,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer',
              opacity: pageNumber <= 1 ? 0.5 : 1,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            이전
          </button>
          <span
            style={{
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            {pageNumber} / {numPages || '?'}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 1)}
            style={{
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              backgroundColor: theme.colors.primary.brand,
              color: theme.colors.text.white,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              cursor: pageNumber >= (numPages || 1) ? 'not-allowed' : 'pointer',
              opacity: pageNumber >= (numPages || 1) ? 0.5 : 1,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            다음
          </button>
        </div>

        <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }}>
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            style={{
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              backgroundColor: theme.colors.background.tertiary,
              color: theme.colors.text.primary,
              border: `1px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.md,
              cursor: scale <= 0.5 ? 'not-allowed' : 'pointer',
              opacity: scale <= 0.5 ? 0.5 : 1,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            -
          </button>
          <span
            style={{
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={scale >= 2.0}
            style={{
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              backgroundColor: theme.colors.background.tertiary,
              color: theme.colors.text.primary,
              border: `1px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.md,
              cursor: scale >= 2.0 ? 'not-allowed' : 'pointer',
              opacity: scale >= 2.0 ? 0.5 : 1,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            +
          </button>
        </div>
      </div>

      <div
        className="pdf-document-container"
        style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.background.tertiary,
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: error ? 'center' : 'flex-start',
          overflow: 'auto',
        }}
      >
        {error ? (
          <div
            style={{
              padding: theme.spacing['2xl'],
              color: theme.colors.accent.yellow,
              backgroundColor: theme.colors.background.main,
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${theme.colors.border.medium}`,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: theme.typography.fontSize.lg, marginBottom: theme.spacing.md }}>
              ⚠️ {error}
            </p>
            {fileName && (
              <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                파일명: {fileName}
              </p>
            )}
            {sessionId && (
              <p style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary, marginTop: theme.spacing.sm }}>
                세션 ID: {sessionId}
              </p>
            )}
          </div>
        ) : (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div style={{ padding: theme.spacing['2xl'], color: theme.colors.text.secondary }}>
                PDF를 불러오는 중...
              </div>
            }
            options={{
              cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
              cMapPacked: true,
            }}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
