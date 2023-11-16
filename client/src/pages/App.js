import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import MiningHardware from './MiningHardware';
import Analysis from './Analysis';
import axios from 'axios';

function App() {
  const [miningStats, setMiningStats] = useState({});
  const [miningHardware, setMiningHardware] = useState([]);

  useEffect(() => {
    // Fetch mining statistics
    axios.get('/api/mining/stats')
      .then(response => setMiningStats(response.data))
      .catch(error => console.error('Error fetching mining stats:', error));

    // Fetch mining hardware
    axios.get('/api/mining/hardware')
      .then(response => setMiningHardware(response.data))
      .catch(error => console.error('Error fetching mining hardware:', error));
  }, []);

  return (
    <div>
      <Dashboard miningStats={miningStats} />
      <MiningHardware miningHardware={miningHardware} setMiningHardware={setMiningHardware} />
      <Analysis />
    </div>
  );
}

export default App;
