import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PDFViewer from "../components/PDFViewer";
import ChatInterface from "../components/ChatInterface";
import { Navbar } from "../components";
import { getPDFViewerUrl } from "../api/pdfApi";
import "./PDFChatPage.css";

const PDFChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfFile = location.state?.pdfFile;
  const sessionId = location.state?.sessionId;
  const userId = location.state?.userId;

  useEffect(() => {
    if (!sessionId) {
      // 세션 ID가 없으면 홈으로 리다이렉트
      navigate("/");
    }
  }, [sessionId, navigate]);

  if (!sessionId) {
    return null;
  }

  // 서버에서 PDF URL 생성
  const pdfUrl = getPDFViewerUrl(sessionId);

  const navItems = [{ label: "홈", href: "/", onClick: () => navigate("/") }];

  return (
    <div className="pdf-chat-page">

      <div className="pdf-section">
        <Navbar logoText="NLP Project" navItems={navItems} />
        <PDFViewer
          file={pdfUrl}
          sessionId={sessionId}
          fileName={pdfFile?.name}
        />
      </div>

      <div className="chat-section">
        <ChatInterface
          pdfFileName={pdfFile?.name}
          sessionId={sessionId}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default PDFChatPage;
