const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to retrieve mining hardware data
app.get('/api/miningHardware', (req, res) => {
  try {
    const miningHardwareDataPath = path.join(__dirname, 'Data', 'miningHardwareData.json');
    const miningHardwareData = JSON.parse(fs.readFileSync(miningHardwareDataPath, 'utf8'));
    res.json(miningHardwareData);
  } catch (error) {
    console.error('Error reading mining hardware data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to retrieve mining statistics data
app.get('/api/miningStatistics', (req, res) => {
  try {
    const miningStatisticsDataPath = path.join(__dirname, 'Data', 'miningStatistics.json');
    const miningStatisticsData = JSON.parse(fs.readFileSync(miningStatisticsDataPath, 'utf8'));
    res.json(miningStatisticsData);
  } catch (error) {
    console.error('Error reading mining statistics data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
