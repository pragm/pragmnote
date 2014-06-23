/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: Zpragm-websocket.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/
"use strict";

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
    if(val.substr(0,5) == "#conf"){
        console.log("CONFIG ARGUMENTS: "+val.substr(5));
        //val = val.replace(/'/g,'"');
        //console.log(val.substr(5));
        global.config = JSON.parse(val.substr(5));
    }
});
 
process.stdin.on('data', function (chunk) {
    chunk = chunk.substr(0, 5);
    switch (chunk) {
        case "#save":
            cLog("save all files");
            L3.saveAll();
            break;
        case "#stop":
            cLog("exit websocket server");
            stopServerNow();
            //server.close();
            //wsServer.shutDown();
            //server.close();
            //process.kill();
            break;
        case "#ende":
            cLog("end => stops websocket server when all clients are disconnected (allows no new connections)");
            server.close();
            //process.kill();
            break;
        case "#exit":
            L3.exit = true;
            cLog("save all files");
            L3.saveAll();
            break;
        case "#kill":
            for (key in clients) {
                clients[key].close();
            }
            break;
        case "#rdir":
            datei.readDir();
            break;
        case "#dbug":
            debugLog = 5;
            break;
        default:
            cLog("command '"+chunk+"' does not exist");
            break;
    }
});

function cLog(text){
    console.log('COMMAND => ' + text);
}

var text = "0206224400ffshjnkbgmmm";

//log(hash.generate(text));

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'pragm-websocket';

//TEMP ======================================

function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}

function printMemoryUsage(){
    console.log("============MEMORY USAGE============");
    console.log("| secure  "+roughSizeOfObject(secure));
    console.log("| io  "+roughSizeOfObject(io));
    console.log("| L2      "+roughSizeOfObject(L2));
    console.log("| L2x1    "+roughSizeOfObject(L2x1));
    console.log("| L3      "+roughSizeOfObject(L3));
    console.log("|  files       "+roughSizeOfObject(L3.files));
    console.log("|  oldFiles    "+roughSizeOfObject(L3.oldFiles));
    console.log("|  users       "+roughSizeOfObject(L3.users));
    console.log("|  staticSave  "+roughSizeOfObject(L3.staticSave));
    console.log("|  usersAtFile "+roughSizeOfObject(L3.usersAtFile));
    console.log("| pfile   "+roughSizeOfObject(pfile));
    console.log("| clients "+roughSizeOfObject(clients));
    console.log("==========MEMORY USAGE END==========");
};
function startPrint(){
    setInterval(printMemoryUsage, 30000);
}
//setTimeout(startPrint, 2000);
// ==========================

// Port where we'll run the websocket server
if(!global.config.port){
    var webSocketsServerPort = 8080;
} else {
    var webSocketsServerPort = global.config.port;
}

var timeStatCounter = 0;
var timeStat = new Array();

// websocket and http servers
//var webSocketServer = require('websocket').server;
//var http = require('http');

/* SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL 
var options = {key: fs.readFileSync('./client.key'),cert: fs.readFileSync('./client.cert'),requestCert: true}
var server = require('https').createServer(options);
var io = require('socket.io').listen(server);
server.listen(webSocketsServerPort);
 SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL  SSL */

var io = require('socket.io').listen(webSocketsServerPort);

io.set('log level', 1);
io.server.on('error', function (e) {
  if (e.code == 'EADDRINUSE') {
    commander.portBloc(webSocketsServerPort);
  }
});

// list of currently connected clients (users)
var clients = [ ];

function log(text){
    var aTime = ((new Date()).toString()).substr(0, 24);
    console.log(aTime + '   ' + text);
}

function iLog(text){
    var aTime = ((new Date()).toString()).substr(0, 24);
    console.log(aTime + '   ' + text);
}
var debugLog = 0;

function dlog(text){
    if(debugLog>0){
        var aTime = ((new Date()).toString()).substr(0, 24);
        console.log(aTime + '   ' + text);
    }
}

function stopServerNow(){
    io.server.close();
    /*for(client in clients){
        clients[client].disconnect();
    }*/
    process.abort();;
}
if(fs.existsSync(global.config.dir+pfile.dirFile+".json")){
    pfile.readStr('123', 'dir', 2);
} else {
    manager.resetSystem();
}


var connectionCounter = 0;

// This callback function is called every time someone
// tries to connect to the WebSocket server
io.sockets.on('connection', function (socket) {
    //var connection = request.accept(null, request.origin); 
    //socket.origin;
    // we need to know client clientID to remove them on 'close' event
    //var clientID = clients.push(connection) - 1;   // -1
    var address = socket.handshake.address;
    var clientID = connectionCounter;
    clients[clientID] = socket;
    connectionCounter++;
    secure.init(clientID);
    L2.cache[clientID] = [];
    L3.users[clientID] = [];
    L3.users[clientID]['file'] = "";
    iLog('CONNECTION: CLIENTID: '+clientID+' IP: '+address.address+' PORT: '+address.port);

    socket.on('message', function (msg) {
        //if (message.type === 'utf8') { // accept only text
                //log(' Received Message from '+ clientID + ': ' + message.utf8Data+"<= AND =>"+connection.remoteAddress);

                //timeStatCounter = timeStat.push(new Date()) - 1;
                //L2.recieve(clientID, message.utf8Data);
                L2.recieve(clientID, msg);
                //for (var i=0; i < clients.length; i++) {
                //    clients[i].sendUTF(message.utf8Data+"<= AND =>"); 
                //}
            //}
        //}
    });
    

    // user disconnected
    socket.on('disconnect', function () {
        //clients.splice(clientID, 1);
        if(clients[clientID]){delete clients[clientID]};
        iLog("CLIENTID=>"+clientID+" disconnected!");
        L2.reset(clientID);
        //secure.reset(clientID);
        //L3.reset(clientID);
    });

});


    


var L1_typ = function L1_typ(){
    this.send = function (client, text){
        clients[client].send(text);
        //log(" SCRIPTTIME => "+(new Date()-timeStat[timeStatCounter])+"ms");
    }
    };

var L1 = new L1_typ();

function callbackInterval(){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    //log(hour+":"+min+":"+sec);
    if(hour == 3 && min == 0){
        log("RESTART NIGHT NOW");
    }
}

setInterval(callbackInterval, 60000);