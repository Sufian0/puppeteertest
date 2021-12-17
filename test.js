// this test inputs data into a form and submits it. It then takes the info that
// the form submittal leads to and outputs it to the console.
const puppeteer = require('puppeteer');
const fs = require('fs/promises')

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://learnwebcode.github.io/practice-requests/")

  
  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".info strong"))
    .map(x => x.textContent)
  })
  await fs.writeFile("names2.txt", names.join("\r\n"))

  await page.click("#clickme")
  const clickedData = await page.$eval("#data", el => el.textContent)
  console.log(clickedData)

  const photos = await page.$$eval("img", (imgs) => {
    return imgs.map(x => x.src)
  })

  await page.type("#ourfield", "blue")
  await Promise.all([page.click("#ourform button"), page.waitForNavigation()])
  const info = await page.$eval("#message", el => el.textContent) 
  //el stands for element. if after the arrow function the code is on the same
  //line then the "return" function is implied.

  console.log(info)
  
  for (const photo of photos) {
    const imagepage = await page.goto(photo)
    await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
  }

  await browser.close()
}

start()