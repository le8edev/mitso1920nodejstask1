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
        arguments = prompt("Specify arguments. Use format ([[..], [..]]:[[..], [..]]) ")
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
        let contents = content.split(':');

        let a = JSON.parse(contents[0]);
        let b = JSON.parse(contents[1]);

        if (output === undefined || output === '') {
            console.log(sum(a, b))
        } else {
            fs.writeFile(output, JSON.stringify(sum(a, b)), function (err) {
                if (err) return console.log(err);
                console.log('#TASK 2. The result was written to file.');
            });
        }
    } catch (e) {
        console.log('An error occurred while processing arguments: ' + e)
    }
}

function sum(a, b) {
    let m = a.length, n = a[0].length, c = [];
    for (let i = 0; i < m; i++) {
        c[i] = [];
        for (let j = 0; j < n; j++) c[i][j] = a[i][j] + b[i][j];
    }
    return c;
}
