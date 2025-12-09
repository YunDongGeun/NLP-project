import { ThemeProvider } from './theme';
import ChatPDFClone from './pages/ChatPDFClone';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ChatPDFClone />
    </ThemeProvider>
  );
}

export default App;
