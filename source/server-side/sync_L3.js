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
#       Filename......................: sync_L3.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var L3_typ = function L3_typ(){

    this.files = { };
    this.oldFiles = { };
    this.users = { };
    this.lastkey = false;
    this.exit = false;
    this.staticSave = { };


    this.recieve = function (clientID, id, data){
       var id_pre = id.substr(0, 1);
       
        switch (id_pre) {
        //case "0":
    		//ID's welche mit 0 beginnen
           // break;
        case "1":
    		//ID's welche mit 1 beginnen (Content ID'S)
            L3.shareContentById(clientID, id, data);
           break;
        case "2":
        	//ID's welche mit 2 beginnen (Static ID'S)
        	L3.static_id(clientID, id, data);
            break;
        case "3":
        	//ID's welche mit 3 beginnen (File! ID'S)
            break;
         default:
        	error.report(2, id_pre+" not given or wrong");
        }
	};

    this.shareContentById = function (clientID, id, data){
    
        this.files[this.users[clientID]['file']][id] = data;
    
    
        for(var key in this.users){
            if(this.users[key]['file'] == this.users[clientID]['file']){
                this.users[key].files[this.users[key]['file']][id] = data;
                if(key!=clientID){	
                    L2x1.send(key, id, data);
                }
            }
        }
    };

    this.deleteItemID = function (clientID, id, data){
        delete this.files[this.users[clientID]['file']][data];

        for(var key in this.users){
            if(this.users[key]['file'] == this.users[clientID]['file']){
                delete this.users[key].files[this.users[key]['file']][data];
                if(key!=clientID){	
                    L2x1.send(key, id, data);
                }
            }
        }
    };
	
    this.static_id = function (clientID, id, data){
        //this.staticSave[clientID][id] = data;
		switch (id) {
            case sID.getServer:
	            //ID's welche mit 0 beginnen
		        L3.getServer(clientID, id, data);
                break;
            case sID.clientName:
                L3.clientName(clientID, id, data);
		        //ID's welche mit 1 beginnen (Content ID'S)
                break;
            case sID.file:
                L3.switchFile(clientID, id, data);
                //ID's welche mit 2 beginnen (Static ID'S)
                break;
            case sID.unloadFile:
                //ID's welche mit 3 beginnen (BLA! ID'S)
                this.unloadFile(clientID);
                //error.report(2,"static id $id not connectet to a function");
                break;
            case sID.userList:
                //Server sendet Userliste
                error.report(2,"static id $id not connectet to a function");
                break;
            case sID.deleteID:
                L3.deleteItemID(clientID, id, data);
                //Server loescht ID und schickt das weiter
                break;
            case sID.Login:
                secure.login(clientID, JSON.parse(data));
                //Server loescht ID und schickt das weiter
                break;   
            case sID.addFile:
                var temp = JSON.parse(data);
                pfile.addFile(clientID, L3.users[clientID]['userID'], temp.name, temp.dir, temp.type);
                break;     
            case sID.deleteFile:
                pfile.deleteFile(clientID, L3.users[clientID]['userID'], data);
                break;     
            default: 
                error.report(2,"static id $id not given or wrong");
                break;
		}
    };

    this.clientName = function (clientID, id, data) {
        this.users[clientID]['name'] = data;
        this.users[clientID].files = { };
        this.staticSave[clientID] = { };
        secure.legitimationSet(clientID);
    };

    this.getServer = function (clientID, id, data) {
        switch (data) {
            case sID.fileList:
                //L2x1.send(clientID, sID.fileList, pfile_generateFilelist()); XXX
                //L2x1.send(clientID, sID.fileList, "LOLOLOLOLOLOL");
                pfile.generateUserFilelist(clientID, L3.users[clientID]['userID']);
                break;
            case sID.userList:
                uList = '';
                for(key in this.users) {    
                    uList = uList+':'+this.users['key']['name'];
                } 
                uList = substr(uList, 1);
                L2x1.send(clientID, sID.userList, uList);
                break; 
            case sID.testid:
                filesystem.getTest();
                break;   
            case sID.killServer:
                if(secure.userRights[clientID] === 0){
                    log("USER SYSTEM KILLED SERVER!");
                    wsServer.shutDown();
                    server.close();
                }
                break;
            default: 
                error.report(2, 'static id '+id+' not given or wrong');
                break;
        }
    };

    this.switchFile = function (clientID, id, data) {   
        this.users[clientID]['file'] = data; 
        if(!(data in this.files)) {
        this.files[data] = { };
            // Todo: NEUE JSON DateiSystemcheck
        pfile.readStr(data, 'file', clientID);
        } else {
            L3.updateUser(clientID);
        }
    };

    this.unloadFile = function (clientID){
        this.saveFileOP(this.users[clientID]['file']);
        var tempid = this.users[clientID]['file'];
        //delete this.users[clientID].files[this.users[clientID]['file']];
        this.users[clientID]['file'] = "";
        L2x1.send(clientID, sID.fileunloadtrue, tempid);
    };

    this.updateUser = function (clientID){
        if(!(this.users[clientID]['file'] in this.users[clientID].files)) {
           this.users[clientID].files[this.users[clientID]['file']] = { };
           }
    
        var change = L3.checkChange(this.users[clientID].files[this.users[clientID]['file']], this.files[this.users[clientID]['file']]);
        //debugger;

        for(key in change[0]){
            this.users[clientID].files[this.users[clientID]['file']][change[0][key]] = this.files[this.users[clientID]['file']][change[0][key]];
            L2x1.send(clientID, change[0][key], this.files[this.users[clientID]['file']][change[0][key]]);
        }
        for(key in change[1]){
            delete this.users[clientID].files[this.users[clientID]['file']][change[1][key]];
            L2x1.send(clientID, "2000000005", change[1][key]);
        }
        //L2x1.send(clientID, sID.updated, this.users[clientID]['file']);
        //setTimeout(function(){
            L3.clientUpdated(clientID);
        //}, 1000);
        //this.users[clientID]['files'][this.users[clientID]['file']] = this.files[this.users[clientID]['file']];
    };
    
    this.clientUpdated = function(clientID){
        L2x1.send(clientID, sID.updated, this.users[clientID]['file']);
    }

    this.checkID = function (typ, id){
        var lID = strlen(id);
        var idType = parseInt(id.substr(0, 3));
        if(idType == parseInt(typ) && lID == 10){
            return true;   
        }
        return false; 
    };
    
    this.checkChange = function (array1, array2){
        dlog("EINS: ");
        dlog(array1);
        dlog("ZWEI: ");
        dlog(array2);
        var changes = new Array();
        for(var key in array2){
            var array2value = array2[key];
            var array1value = array1[key];
            if(!array1value){
                changes.push(key);
            } 
            if(array1value && array1value != array2value){
                changes.push(key);
            }
            }
    
        var deletes = new Array();
        
        for(var key in array1){ 
            if(!array2[key]){
                deletes.push(key);
            } 
        }
        var output = new Array();
        output[0] = changes;
        output[1] = deletes;
        
        dlog("CHAN: "+changes);
        dlog("DELE: "+deletes);
        //dlog(output);

        return output;
    };

    this.getChange = function (id){
        var array1 = this.oldFiles[id];
        var array2 = this.files[id];

        var changes = new Array();
        for(var key in array2){
            dlog("OLD => "+key+" VALUE => "+this.oldFiles[id][key]);
            dlog("NEW => "+key+" VALUE => "+this.files[id][key]);
            var array2value = array2[key];
            var array1value = array1[key];
            if(!array1value){
                changes.push(key);
            } 
            if(array1value && array1value != array2value){
                changes.push(key);
            }
            dlog(array1value);
            dlog(array2value);
            }
    
        var deletes = new Array();
        
        for(var key in array1){ 
            if(!array2[key]){
                deletes.push(key);
            } 
        }
        var output = new Array();
        output[0] = changes;
        output[1] = deletes;
        
        dlog(changes);
        dlog(deletes);
        dlog(output);

        return output;
    };

    this.reset = function (clientID){
        var found = false;

        for(key in this.users){
            if(this.users[key]['file'] == this.users[clientID]['file'] && key != clientID){
                found = true;
            }
        }
    
        if(!found && this.users[clientID]['file'] != ""){
            L3.saveFileOP(this.users[clientID]['file']);
        }
    
        if(this.users[clientID]){delete this.users[clientID]};
    };
    
    this.killData = function(fkey){
        var temp = false;
        for(key in this.users){
            if(this.users[key].file == fkey){
                temp = true;
                break;
            }
        }
        if(!temp){
            dlog("KILL DATA TRUE");
            delete this.files[fkey];
        }
    }

    this.saveAll = function(){
        L3.lastkey = false;
        for(key in this.files){
            this.saveFileOP(key);
            L3.lastkey = key;
        }
    };

    this.saveFileOP = function (id){
        pfile.writeStr(id, 'file', 123);
    };

    this.saveFile = function (id, keys){
        log('Datei wird gespeichert: '+id);
        //var change = L3.getChange(id);
        
        /*for(key in keys){
            var data = keys[key].split("#v#");
            if(data[0][0] == '1'){
                keys.splice(key, 1);
            }
        }

        for(key in this.files[id]){
            keys = 1;
            dlog('ID '+key+' der Datei '+id+' gespeichert! =>'+this.files[id][key]);
        }
        var daten = keys.join("#k#");
        //datei.writeStr(id, daten);*/
        
        pfile.writeStr(id, 'file', 123);
    };

    this.checkRight = function (id, clientID){
        //for
    };
};

var L3 = new L3_typ();

//$x = array(123 => "abc", 234 => "bcd", 342 => "cde", 456 => "efg", 777 => "fgh");
//$y = array(123 => "abc", 234 => "bcd", 342 => "ggg", 456 => "efg", 911 => "fgh");

//	
//		getServer         = 2000000000; //Fragt Server nach bestimmter static ID
//    
//    //SEND_TO_SERVER
//	this.clientName        = 2000000001; //Übergibt den Benutzernamen an den Server
//	this.file              = 2000000002; //Übergibt zu landene DateiID an den Server
//    
//    //GET_FROM_SERVER
//	this.fileList       = 2000000003; //Server sendet Dateiliste
//		this.userList          = 2000000004; //Server sendet Userliste

