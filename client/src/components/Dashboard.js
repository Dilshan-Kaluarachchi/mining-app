import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [miningStats, setMiningStats] = useState({
    totalHashRate: 0,
    activeMiners: 0,
    miningRevenue: 0,
  });
  const [bitcoinPrice, setBitcoinPrice] = useState(0);

  // Fetch mining statistics and Bitcoin price
  useEffect(() => {
    // API call to fetch mining statistics
    fetch("/api/miningStats")
      .then((response) => response.json())
      .then((data) => setMiningStats(data))
      .catch((error) => console.error("Error fetching mining stats", error));

    // API call to fetch Bitcoin price
    fetch("/api/bitcoin")
      .then((response) => response.json())
      .then((data) => setBitcoinPrice(data.bitcoinPrice))
      .catch((error) => console.error("Error fetching Bitcoin data", error));
  }, []);

  return (
    <div>
      <h2>Mining Dashboard</h2>
      <p>Total Hash Rate: {miningStats.totalHashRate} TH/S</p>
      <p>Number of Active Miners: {miningStats.activeMiners}</p>
      <p>Mining Revenue: ${miningStats.miningRevenue}</p>
      <p>Bitcoin Price: ${bitcoinPrice}</p>
    </div>
  );
};

export default Dashboard;
