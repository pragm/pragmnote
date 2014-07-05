var fs = require('fs');

var versionfirst = "0.2";


var exportServer = 'bin/server/serverBuild.js';
var exportServerDir = 'bin/server/';
var exportClient = 'bin/client/index.html';
var exportClientCSS = 'bin/client/style.css';
var exportClientJS = 'bin/client/script.js';
var exportTemplateDir = 'bin/client/templates/';
var serverDir = 'source/server-side/';
var globalDir = 'source/both-side/';
var clientDir = 'source/client-side/';
var cstyleDir =   'source/client-style/';
var templateDir = 'source/templates/';



function sLog(message){
    console.log(message);
}

function get_file_content(file){
    return fs.readFileSync(file);
}

function set_file_content(file, daten){
    fs.writeFileSync(file, daten);
}

function get_dir_content(dir, type){
    var exOut = "";
    sLog("readdir => "+dir);
    var handle = fs.readdirSync(dir);
    console.log(JSON.stringify(handle));
    for (i in handle) {
        var data = handle[i].split('.');
        if(data[1]==type){
            exOut += get_file_content(dir+handle[i])+"\n";
            sLog('INCLUDE => '+handle[i]);
        }
        
    }
    return exOut;
}

function copy_dir_content(dir, type, toDir){
    var exOut = "";
    sLog("readdir => "+dir);
    var handle = fs.readdirSync(dir);
    for (i in handle) {
        var data = handle[i].split('.');
        if(data[1]==type){
            exOut = get_file_content(dir+handle[i]);
            set_file_content(toDir+handle[i], exOut);
            sLog('Copied => '+handle[i]);
        }
    }
    return exOut;
}

function buildSoftware(){
    sLog('TAKE => ServerJS');
    var serverJS   = get_dir_content(serverDir, 'js');
    sLog('TAKE => globalJS');
    var globalJS   = get_dir_content(globalDir, 'js');
    sLog('TAKE => clientJS');
    var clientJS   = get_dir_content(clientDir, 'js');
    sLog('TAKE => clientHTML');
    var clientHTML = get_dir_content(cstyleDir, 'html');
    sLog('TAKE => clientCSS');
    var clientCSS  = get_dir_content(cstyleDir, 'css');
    sLog('COMPILE');
    var version = parseInt(get_file_content('version.ini'));
    version++;
    set_file_content('version.ini', version);
    
    version = versionfirst+"."+version;

    var server ='//Server-Build Version: BETA => '+version+'\nconsole.log("pragm-Websocket-Server => BUILD '+version+' BETA");'+globalJS+''+serverJS;

    var client = clientHTML.split("<!-- #buildSoftwareCut# -->");
    
    clientJS = 'var clientversion = "'+version+'";\n'+globalJS+'\n'+clientJS;


    set_file_content(exportClientJS, clientJS);
    set_file_content(exportClientCSS, '@charset "ISO-8859-1";'+clientCSS);
    set_file_content(exportServer, server);
    set_file_content(exportClient, client);
    copy_dir_content(templateDir, 'html', exportTemplateDir);
    sLog('END');
}


buildSoftware();

