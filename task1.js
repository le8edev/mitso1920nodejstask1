const commander = require('commander');
const program = new commander.Command();
const fs = require('fs')
const prompt = require("prompt-sync")({ sigint: true });

program
    .option('-i, --input <string>', 'Specify input file')
    .option('-o, --output <string>', 'Specify output file')
    .option('-a, --arguments <string>', 'Specify arguments');

program.parse();

let opts = program.opts();

let input = opts.input;
let output = opts.output;
let arguments = opts.arguments;

if (input === undefined || input === '') {
    if (arguments === undefined || arguments === '') {
        arguments = prompt("Specify arguments. Just enter string... ")
    }
    processTask(arguments, output);
} else {
    fs.readFile(input, 'utf8', function (err, content) {
        if (err) return console.log(err);
        processTask(content, output);
    });
}

function processTask(content, output) {
    try {
        if (output === undefined || output === '') {
            console.log(content.replace(/one|t[wh]|.i|[fsz]/g, " $&").trimStart())
        } else {
            fs.writeFile(output, content.replace(/one|t[wh]|.i|[fsz]/g, " $&").trimStart(), function (err) {
                if (err) return console.log(err);
                console.log('#TASK 1. The result was written to file.');
            });
        }
    } catch (e) {
        console.log('An error occurred while processing arguments: ' + e)
    }
}

