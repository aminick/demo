'use strict';

/* eslint no-console: "off" */

const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');
const mime = require('mime-types');

const s3 = new aws.S3();

// no testing or staging for this project
const buckets = {
  testing: 'admin.automizely.dev',
  staging: 'staging-admin.automizely.org',
  production: 'admin.automizely.org',
};

const Bucket = buckets[process.env.APP_ENV];
const buildPath = path.resolve(__dirname, '../build');
const { homepage: deployPath } = require('../package.json');
const { AWS_PROFILE = 'default' } = process.env;

const uploadFile = async (file) => {
  const filePath = path.resolve(buildPath, file);
  const Key = file.replace(buildPath, deployPath).slice(1);
  const options = {
    Bucket,
    Key,
    Body: fs.readFileSync(filePath),
    ContentType: mime.contentType(path.extname(file)),
  };

  await s3.putObject(options).promise();
  console.log(`${filePath} -> https://${Bucket}/${Key}`);
};

function readDirRecursive(folder) {
  const files = fs.readdirSync(folder);
  let list = [];
  for (const file of files) {
    const f = path.resolve(folder, file);
    if (fs.statSync(f).isDirectory()) {
      list = list.concat(readDirRecursive(f));
    } else {
      list.push(f);
    }
  }
  return list;
}

async function main() {
  const files = readDirRecursive(buildPath);
  console.log(
    `\nDeploying: using profile ${AWS_PROFILE} to Bucket: ${Bucket}\n`,
  );
  try {
    await Promise.all(files.map(uploadFile));
    // await clearCloudFrontCache();
    console.log('\n🍻🍻🍻🍻 Upload succeed 🍻🍻🍻🍻');
  } catch (error) {
    console.error('\n💔💔💔💔  Upload failed  💔💔💔💔');
    if (error.code === 'AccessDenied')
      console.error(
        'Please contact sre@aftership.com for getting correct AWS_PROFILE IAM',
      );
    console.error(`${error.message}`);
    process.exit(1);
  }
}

main().catch(console.error);
