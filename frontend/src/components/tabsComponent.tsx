import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import DonationForm from '../components/captureDonationComponent';
import DonationsList from '../components/donationListComponent';
import { TimerDisplay } from './timeOut';
import '../styles/tabs.css';


const MyTabsComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Tabs Component (modificado)
return (
  <div className="tabs-wrapper">
    <TimerDisplay />
    <Box sx={{ width: '100%' }} className="tabs-container">
      <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="FundDemo Tabs"
        variant="fullWidth" // Para móviles: pestañas ocuparán todo el ancho
      >
        <Tab label="Register Donation" />
        <Tab label="See Donations" />
      </Tabs>
      <Box sx={{ padding: 2 }} className="tab-content"> {/* Reducido padding para móviles */}
        {value === 0 && <DonationForm />}
        {value === 1 && <DonationsList />}
      </Box>
    </Box>
  </div>
);
};

export default MyTabsComponent;
