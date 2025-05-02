
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
app.use(express.json());

app.post('/run-temu-order', async (req, res) => {
    const { productLinks } = req.body;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://www.temu.com', { waitUntil: 'networkidle2' });

        for (const link of productLinks) {
            await page.goto(link, { waitUntil: 'networkidle2' });
            const addToCartButton = await page.$('button[data-testid="add-to-cart"]');
            if (addToCartButton) {
                await addToCartButton.click();
                await page.waitForTimeout(2000);
            }
        }

        await browser.close();
        res.status(200).send('Products added to Temu cart successfully!');
    } catch (error) {
        console.error(error);
        await browser.close();
        res.status(500).send('Error adding products to Temu cart.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
