require('dotenv').config()
const puppeteer = require('puppeteer');

const Guest = async () => {
  const MAX_CLIENTS = process.env.MAX_CLIENTS
  const URL = process.env.GUEST_URL

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: [
      "--proxy-server='direct://'",
      '--proxy-bypass-list=*',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      // '--single-process',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list',
      '--enable-features=NetworkService'
    ]
  });
  for (let i = 0; i < MAX_CLIENTS; i++) {
      try{
        const page = await browser.newPage();
        await page.goto(URL);
        await page.setViewport({ width: 320, height: 568 });
        //iphone 5se
        setTimeout(async ()=>{
          await page.evaluate(() => {
            document.querySelector('#joinButton').click();
          });
        },1000)
        console.log(`created page : ${i+1}`)
      }catch(e){
          console.error(e.message)
      }

  }
};

module.exports = Guest;