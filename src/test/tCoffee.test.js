//This tests require T-Coffee executable to be installed locally
//T-Coffee can be downloaded by running tCoffee_Wrapper/util/downloaderTCoffee.js

require('mocha');
const assert = require('assert');
import { expect } from 'chai';
import {should} from 'chai';
import {stdout} from "test-console";

let restoreStdout;

import tcoffee from '../lib/tCoffee';

describe('#Align an unaligned sequence file', () => {
    it('should execute t_coffee command (sequence type = Protein)', done => {
        const inspect = stdout.inspect();
        tcoffee.alignProtein('src/test/samples/sample_seq1.fasta',err => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute t_coffee command (sequence type = DNA)', done => {
        const inspect = stdout.inspect();
        tcoffee.alignDNA('src/test/samples/sample_dnaseq1.fasta',err => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute t_coffee command (sequence type = RNA)', done => {
        const inspect = stdout.inspect();
        tcoffee.alignProtein('src/test/samples/sample_rnaseq1.fasta',err => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});

describe('#Align protein sequences using mcoffee mode', () => {
    it('should execute t_coffee command with no error', done => {
        const inspect = stdout.inspect();
        const inputFile =
            tcoffee.alignMcoffee('src/test/samples/sample_seq1.fasta',err => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Success.!');
                }
                inspect.restore();
                assert.deepEqual(inspect.output[1], "Success.!\n");
                done();
            });
    });
});

describe('#Align protein sequences using quickaln mode', () => {
    it('should execute t_coffee command with no error', done => {
        const inspect = stdout.inspect();
        const inputFile =
            tcoffee.alignProteinFast('src/test/samples/sample_seq1.fasta',err => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Success.!');
                }
                inspect.restore();
                assert.deepEqual(inspect.output[1], "Success.!\n");
                done();
            });
    });
});

describe('#Align DNA sequences using procoffee mode', () => {
    it('should execute t_coffee command with no error', done => {
        const inspect = stdout.inspect();
        const inputFile =
            tcoffee.alignProCoffee('src/test/samples/sample_dnaseq1.fasta',err => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Success.!');
                }
                inspect.restore();
                assert.deepEqual(inspect.output[1], "Success.!\n");
                done();
            });
    });
});

describe('#Align RNA sequences using rcoffee mode', () => {
    it('should execute t_coffee command with no error', done => {
        const inspect = stdout.inspect();
        const inputFile =
            tcoffee.alignRcoffee('src/test/samples/sample_rnaseq1.fasta',err => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Success.!');
                }
                inspect.restore();
                assert.deepEqual(inspect.output[1], "Success.!\n");
                done();
            });
    });
});