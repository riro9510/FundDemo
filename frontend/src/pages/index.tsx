import {CtaComponent, MyTabsComponent} from '../components';
import React, {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeSwitcher } from '@/components/themeSwitcher';
import { useWebSocket } from '../context/useWebSocketToken';

const IndexPage = () => {

  const { tokenActivo, sendMessage } = useWebSocket();

   return (
  <div className="app-container">
    {tokenActivo ? (
      <MyTabsComponent />
    ) : (
      <CtaComponent ctaStatus={(id: any) => sendMessage(id)} />
    )}
    <ThemeSwitcher />
    <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
  </div>
);

 }
 export default IndexPage;