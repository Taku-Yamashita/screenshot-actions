const core = require('@actions/core')
const io = require('@actions/io');
const fs = require('fs');
const old = 'images/old.png'
const dest = `images/current.png`
const { screenshot } = require('./page')
const { report } = require('./lighthouse')

async function run() {
  try {
    await io.rmRF(old);
    if(fs.existsSync(dest)) {
      await io.mv(dest, old);
    }
    const url = core.getInput('url')
    core.info(`fetch ${url} screenshot`);
    await screenshot(url, dest);
    await report(url);

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
