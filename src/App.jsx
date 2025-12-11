import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { AuthProvider } from './context/AuthContext';
import ChatPDFClone from './pages/ChatPDFClone';
import PDFChatPage from './pages/PDFChatPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ChatPDFClone />} />
            <Route path="/chat" element={<PDFChatPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
