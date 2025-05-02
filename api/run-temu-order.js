const puppeteer = require('puppeteer');

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://www.temu.com/');
    await browser.close();
    res.status(200).json({ message: 'Temu order script ran successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error running Temu order script.' });
  }
}
