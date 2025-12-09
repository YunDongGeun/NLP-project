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
