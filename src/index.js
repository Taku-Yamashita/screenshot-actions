const core = require('@actions/core')
const io = require('@actions/io');
const moment = require('moment-timezone');
const puppeteer = require('puppeteer')
const path = require("path")
const fs = require('fs');
const old = 'images/old.png'
const dest = `images/current.png`

async function run() {
  try {
    await io.rmRF(old);
    if(fs.existsSync(dest)) {
      await io.mv(dest, old);
    }
    const url = core.getInput('url')
   //const now = moment().tz("Asia/Tokyo").format('YYYY-MM-DD_HH:mm:ss')
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
