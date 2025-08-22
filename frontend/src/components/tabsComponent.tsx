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

  return (
    <div>
     <TimerDisplay />
    <Box sx={{ width: '100%' }} className="tabs-container">
  <Tabs value={value} onChange={handleChange} aria-label="FundDemo Tabs">
    <Tab label="Register Donation" />
    <Tab label="See Donations" />
  </Tabs>
  <Box sx={{ padding: 3 }} className="tab-content">
    {value === 0 && <DonationForm />}
    {value === 1 && <DonationsList />}
  </Box>
</Box>

    </div>
  );
};

export default MyTabsComponent;
