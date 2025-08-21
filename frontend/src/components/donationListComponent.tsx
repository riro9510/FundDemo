import React, {useEffect, useState } from 'react';
import { IDonation } from '../models/donations.interface';
import { PALETTE } from '../utils/theme';
import { useRequest } from '../hooks/useRequest';
import { GetRequest } from '@/models/GetRequest';

const DonationsList = ({}) => {
    const [isEncoded, setIsEncoded] = useState(true);
    const {send:sendEncode, error:errorEncode, loading:loagingEncode} = useRequest(() => new GetRequest<IDonation>('/donations/encode/'));
    const {send:sendDecode, error:errorDecode, loading:loagingDecode} = useRequest(() => new GetRequest<IDonation>('/donations/decode/'));
    const toggleEncode = () => setIsEncoded(!isEncoded);
    const [donations, setDonations] = useState<IDonation[]>([]);

    useEffect(() => { 
        const fetchData = async () => {
            const response = isEncoded ? await sendEncode() : await sendDecode();
            setDonations(response!);
        }
        fetchData().catch(console.error);
        },[isEncoded]);

    if (loagingDecode || loagingEncode) {
        return (
            <div style={styles.loaderContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading...</p>
            </div>
        );
        }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button
                    onClick={toggleEncode}
                    style={{
                        ...styles.toggleButton,
                        backgroundColor: isEncoded ? PALETTE.primary : PALETTE.secondary,
                    }}
                >
                    {isEncoded ? 'Encoded' : 'Decoded'}
                </button>
            </div>

            {/* Donations */}
            <div style={styles.donationsList}>
                {donations.map((donation) => (
                    <div key={donation.id} style={styles.donationItem}>
                        <div>
                            <div style={styles.donorInfo}>
                                {donation.donorName} ({donation.donorEmail})
                            </div>
                            <div style={styles.amountInfo}>
                                {isEncoded ? btoa(donation.amount.toString()) : `$${donation.amount.toFixed(2)}`} –{' '}
                                {donation.paymentMethod.replace('_', ' ')}
                            </div>
                            {donation.description && (
                                <div style={styles.description}>
                                    {isEncoded ? btoa(donation.description) : donation.description}
                                </div>
                            )}
                        </div>

                        <div
                            style={{
                                ...styles.status,
                                backgroundColor:
                                    donation.status === 'completed'
                                        ? PALETTE.success
                                        : donation.status === 'failed'
                                        ? PALETTE.error
                                        : '#FBBF24',
                            }}
                        >
                            {donation.status || 'pending'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: PALETTE.background,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    } as React.CSSProperties,
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    } as React.CSSProperties,
    toggleButton: {
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
    } as React.CSSProperties,
    donationsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    } as React.CSSProperties,
    donationItem: {
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    } as React.CSSProperties,
    donorInfo: {
        fontWeight: 'bold',
        color: PALETTE.text,
    } as React.CSSProperties,
    amountInfo: {
        color: PALETTE.text,
        marginTop: '4px',
    } as React.CSSProperties,
    description: {
        fontStyle: 'italic',
        color: '#555',
        marginTop: '2px',
    } as React.CSSProperties,
    status: {
        padding: '5px 10px',
        borderRadius: '6px',
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    } as React.CSSProperties,
    loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f9f9f9",
  } as React.CSSProperties,
  spinner: {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #3498db",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
  } as React.CSSProperties,
  loadingText: {
    marginTop: "16px",
    fontSize: "18px",
    color: "#333",
    fontWeight: 500,
  } as React.CSSProperties,
};

export default DonationsList;
