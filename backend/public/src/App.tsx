import React from 'react';
import IndexPage from './pages';
import { WebSocketProvider } from './context/useWebSocketToken.tsx';

export default function App() {
    return (
    <WebSocketProvider>
      <IndexPage />
    </WebSocketProvider>
  );

}
