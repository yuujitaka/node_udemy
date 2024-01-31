const { createReadStream, createWriteStream } = require('fs');

const stream = createReadStream('./exempleFolder/exempleFile.txt', {
  highWaterMark: 8000,
  encoding: 'utf8',
});

stream.on('data', (result) => {
  console.log('chunk:', result);
});

stream.on('error', (err) => {
  console.log(err);
});
