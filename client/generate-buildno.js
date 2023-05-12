var fs = require('fs');
console.log('Incrementing build number...');

let fileName = 'src/metadata.json';

fs.readFile(fileName, function (err, content) {
    if (err) throw err;
    var metadata = JSON.parse(content);
    metadata.buildMinor = metadata.buildMinor + 1;
    metadata.buildRevision = 0;
    metadata.buildDate = new Date().toTimeString();
    metadata.build = `${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`;
    fs.writeFile(fileName, JSON.stringify(metadata), function (err) {
        if (err) throw err;
        console.log(`Current build number: ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`);

        fs.copyFile(fileName, 'public/metadata.json', (err) => {
            if (err) throw err;
            console.log('metadata.json was copied to public/metadata.json');
        })
    })
});