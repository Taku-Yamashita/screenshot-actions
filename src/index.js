const core = require('@actions/core')
const io = require('@actions/io');
const moment = require('moment-timezone');
const puppeteer = require('puppeteer')
const path = require("path")

async function run() {
  try {
    await io.rmRF('images/old.png');
    await io.mv('images/current.png', 'images/old.png');
    const url = core.getInput('url')
   //const now = moment().tz("Asia/Tokyo").format('YYYY-MM-DD_HH:mm:ss')
    const dest = `images/current.png`
    core.info(`fetch ${url} screenshot`);
    //core.info(`file name ${now}.png`)

    const browser = await puppeteer.launch({
      executablePath: path.normalize("/usr/bin/google-chrome")
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: dest})
    await browser.close()

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
