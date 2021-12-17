const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp"
  });

  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/s?rh=n%3A16225007011&fs=true&ref=1p_16225007011_sar');

  
  const productHandles = await page.$$('div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item');
  
  for (const producthandle of productHandles){
    try{
      const title = await page.evaluate(
        (el) => el.querySelector("h2 > a > span").textContent, 
        producthandle
        );

      const price = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent, 
        producthandle
        );
      
      console.log(price);
    } catch (error) {}
  }

  //await browser.close();
 })(); 
