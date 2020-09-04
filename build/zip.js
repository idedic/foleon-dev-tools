const path = require('path');
const fs = require('fs');
const zipper = require('zip-local');
const { ncp } = require('ncp');
const packageJson = require('../package.json');

ncp.limit = 16;

const fromDir = path.resolve('./extension');
const toDir = path.resolve('./foleon-dev-tools');

const copyTemp = () => {
  return new Promise((resolve, reject) => {
    ncp(fromDir, toDir, (err) => {
      if (err) {
        console.error('Error copy temp folder', err);
        return reject();
      }
      console.log('Done copy temp folder.');
      return resolve();
    });
  });
};

const zipDir = () => {
  const distZipDir = './distzip';
  if (!fs.existsSync(toDir)) {
    fs.mkdirSync(toDir);
  }
  zipper.sync.zip(toDir).compress().save(`${distZipDir}/foleon-dev-tools-v${packageJson.version}.zip`);
  console.log('Folder zipped.');
};

const removeTemp = () => {
  fs.rmdirSync(toDir, { recursive: true });
  console.log('Temp folder deleted.');
};

const start = async () => {
  await copyTemp();

  zipDir();

  removeTemp();

  console.log('Finished.');
};

start();
