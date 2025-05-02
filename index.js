
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.get('/run-temu-order', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://www.temu.com/');
    await browser.close();
    res.send('Temu order script ran successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error running Temu order script.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
