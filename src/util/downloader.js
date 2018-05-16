import os from 'os';
import download from 'download-file';
import child_process from 'child_process';

let address = 'http://www.tcoffee.org/Packages/Stable/Latest/';
const platform = os.platform();


function getTCoffee() {
    switch (platform) {
        case ('linux'):
            address += 'linux/T-COFFEE_installer_Version_11.00.8cbe486_linux_x64.bin';
            downloadTC(address);
            break;

        case ('darwin'):
            address += 'macosx/T-COFFEE_installer_Version_11.00.8cbe486_macosx_x64.dmg';
            downloadTC(address);
            break;

        default :
            console.log("T-Coffee is not available for your operating system type");
    }
};

function makeExecutable (location) {
    if (platform === 'linux') {
        child_process.exec('chmod +x T-COFFEE_installer_Version_11.00.8cbe486_linux_x64.bin', {cwd: location}, err => {
            if (err) {
                console.log(`ERROR: ${err}`);
            } else {
                child_process.exec('./T-COFFEE_installer_Version_11.00.8cbe486_linux_x64.bin', {cwd: location}, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('T-Coffee installer launched successfully.');
                    }
                });
            }
        });
    } else if (platform === 'darwin') {
        console.log('Files saved to ./bin.\nDouble Click on installer icon in DMG folder to start installation');
    }
};

function downloadTC  (url) {
    console.log('Downloading T-Coffee from ', url);
    download(url, {directory: './bin'}, err => {
        if (err) {
            console.log('Download failed');
            console.log(err);
        }
        else {
            console.log('Download complete');
            makeExecutable('./bin');
        }
    });
};

getTCoffee();
