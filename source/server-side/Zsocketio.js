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
 
process.stdin.on('data', function (chunk) {
    chunk = chunk.substr(0, 4);
    switch (chunk) {
        case "save":
            cLog("save all files");
            L3.saveAll();
            break;
        case "stop":
            cLog("exit websocket server");
            //server.close();
            wsServer.shutDown();
            server.close();
            //process.kill();
            break;
        case "ende":
            cLog("end => stops websocket server when all clients are disconnected (allows no new connections)");
            server.close();
            //process.kill();
            break;
        case "exit":
            L3.exit = true;
            cLog("save all files");
            L3.saveAll();
            break;
        case "kill":
            for (key in clients) {
                clients[key].close();
            }
            break;
        case "rdir":
            datei.readDir();
            break;
        case "dbug":
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
var io = require('socket.io').listen(webSocketsServerPort);
io.set('log level', 1);

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

pfile.readStr('123', 'dir', 2);
/**
 * HTTP server
 */
/*var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
    request.on('error', function(message){
        log(" E R R O R :  SERVERERROR (PROBABLE SOCKET ON PORT "+webSocketsServerPort+" BUSY) [REQUEST] MSG: "+message);
    });
    response.on('error', function(message){
        log(" E R R O R :  SERVERERROR (PROBABLE SOCKET ON PORT "+webSocketsServerPort+" BUSY) [RESPONSE] MSG: "+message);
    });
});
server.listen(webSocketsServerPort, function() {
    log(" Server is listening on port " + webSocketsServerPort);
    
});*/

process.on('uncaughtException', function(err) {
  log(' C A U G H T    E X C E P T I O N : ' + err);
   //server.close();
    process.abort();
});//*/

/*server.on('error', function(message){
        log(" E R R O R :  SERVERERROR (PROBABLE SOCKET ON PORT "+webSocketsServerPort+" BUSY) [LISTEN]");
        process.abort();
    });

server.on('close', function(message){
        log(" S T O P :  SERVER HAS STOPPED!  S T O P ");
        process.abort();
    });
/**
 * WebSocket server
 *
var wsServer = new webSocketServer({
    httpServer: server
});*/


/*wsServer.on('error', function(message){
        log(" E R R O R :  SERVERERROR (PROBABLE SOCKET ON PORT "+webSocketsServerPort+" BUSY) [wsServer]");
        wsServer.close();
    });*/

var connectionCounter = 0;

// This callback function is called every time someone
// tries to connect to the WebSocket server
io.sockets.on('connection', function (socket) {
    //var connection = request.accept(null, request.origin); 
    //socket.origin;
    // we need to know client clientID to remove them on 'close' event
    //var clientID = clients.push(connection) - 1;   // -1
    var clientID = connectionCounter;
    clients[clientID] = socket;
    connectionCounter++;
    secure.init(clientID);
    L2.cache[clientID] = new Array();
    L3.users[clientID] = new Array();
    L3.users[clientID]['file'] = "";
    iLog('Connection accepted! CLIENTID=>'+clientID+' IP=>'+socket.remoteAddress+' ORIGIN=>'+socket.origin);

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
        secure.reset(clientID);
        L3.reset(clientID);
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