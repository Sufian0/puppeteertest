const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  //commenting this line out for reference.//await page.goto('https://www.amazon.com/s?i=computers-int-ship&rh=n%3A16225007011&fs=true&page=400&qid=1635595729&ref=sr_pg_399')
  await page.goto('https://www.amazon.com/s?i=computers-int-ship&rh=n%3A16225007011&fs=true&page=400&qid=1635595729&ref=sr_pg_399', {
    waitUntiul: "load"
  });

  const is_disabled = await page.$('li.a-disabled.a-last') !== null;
  
console.log(is_disabled)

  await browser.close();
})();