import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { setToken } from '../services/api';

interface IWebSocketContext {
  tokenActivo: boolean;
  token: string | null;
  timeOut: number;
  sendMessage: (id: string) => void;
}

const WebSocketContext = createContext<IWebSocketContext | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokenActivo, setTokenActivo] = useState(false);
  const [token, setTokenState] = useState<string | null>(null);
  const [timeOut, setTimeOut] = useState<number>(0);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('wss://funddemo.onrender.com');

    socket.onopen = () => {
      console.log('WebSocket connected');
      toast.info('Connected to server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message from server:', data);

      if (data.type === 'ready') {
        setToken(data.token);
        setTimeOut(data.expiresIn);
        toast.success('Token active ✅');
        setTokenActivo(true);
      } else if (data.type === 'expired') {
        setTokenActivo(false);
        toast.warning('Token expired ⏰');
      } else if (data.type === 'error') {
        toast.error(`Error: ${data.message}`);
      }
    };

    socket.onclose = () => console.log('WebSocket disconnected');

    setWs(socket);
    return () => socket.close();
  }, []);

  const sendMessage = (id: string) => {
    if (ws && id) {
      ws.send(JSON.stringify({ clientId: id }));
      setTokenActivo(true);
    }
  };

  return (
    <WebSocketContext.Provider value={{ tokenActivo, token, timeOut, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};


export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket debe usarse dentro de WebSocketProvider');
  }
  return context;
};
