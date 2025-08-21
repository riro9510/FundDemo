import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { PALETTE } from '../utils/theme';

const CtaComponent: React.FC<{ ctaStatus: (id:any) => void }> = ({ ctaStatus }) => {
    const [tokenActivo, setTokenActivo] = useState(false);
   


    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Welcome to Our Service</h2>
            <p style={styles.subtitle}>Click the button to simulate a login.</p>
            <button
                style={{
                    ...styles.button,
                    backgroundColor: tokenActivo ? PALETTE.secondary : PALETTE.primary,
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

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: PALETTE.background,
        padding: '20px',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 700,
        color: PALETTE.text,
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1rem',
        color: PALETTE.text,
        marginBottom: '30px',
        textAlign: 'center',
    },
    button: {
        padding: '15px 40px',
        border: 'none',
        borderRadius: '10px',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 600,
        transition: 'background-color 0.3s ease',
    },
};

export default CtaComponent;
