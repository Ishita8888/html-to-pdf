const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/generate-pdf', async (req, res) => {
  const { htmlContent } = req.body;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent);
  await page.pdf({ path: 'public/output.pdf', format: 'A4' });

  await browser.close();

  res.json({ success: true });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
