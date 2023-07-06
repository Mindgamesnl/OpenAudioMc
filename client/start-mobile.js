const { spawn } = require('child_process');
const qr = require('qrcode-terminal');
const stripAnsi = require('strip-ansi');
const ngrok = require('ngrok')

let npmStart;

function runNpmStart() {
    npmStart = spawn('npm', ['start'], { stdio: 'pipe' });
    let outputData = '';

    npmStart.stdout.pipe(process.stdout);

    npmStart.stdout.on('data', (data) => {
        outputData += stripAnsi(data.toString());
        checkNetworkUrl(outputData);
    });

    npmStart.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    npmStart.on('close', (code) => {
        console.log(`npm start exited with code ${code}`);
        process.exit(code);
    });

    process.on('SIGINT', () => {
        npmStart.kill('SIGINT');
        process.exit(0);
    });

    // clean process on exit
    process.on('exit', () => {
        npmStart.kill('SIGINT');
    });
}

let hadCodeAlready = false;

function checkNetworkUrl(data) {
    const lines = data.split('\n');
    const networkUrlLine = lines.find((line) => line.includes('On Your Network:'));

    if (networkUrlLine) {
        if (hadCodeAlready) return;
        console.log('Found network URL, generating QR code...');
        const url = networkUrlLine.replace('On Your Network:', '').trim().replace(/\s/g, '');
        qr.generate(url, { small: true }, (qrCode) => {
            console.log(qrCode);
            console.log(url);
        });

        ngrok.connect(3000).then(ngrokUrl => {
            console.log(ngrokUrl);
            // also make qr code for ngrok url
            qr.generate(ngrokUrl, { small: true }, (qrCode) => {
                console.log(qrCode);
                console.log(ngrokUrl);
            });
        }).catch(err => {
            console.error(err);
        })

        hadCodeAlready = true;

        // Uncomment the line below if you want to automatically terminate the process after displaying the QR code and URL
        // process.kill(process.pid, 'SIGINT');
    }
}

runNpmStart();
