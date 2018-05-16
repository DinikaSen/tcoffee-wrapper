'use strict';

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tcoffee = {};

/*
MSA of Protein Sequences using T-Coffee Default
 */
tcoffee.alignProtein = function (inputFile, callback) {
    alignSequence('protein', 'default', inputFile, callback);
};

/*
MSA of DNA Sequences using T-Coffee Default
 */
tcoffee.alignDNA = function (inputFile, callback) {
    alignSequence('dna', 'default', inputFile, callback);
};

/*
MSA of RNA Sequences using T-Coffee Default
 */
tcoffee.alignRNA = function (inputFile, callback) {
    alignSequence('rna', 'default', inputFile, callback);
};

/*
MSA of Protein Sequences using T-Coffee fast
 */
tcoffee.alignProteinFast = function (inputFile, callback) {
    alignSequence('protein', 'quickaln', inputFile, callback);
};

/*
MSA of Protein Sequences using mcoffee
 */
tcoffee.alignMcoffee = function (inputFile, callback) {
    alignSequence('protein', 'mcoffee', inputFile, callback);
};

/*
MSA of DNA Sequences using procoffee
 */
tcoffee.alignProCoffee = function (inputFile, callback) {
    alignSequence('dna', 'procoffee', inputFile, callback);
};

/*
MSA of RNA Sequences using rcoffee
 */
tcoffee.alignRcoffee = function (inputFile, callback) {
    alignSequence('rna', 'rcoffee', inputFile, callback);
};

function alignSequence(seqType, mode, inputFile, callback) {
    if (_fs2.default.existsSync(inputFile)) {
        var tcoffeeCommand = 't_coffee ' + _path2.default.resolve(inputFile);
        if (mode === 'default') {
            tcoffeeCommand += ' -type=' + seqType;
        } else {
            tcoffeeCommand += ' -mode=' + mode;
        }
        run(tcoffeeCommand, function (err) {
            if (err) {
                return callback(err);
            } else {
                var data = '';
                var filename = _path2.default.basename(inputFile, _path2.default.extname(inputFile));
                data = _fs2.default.readFileSync(__dirname + '/' + filename + '.aln', 'utf8');
                deleteGeneratedFiles(inputFile, mode);
                return callback(err, data);
            }
        });
    } else {
        var err = 'Input file does not exist';
        return callback(err, null);
    }
}

function run(command, callback) {
    console.log('RUNNING', command);
    _child_process2.default.exec(command, { cwd: __dirname, maxBuffer: 1024 * 1000 }, callback);
}

function deleteGeneratedFiles(inputFile, mode) {
    var filename = _path2.default.basename(inputFile, _path2.default.extname(inputFile));
    _fs2.default.unlinkSync(__dirname + '/' + filename + '.aln');
    _fs2.default.unlinkSync(__dirname + '/' + filename + '.dnd');
    _fs2.default.unlinkSync(__dirname + '/' + filename + '.html');
    if (mode === 'rcoffee') {
        var match = _glob2.default.GlobSync(__dirname + '/*.rfold').matches;
        for (var file in match[0]) {
            _fs2.default.unlinkSync(file);
        }
        var matches = _glob2.default.GlobSync(__dirname + '/*.template_list').matches;
        for (var _file in matches[0]) {
            _fs2.default.unlinkSync(_file);
        }
    }
}

module.exports = tcoffee;