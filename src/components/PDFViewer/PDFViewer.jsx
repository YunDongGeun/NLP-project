import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTheme } from '../../theme';
import './PDFViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
  const theme = useTheme();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
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
          overflow: 'auto',
        }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error('PDF 로딩 오류:', error)}
          loading={
            <div style={{ padding: theme.spacing['2xl'], color: theme.colors.text.secondary }}>
              PDF를 불러오는 중...
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
