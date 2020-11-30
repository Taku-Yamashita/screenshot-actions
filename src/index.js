const core = require('@actions/core')

const io = require('@actions/io');
const fs = require('fs');
const old = 'images/old.png'
const dest = `images/current.png`
const { screenshot } = require('./page')
const lighthouse = require('lighthouse');
//const chromeLauncher = require('chrome-launcher');

async function run() {
  try {
    core.info(`start`);
    const url = core.getInput('url')
    await io.rmRF(old);
    if(fs.existsSync(dest)) {
      await io.mv(dest, old);
    }
    core.info(`fetch ${url} screenshot`);
    await screenshot(url, dest);
    //await report(url);
    //const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance']};
    const runnerResult = await lighthouse(url, options);
    const reportHtml = runnerResult.report;
    fs.writeFileSync('lighthouse/report.html', reportHtml);

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
