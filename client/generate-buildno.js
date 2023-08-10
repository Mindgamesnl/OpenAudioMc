import fs from 'fs';

/* eslint-disable no-console */

console.log('Incrementing build number...');

const fileName = 'src/metadata.json';

// get the env from the first argument
const env = process.argv[2];

fs.readFile(fileName, (fileError, content) => {
  if (fileError) throw fileError;
  const metadata = JSON.parse(content);
  metadata.buildRevision += 1;
  metadata.buildTag = env;
  metadata.buildDate = new Date().toDateString();
  metadata.build = `${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`;
  fs.writeFile(fileName, JSON.stringify(metadata), (err) => {
    if (err) throw err;
    console.log(`Current build number: ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`);

    fs.copyFile(fileName, 'public/metadata.json', (copyError) => {
      if (copyError) throw copyError;
      console.log('metadata.json was copied to public/metadata.json');
    });
  });
});
