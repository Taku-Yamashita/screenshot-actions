const puppeteer = require('puppeteer')
const path = require("path")

export async function screenshot(url, dest){
    const browser = await puppeteer.launch({
        executablePath: path.normalize("/usr/bin/google-chrome")
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: dest})
    await browser.close()
}