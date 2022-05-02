const args = require('process');
const { setFlagsFromString } = require('v8');

let mode = 'Dedicated';

//select mode
module.exports = selectMode = () => {
    let flags = getFlags();
    if(flags.length > 1) {
        console.log('More than one mode selected. Terminating Program...');
        process.exit(1);
    } 
    if(flags.length == 0) {
        console.log(`No mode selected. Starting server on default mode: '${mode}'`);
    } else {
        if(flags[0] == '-demo') mode = 'demo';
        console.log(`Starting server on mode: '${mode}'...`);
    }
    return mode;
}


//get flags from cmd line
const getFlags = () => {
    let flags = [];
    args.argv.forEach(arg => {
        if(arg[0] == '-') flags.push(arg);
    });
    return flags;
};


const runDemoMode = () => {

}

const runDedicatedMode = () => {
    //
}