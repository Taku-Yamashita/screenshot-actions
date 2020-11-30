const core = require('@actions/core')
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

export async function report(url) {
    core.info(`fetch ${url} score`);
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
    const runnerResult = await lighthouse(url, options);

    // `.report` is the HTML report as a string
    const reportHtml = runnerResult.report;
    fs.writeFileSync('lighthouse/report.html', reportHtml);

    // `.lhr` is the Lighthouse Result as a JS object
    core.info('Report is done for', runnerResult.lhr.finalUrl);
    core.info('Performance score was', runnerResult.lhr.categories.performance.score * 100);

    await chrome.kill();
}