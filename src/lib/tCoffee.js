import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import glob from "glob";

const tcoffee = {};

/*
MSA of Protein Sequences using T-Coffee Default
 */
tcoffee.alignProtein = (inputFile, callback) => {
    alignSequence('protein', 'default', inputFile, callback);
};

/*
MSA of DNA Sequences using T-Coffee Default
 */
tcoffee.alignDNA = (inputFile, callback) => {
    alignSequence('dna', 'default', inputFile, callback);
};

/*
MSA of RNA Sequences using T-Coffee Default
 */
tcoffee.alignRNA = (inputFile, callback) => {
    alignSequence('rna', 'default', inputFile, callback);
};

/*
MSA of Protein Sequences using T-Coffee fast
 */
tcoffee.alignProteinFast = (inputFile, callback) => {
    alignSequence('protein', 'quickaln', inputFile, callback);
};

/*
MSA of Protein Sequences using mcoffee
 */
tcoffee.alignMcoffee = (inputFile, callback) => {
    alignSequence('protein', 'mcoffee', inputFile, callback);
};

/*
MSA of DNA Sequences using procoffee
 */
tcoffee.alignProCoffee = (inputFile, callback) => {
    alignSequence('dna', 'procoffee', inputFile, callback);
};

/*
MSA of RNA Sequences using rcoffee
 */
tcoffee.alignRcoffee = (inputFile, callback) => {
    alignSequence('rna', 'rcoffee', inputFile, callback);
};


function alignSequence(seqType, mode, inputFile, callback) {
    if(fs.existsSync(inputFile)){
        let tcoffeeCommand = `t_coffee ${path.resolve(inputFile)}`;
        if (mode === 'default') {
            tcoffeeCommand += ` -type=${seqType}`;

        }
        else {
            tcoffeeCommand += ` -mode=${mode}`;

        }
        run(tcoffeeCommand, err => {
            if(err){
                return callback(err);
            }
            else{
                let data = '';
        const filename = path.basename(inputFile, path.extname(inputFile));
        data = fs.readFileSync(`${__dirname}/${filename}.aln`, 'utf8');
        deleteGeneratedFiles(inputFile, mode);
        return callback(err, data);
    }
    });
    }
    else{
        const err = 'Input file does not exist';
        return callback(err, null);
    }

}

function run(command, callback) {
    console.log('RUNNING', command);
    child_process.exec(command, {cwd: __dirname, maxBuffer: 1024 * 1000}, callback);
}

function deleteGeneratedFiles(inputFile, mode) {
    const filename = path.basename(inputFile, path.extname(inputFile));
    fs.unlinkSync(`${__dirname}/${filename}.aln`);
    fs.unlinkSync(`${__dirname}/${filename}.dnd`);
    fs.unlinkSync(`${__dirname}/${filename}.html`);
    if (mode === 'rcoffee') {
        let match = glob.GlobSync(`${__dirname}/*.rfold`).matches;
        for (let file in match[0]) {
            fs.unlinkSync(file);
        }
        let matches = glob.GlobSync(`${__dirname}/*.template_list`).matches;
        for (let file in matches[0]) {
            fs.unlinkSync(file);
        }
    }
}

module.exports = tcoffee;
