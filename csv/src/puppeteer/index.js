import parse from 'csv-parse';
import fs from 'fs';
import puppeteer from 'puppeteer';

const csv = fs.readFileSync('csv/data.csv');
const records = parse(csv.toString('utf-8'));

const crawler = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://github.com/blan19');
  await page.waitForTimeout(3000);
  await page.close();
  await browser.close();
};

export default crawler;
