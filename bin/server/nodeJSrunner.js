/*var exec = require('child_process').exec;
console.log("==================> 1");
var child = exec('node serverBuild.js', function callback(error, stdout, stderr){
console.log("==================> 2");
    console.log('stdout: ["' + stdout+'"]');
    console.log('stderr: ["' + stderr+'"]');
console.log("==================> 3");
    if (error !== null) {
      console.log('exec error: ["' + error+'"]');
console.log("==================> 4");
    }
console.log("==================> 5");
});
console.log("Bla bla blubb");*/

var x = 0;


var spawn = require('child_process').spawn,
    ps    = spawn('node', ['serverBuild.js']);

ps.stdout.on('data', function (data) {
   console.log('stdout: ' + data);
    x++;
    if(x==5){console.log("+ + + S T O P + + + "); ps.stdin.write("fdhfg");}
});

ps.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ps.on('close', function (code) {
  if (code !== 0) {
    console.log('ps process exited with code ' + code);
  }
});
