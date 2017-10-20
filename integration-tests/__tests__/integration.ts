import puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

const ignore = [/__.*/, /\..+/];
const libraries = fs.readdirSync(path.resolve('src/snippets'))
  .filter(file => !ignore.some(expr => expr.test(file)));
const rootSelector = '#root';

libraries
  .forEach(library => {
    let browser = puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

    afterAll(() => {
      browser.close();
    });

    /*
     * Credit to Ives van Hoorne
     * https://github.com/CompuIves/codesandbox-client/blob/c9f9d9268ac45cb3ad7e3394dd1aa0995c6a323c/integration-tests/tests/sandboxes.test.js
     */
    describe('CSS in JS Playground', () => {
      test.concurrent(`displays '${library}' in the playground`, async () => {
        browser = await browser;
        const page = await browser.newPage();
        await page.goto(`http://localhost:8000/?library=${library}`);

        await page.waitForSelector(rootSelector);
        await page.waitFor(2000);
        const screenshot = await page.screenshot();

        (expect as any)(screenshot).toMatchImageSnapshot({
          customDiffConfig: {
            threshold: 0.03
          },
          customSnapshotIdentifier: library,
        });
      }, 1000 * 60 * 10); // 10 minutes
    });
  });
