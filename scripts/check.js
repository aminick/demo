const { name } = require('../package.json');

const blacklist = ['boilerplate-admin-portal'];

const validateAppName = (appName) => {
  return appName && !blacklist.includes(appName);
};

// if not developing boilerplate, and not a valid name of package.json,
// throw exception and terminate process.
if (!validateAppName(name)) {
  console.log(
    '🚫 更改根目录下 package.json 里面的 name 属性，文档：https://www.notion.so/automizely/2cf4c9a5de914470a99d10fd6e5ed083',
  );
  process.exit(1);
}
