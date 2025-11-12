import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RecoilRoot } from 'recoil'; // 👈 import 확인

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot> // 👈 App 컴포넌트 감싸기 확인
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);