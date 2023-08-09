import { spawn } from 'child_process';
// eslint-disable-next-line import/no-extraneous-dependencies
import qr from 'qrcode-terminal';
// eslint-disable-next-line import/no-extraneous-dependencies
import ngrok from 'ngrok';

// enable console.log for this file
/* eslint-disable no-console */

/*
 * This is an ugly cobbled script that runs the normal react dev server
 * but listens for lines with urls, and then automatically sets them up with NGROk
 * and generates a QR code for them. This is useful for mobile testing.
 */

function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
  ].join('|');

  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

const regex = ansiRegex();

function stripAnsi(string) {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }

  // Even though the regex is global, we don't need to reset the `.lastIndex`
  // because unlike `.exec()` and `.test()`, `.replace()` does it automatically
  // and doing it manually has a performance penalty.
  return string.replace(regex, '');
}

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
    const url = networkUrlLine.replace('Local:   ', '').trim().replace(/\s/g, '');
    qr.generate(url, { small: true }, (qrCode) => {
      console.log(qrCode);
      console.log(url);
    });

    ngrok.connect(3000).then((ngrokUrl) => {
      console.log(ngrokUrl);
      // also make qr code for ngrok url
      qr.generate(ngrokUrl, { small: true }, (qrCode) => {
        console.log(qrCode);
        console.log(ngrokUrl);
      });
    }).catch((err) => {
      console.error(err);
    });

    hadCodeAlready = true;

    // Uncomment the line below if you want to automatically terminate the process after displaying the QR code and URL
    // process.kill(process.pid, 'SIGINT');
  }
}

runNpmStart();
