const express = require('express');
const cron = require('node-cron');
const axios = require('axios');

const app = express();

// Optional root route to verify the service is running.
app.get('/', (req, res) => {
  res.send("Cleanup Scheduler is running.");
});

// Schedule gallery_dump cleanup every 24 hours at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Gallery dump cleanup triggered at', new Date());
  try {
    // Replace with your actual URL for the PHP script on your hosting environment.
    const response = await axios.get('http://h4k3r.site/app/test/php/cleanup_gallery.php');
    console.log('Gallery dump cleanup response:', response.data);
  } catch (error) {
    console.error('Error during gallery dump cleanup:', error.message);
  }
});

// Schedule zips folder cleanup every 24 hours at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Zips folder cleanup triggered at', new Date());
  try {
    const response = await axios.get('http://h4k3r.site/app/test/php/cleanup_zips.php');
    console.log('Zips folder cleanup response:', response.data);
  } catch (error) {
    console.error('Error during zips folder cleanup:', error.message);
  }
});

// Schedule notifications cleanup every 24 hours at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Notifications cleanup triggered at', new Date());
  try {
    const response = await axios.get('http://h4k3r.site/app/test/php/cleanup_notifications.php');
    console.log('Notifications cleanup response:', response.data);
  } catch (error) {
    console.error('Error during notifications cleanup:', error.message);
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Cleanup Scheduler is running on port ${PORT}`);
});
