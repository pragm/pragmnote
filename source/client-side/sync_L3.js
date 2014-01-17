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
    
    this.file = false;
    this.beforeEvent = "loadFirst";
    this.loadedFile = false;
	
    this.init = function(){
        //Random generierter Username 
        if(!this.clientName) {
        this.clientName = (Math.random()*100000000000000000);
	    this.clientName = this.clientName.toString();
	    this.clientName = this.clientName.substring(0, 5);
        }
        //return this.clientName;
        
        L2.send(sID.clientName, this.clientName);
        
        //L2.send(sID.getServer, String(sID.fileList));
        
    };
    
    this.recieve = function(id, data){
        this.aID = String(id);
        this.idType = parseInt(this.aID.substr(0, 1));
        
        if(this.aID.length!=10) {
            
          error.report(2, id);
         return false;   
        }
        
        switch(this.idType){
          case 1:
                L3.saveContent(id, data);
                break;
          case 2:
                L3.saveData(id, data);
                if(id==sID.fileList){globalEvent.onConnect();}
                break;
          default:
                error.report(2, id);
                break;
        }
    };
    
    this.saveContent = function(id, daten){
        //if(!check.id(300, this.file)){
        //    error.report(2, this.file);
        //    return false;
        //}
        //console.log(id);
        //console.log(daten);
        //console.log(L3.file);
        data.files[L3.file][id] = daten;
        
        data.edited_sync(this.file, id);
        
        };
    
    this.saveData = function(id, daten){
        //if(!check.id(300, this.file)){
        //    error.report(2, this.file);
        //    return false;
        //}
        id = ""+id+"";

        switch(id){
            case sID.fileList:
                data.fileList = daten;
                testDir = daten;
                switch(this.beforeEvent){
                        case "loadFirst":
                            lastDir = data.login.userID;
                            mainDir = data.login.userID;
                            showDir(mainDir);
                            refreshShow();
                            uiControl.loadHandlerFin();
                            uiControl.view('files');
                            this.beforeEvent = "";
                        break;
                        case "addFile":
                            refreshShow();
                            uiControl.loadHandlerFin();
                            uiControl.view('files');
                            this.beforeEvent = "";
                        break;
                        case "refresh":
                            refreshShow();
                            uiControl.loadHandlerFin();
                            uiControl.view('files');
                        break;
                        case "":
                            refreshShow();
                        break;
                }
                break;
            
            case sID.userList:
                data.users = daten;
                break;
                
            case sID.deleteID:
                data.delete_sync(daten);
                break;

            case sID.message:
                alert(daten);
                break;

            case sID.Login:
                data.login = JSON.parse(daten);
                if(data.login.userRight < 5){
                    uiControl.loginGood();
                } else {
                    uiControl.loginBad();
                }
                break;

            case sID.legitimationID:
                data.legitimationID = daten;
                break;
                
            case sID.updated:
                if(this.loadedFile){
                    uiControl.loadHandlerFin();
                    uiControl.view('editor');
                    this.loadedFile = false;
                }
                break;
                
            default:
                error.report(2, id);
                return false;
                break;
        }
        
        
        data.edited_sync(this.file, id);
        
        };
    
    this.loadFile = function(id){
        L3.file = id;
        if(!data.files[id]) {
            data.files[id] = new Array();
        } else {
            for(key in data.files[id]){
                data.edited_sync(id, key);
            }
        }
        uiControl.loadHandler();
        this.loadedFile = true;
        L2.send(sID.file, id);  
    };

    this.unloadFile = function(id){
        L2.send(sID.unloadFile, '');  
    };
    
    this.send = function(id){
        L2.send(id, data.files[this.file][id]);
    };

    this.login = function(obj){
        L2.send(sID.Login, JSON.stringify(obj));
    }
    
    this.delete = function (id){
        L2.send(sID.deleteID, id);
    };

    this.addFile = function(name, dir, type){
        var temp = new Object();
        temp.name = name;
        temp.dir = dir;
        temp.type = type;
        this.beforeEvent = "addFile";
        uiControl.loadHandler();
        L2.send(sID.addFile, JSON.stringify(temp));
    }
    
    this.refreshDir = function(){
        this.beforeEvent = "refresh";
        uiControl.loadHandler();
        L2.send(sID.getServer, sID.fileList);
    };
    
     this.reset = function(){
         data.reset();
         this.file = false;
         if(data.login){
             if(data.login.userRight){
                if(data.login.userRight < 5){
                    uiControl.view('load');
                    setTimeout("location.reload();", 5000);
                }
             }
         }
     };
        
    };
    
   
var L3 = new L3_typ();
    
