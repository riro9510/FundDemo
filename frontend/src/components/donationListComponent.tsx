import React, {useEffect, useState } from 'react';
import { IDonation } from '../models/donations.interface';
import { PALETTE } from '../utils/theme';
import { useRequest } from '../hooks/useRequest';
import { GetRequest } from '@/models/GetRequest';
import '../styles/donationList.css';
import { useWebSocket } from '../context/useWebSocketToken';

const DonationsList = ({}) => {
    const [isEncoded, setIsEncoded] = useState(true);
    const {send:sendEncode, error:errorEncode, loading:loagingEncode} = useRequest(() => new GetRequest<IDonation>('/donations/encode/'));
    const {send:sendDecode, error:errorDecode, loading:loagingDecode} = useRequest(() => new GetRequest<IDonation>('/donations/decode/'));
    const toggleEncode = () => setIsEncoded(!isEncoded);
    const [donations, setDonations] = useState<IDonation[]>([]);
    const { renewToken } = useWebSocket();
    function splitStringEveryNChars(str:string, n:number) {
    return str.match(new RegExp(`.{1,${n}}`, 'g'));
    }

    useEffect(() => { 
        const fetchData = async () => {
            const response = isEncoded ? await sendEncode() : await sendDecode();
            console.log('Response donation List:', response.data);
            if (!response.data) return;
            const donationsNormalized = response.data.map((d: { amount: any; }) => ({
            ...d,
            amount: Number(d.amount)
            }));
            setDonations(donationsNormalized);
        }
        fetchData().catch((err) => {
            if (err.includes(401)) {
                renewToken();
            }
        });
        },[isEncoded]);

   if (loagingDecode || loagingEncode) {
    return (
        <div className="loaderContainer">
            <div className="spinner"></div>
            <p className="loadingText">Loading...</p>
        </div>
    );
}

return (
    <div className="container">
        <div className="header">
            <button
                onClick={toggleEncode}
                className={`toggleButton ${isEncoded ? 'encoded' : 'decoded'}`}
            >
                {!isEncoded ? 'Show encoded list' : 'Show decoded list'}
            </button>
        </div>

        <div className="donationsList">
            {donations.map((donation) => (
                <div key={donation.id} className="donationItem">
                    <div>
                         {!isEncoded ? (
          <div className="donorInfo">
            {donation.donorName} ({donation.donorEmail})
          </div>
        ) : (
          <>
            {splitStringEveryNChars(donation.donorName, 25)?.map((part, index) => (
              <div key={`name-${index}`} className="donorInfo">
                {part}
              </div>
            ))}
            {splitStringEveryNChars(donation.donorEmail, 25)?.map((part, index) => (
              <div key={`email-${index}`} className="donorInfo">
                {part}
              </div>
            ))}
          </>
        )}
                        <div className="amountInfo">
                            {isEncoded
                                ? btoa(donation.amount.toString())
                                : `$${donation.amount.toFixed(2)}`} –{' '}
                            {donation.paymentMethod.replace('_', ' ')}
                        </div>
                        {donation.description && (
                            <div className="description">
                                {isEncoded ? btoa(donation.description) : donation.description}
                            </div>
                        )}
                    </div>

                    <div
                        className={`status ${
                            donation.status === 'completed'
                                ? 'completed'
                                : donation.status === 'failed'
                                ? 'failed'
                                : 'pending'
                        }`}
                    >
                        {donation.status || 'pending'}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

};

export default DonationsList;
