import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme';
import ChatPDFClone from './pages/ChatPDFClone';
import PDFChatPage from './pages/PDFChatPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPDFClone />} />
          <Route path="/chat" element={<PDFChatPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
