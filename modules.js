const os = require('os');
const path = require('path');
const { readFileSync, writeFileSync, readFile, writeFile } = require('fs');

/* ------------------ OS MODULE ------------------ */
//info about current user
console.log(os.userInfo());
//method returns the system uptime in seconds
console.log(`The system uptime is ${os.uptime()} seconds`);
//methods return os info
const currenOs = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currenOs);

/* ------------------ PATH & FS MODULE ------------------ */
//info about path
console.log(path.sep);
//path methods
const filePath = path.join('exempleFolder', 'exempleFile.txt');
console.log(filePath);
const base = path.basename(filePath);
console.log(base);
const absolute = path.resolve(__dirname, 'exempleFolder', 'exempleFile.txt');
console.log(absolute);

//sync
const first = readFileSync('./exempleFolder/exempleFile.txt', 'utf8');
console.log(first);
writeFileSync(
  './exempleFolder/resultFile.txt',
  `Append, not override: ${first}`,
  {
    flag: 'a',
  }
);
//async
readFile('./exempleFolder/exempleFile.txt', 'utf8', (err, result) => {
  if (err) {
    return console.error(err);
  }
  const firstText = result;
  writeFile(
    './exempleFolder/resultFile.txt',
    `Text written async: ${firstText}`,
    {
      flag: 'a',
    },
    (err, result) => {}
  );
});
