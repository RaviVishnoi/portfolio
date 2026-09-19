import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    const htmlPath = path.join(__dirname, 'cv-template.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const outputPath = path.join(__dirname, '../public/Ravi_Vishnoi_CV.pdf');
    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: { top: '30px', right: '30px', bottom: '30px', left: '30px' }
    });
    
    await browser.close();
    console.log('Successfully generated CV at ' + outputPath);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
})();
