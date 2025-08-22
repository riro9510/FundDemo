import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { PALETTE } from '../utils/theme';

const CtaComponent: React.FC<{ ctaStatus: (id:any) => void }> = ({ ctaStatus }) => {
    const [tokenActivo, setTokenActivo] = useState(false);
   


    return (
    <div className="cta-container">
      <h2 className="cta-title">Welcome to Our Service</h2>
      <p className="cta-subtitle">Click the button to simulate a login.</p>
      <button
        className="cta-button"
        style={{
          cursor: tokenActivo ? 'not-allowed' : 'pointer',
        }}
        onClick={() => {
          ctaStatus(uuidv4());
          setTokenActivo(true);
        }}
        disabled={tokenActivo}
      >
        {tokenActivo ? 'Token Active' : 'Get Token'}
      </button>
    </div>
  );
};


export default CtaComponent;
