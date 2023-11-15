import { AuthContextProvider } from '@/context/AuthContext.tsx';
import { ThemeProvider } from '@/context/ThemeContext.tsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthContextProvider>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </AuthContextProvider>
  </ThemeProvider>
);
