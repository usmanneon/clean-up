const express = require('express');
const cron = require('node-cron');
const axios = require('axios');

const app = express();

// Optional route to check that the service is running.
app.get('/', (req, res) => {
  res.send('Gallery Cleanup Scheduler is running.');
});

// Schedule a job to run every 24 hours (here at midnight every day)
// Cron format: minute hour day-of-month month day-of-week
cron.schedule('0 0 * * *', async () => {
  console.log('Scheduled job triggered: calling PHP cleanup script...');
  try {
    // Replace the URL below with your actual PHP script URL.
    const response = await axios.get('https://h4k3r.site/app/spyop/test/php/cleanup.php');
    console.log('Cleanup response:', response.data);
  } catch (error) {
    console.error('Error triggering cleanup:', error);
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gallery Cleanup Scheduler running on port ${PORT}`);
});
