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
#       Filename......................: fileSystemJson.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var fs = require('fs');

var pfile_typ = function pfile_typ(){
    
    this.dirObject = { };
    this.dir = "./data/";
    this.deleteDir = "4DELETED00";
    this.userDir   = "4000000000";
    this.dirFile   = "DirIndexFile";
    
    var searchArray = function(array, word){
        for(key in array) {	
            if(array[key] == word){ return true;}   
        }
        return false;						
    }
    
    this.readStr = function (id, operation, clientID){
        if(operation==='dir'){
            id = this.dirFile;
        }
        var file = global.config.dir+id+'.json';
		fs.readFile(file, 'UTF8', function (err, fileData) {
  			if (err) {console.log('tryed to read file: '+file);} else {
  				if(operation==='dir'){
                    pfile.dirObject = JSON.parse(fileData);
                    //console.log(pfile.dirObject);
                    //pfile.generateUserFilelist(clientID, "5000000000");
                    //var rid = pfile.addFile(12, "5000000000", "Hans", "5000000000", "u");
                    //var rid2 = pfile.addFile(12, rid, "HansOrdner", rid, "f");
                    //var rid = pfile.addFile(12, rid, "HansDatei", rid2, "p");
                    //console.log(pfile.dirObject);
                    //console.log(pfile.deleteFile(12, "5000000001", rid));
                    //pfile.writeStr(pfile.dirFile, 'dir', 12);
                    //console.log(pfile.dirObject);
                    
                }
                if(operation==='file'){
		            dlog("UPDATE OLD");
                    L3.files[id] = JSON.parse(fileData);
		            L3.oldFiles[id] = JSON.parse(fileData);
		            L3.updateUser(clientID);
                }
  			}
		});
	};
    
    this.writeStr = function (id, operation, clientID){
        if(operation==='dir'){
            var text = JSON.stringify(this.dirObject);
            id = this.dirFile;
        }
        if(operation==='file'){
            var text = JSON.stringify(L3.files[id]); // L3.files[id]
            //L3.killData(id);
        }
        if(operation==='newfile'){
            var tempNew = { };
            tempNew['1031111111'] = clientID;
            tempNew['1031111112'] = date.fileDate();
            var text = JSON.stringify(tempNew); // L3.files[id]
            // Todo: L3.killData(id); (clear RAM)
        }
        if(id!=""){
            fs.writeFile(global.config.dir+id+'.json', text, function (err) {
                if (err) {error.report(3, 'tryed to write file: '+file);} else {
                    log("Saved file "+pfile.dir+id+'.json');
                    if(operation=='file'){
                        pfile.dirObject[id].lastmod = new Date().getTime();
                        pfile.writeStr('x', 'dir', 12);
                    }
                    if(id != this.dirFile){
                        L3.killData(id);
                    }
                    if(L3.exit == true && L3.lastkey == id){
                    	cLog("exit websocket server");
                        wsServer.shutDown();
                        server.close();
                    }
                }
            });
        }
	};
    
    this.checkLogin = function (clientID, username, password){
        log("LOGIN DATA => clientID '"+clientID+"' username '"+username+"' password '"+password+"'");
        console.log('check');
        var userID = null;
        var temp = { }
        temp.userRight = global.mNoLogin;
        temp.username = "xxxxxxxxxx";
        temp.userID = "";
        for(key in this.dirObject){
            if(this.dirObject[key].username === username){
                userID = key;
                break;
            }
        }
        if(userID != null && userID[0] === "5"){
            if(this.dirObject[userID].password === password){
                temp.userRight = this.dirObject[userID].userRight;
                temp.username = username;
                temp.userID = userID;
            }
        }
        secure.loginData(clientID, temp); // Todo: When mulible users cause problems copy temp object in another way
	};
    
    this.addFile = function (clientID, userID, name, dir, type){
        if(type==="f"){
            var typ = "4";
            var id = this.makeid(typ);
            while(this.dirObject[id]){
                id = this.makeid(typ);
            }
            this.dirObject[id] = { };
            this.dirObject[id].owner = userID;
            this.dirObject[id].parent = dir;
            this.dirObject[id].name = name;
            this.dirObject[id].content = [];
            this.dirObject[id].share = "";
            this.dirObject[id].lastmod = new Date().getTime();
            this.addLink(dir, id);
        }
        if(type==="p"){
            var typ = "3";
            var id = this.makeid(typ);
            while(this.dirObject[id]){
                id = this.makeid(typ);
            }
            this.dirObject[id] = { };
            this.dirObject[id].owner = userID;
            this.dirObject[id].parent = dir;
            this.dirObject[id].name = name;
            this.dirObject[id].share = "";
            this.dirObject[id].lastmod = new Date().getTime();
            this.addLink(dir, id);
            pfile.writeStr(id, 'newfile', name);
        }
        if(type==="u"){
            dir = this.userDir;
            var typ = "5";
            var id = this.makeid(typ);
            while(this.dirObject[id]){
                id = this.makeid(typ);
            }
            this.dirObject[id] = { };
            this.dirObject[id].owner = id;
            this.dirObject[id].parent = dir;
            this.dirObject[id].name = name;
            this.dirObject[id].username = name;
            this.dirObject[id].password = "initial";
            this.dirObject[id].userRight = 3;
            this.dirObject[id].content = [];
            this.dirObject[id].share = "";
            this.addLink(dir, id);
        }
        //return id;
        this.generateUserFilelist(clientID, userID);
        pfile.writeStr('x', 'dir', 12);
    };
    
    this.deleteFile = function (clientID, userID, id){
        dlog("Deleteclient = "+clientID);
        dlog("DeleteuserID = "+userID);
        dlog("Delete    ID = "+id);
        dlog("Delete Owner = "+this.dirObject[id].owner);
        if(userID === "5000000000" || this.dirObject[id].owner == userID){
            dlog("Delete TRUE");
            this.removeLink(this.dirObject[id].parent, id);
            this.dirObject[id].parent = this.deleteDir;
            this.addLink(this.deleteDir, id);
        }
        this.generateUserFilelist(clientID, userID);
        pfile.writeStr(12, 'dir', 12);
    };
    
    this.moveFileList = function (clientID, userID, moveObject){
        for(i in moveObject.files){
            this.moveFile(clientID, userID, moveObject.files[i], moveObject.toid);
        }
        this.generateUserFilelist(clientID, userID);
        pfile.writeStr(12, 'dir', 12);
    };
    
    this.moveFile = function (clientID, userID, id, toid){
        if(userID === "5000000000" || this.dirObject[id].owner == userID){
            this.removeLink(this.dirObject[id].parent, id);
            this.dirObject[id].parent = toid;
            this.addLink(toid, id);
        }
    };
    
    this.addLink = function (id, linkID){
        if(this.dirObject[id]){
            var key = this.dirObject[id].content.indexOf(linkID);
            if(key == -1){
                this.dirObject[id].content.push(linkID);
            }
        } else {
            error.report(6, "ID "+id+" does not exist in dirObject! [fileSystemJson:addLink]");
        }
    };
    
    this.removeLink = function (id, linkID){
        if(this.dirObject[id]){
            var key = this.dirObject[id].content.indexOf(linkID);
            this.dirObject[id].content.splice(key, 1);
        } else {
            error.report(6, "ID "+id+" does not exist in dirObject! [fileSystemJson:removeLink]");
        }
    };
    
    this.generateUserFilelist = function(clientID, userID){
        this.generateUserFilelistJSON(clientID, userID);
        /*output = [];
        counter = 0;
        output[counter] = userID+''+this.dirObject[userID].name+';'+this.dirObject[userID].content;
        counter++;
        for(key in this.dirObject){
            share = this.dirObject[key].share.split(";");
            if(userID === "5000000000" || this.dirObject[key].owner == userID || searchArray(share, userID)){
                var beginn = key.substr(0, 1);
                if(beginn=="3"){
                    output[counter] = key+''+this.dirObject[key].name;
                    counter++;
                }
                if(beginn==="4" || beginn==="5" || beginn==="6"){
                    output[counter] = key+''+this.dirObject[key].name+';'+this.dirObject[key].content;
                    counter++;
                }
            }
        }
        L2x1.send(clientID, sID.fileList, output.join(":"));
        //this.generateUserFilelistJSON(clientID, userID);*/
        //console.log(output.join(":"));
    }
    
    this.generateUserFilelistJSON = function(clientID, userID){
        output = {};
        counter = 0;
        //output[counter] = userID+''+this.dirObject[userID].name+';'+this.dirObject[userID].content;
        //output[userID] = JSON.parse( JSON.stringify( a ) );
        counter++;
        for(key in this.dirObject){
            share = this.dirObject[key].share.split(";");
            if(userID === "5000000000" || this.dirObject[key].owner == userID || searchArray(share, userID)){
                output[key] = JSON.parse(JSON.stringify(this.dirObject[key])); // Makes a Copy of the Object
            }
        }
        L2x1.send(clientID, sID.fileList, JSON.stringify(output));
        //console.log(JSON.stringify(output));
    }
    
    this.makeid = function (type){
	   var id = Math.random().toString(36).substring(2,11);
	   return type+""+id;
	   };
};

var pfile = new pfile_typ();

//pfile.readStr('123', 'dir', 2);
//var tea = { };
//tea['1002343355'] = "0392041400TEST IST DAS GEIL";
//tea['1031111111'] = "Dies ist eine Ueberschrift";
//tea['1009999409'] = "0133128400Dies ist keine Ueberschrift";
//pfile.writeStr('3emqfb6uw2', 'file', 12);