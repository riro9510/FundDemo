import {CtaComponent, MyTabsComponent} from '../components';
import React, {useEffect, useState} from 'react';
import { setToken } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';

const IndexPage = () => {
    const [tokenActivo, setTokenActivo] = useState(false);
    const [key, setKey] = useState(0);
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
                setTokenActivo(true);
                setToken(data.token);
                toast.success('Token active ✅');
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


    useEffect(() => {
        if(!tokenActivo) {
            setKey(prevKey => prevKey + 1); 
        }
    }, [tokenActivo]);

    return (
  <div>
    {tokenActivo ? (
      <MyTabsComponent />
    ) : (
      <CtaComponent ctaStatus={(id: any) => sendMessage(id)} key={key} />
    )}
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
  </div>
);

 }
 export default IndexPage;