var fs = require('fs');
console.log('Incrementing build number...');
fs.readFile('src/metadata.json', function (err, content) {
    if (err) throw err;
    var metadata = JSON.parse(content);
    metadata.buildRevision = metadata.buildRevision + 1;
    metadata.buildDate = new Date().toTimeString();
    metadata.build = `${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`;
    fs.writeFile('src/metadata.json', JSON.stringify(metadata), function (err) {
        if (err) throw err;
        console.log(`Current build number: ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}`);
    })
});