'use strict';

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _downloadFile = require('download-file');

var _downloadFile2 = _interopRequireDefault(_downloadFile);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var address = 'http://www.tcoffee.org/Packages/Stable/Latest/';
var platform = _os2.default.platform();

function getTCoffee() {
    switch (platform) {
        case 'linux':
            address += 'linux/T-COFFEE_installer_Version_11.00.8cbe486_linux_x64.bin';
            downloadTC(address);
            break;

        case 'darwin':
            address += 'macosx/T-COFFEE_installer_Version_11.00.8cbe486_macosx_x64.dmg';
            downloadTC(address);
            break;

        default:
            console.log("T-Coffee is not available for your operating system type");
    }
};

function makeExecutable(location) {
    if (platform === 'linux') {
        _child_process2.default.exec('chmod +x T-COFFEE_installer_Version_11.00.8cbe486_linux_x64.bin', { cwd: location }, function (err) {
            if (err) {
                console.log('ERROR: ' + err);
            } else {
                _child_process2.default.exec('./T-COFFEE_installer_Version_11.00.8cbe486_linux_x64.bin', { cwd: location }, function (err) {
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

function downloadTC(url) {
    console.log('Downloading T-Coffee from ', url);
    (0, _downloadFile2.default)(url, { directory: './bin' }, function (err) {
        if (err) {
            console.log('Download failed');
            console.log(err);
        } else {
            console.log('Download complete');
            makeExecutable('./bin');
        }
    });
};

getTCoffee();