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
#       Filename......................: data.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var data_typ = function data_typ(){
    
	this.fileList;
	this.files = { }; //Struktur: files[fileID][contentID] = content;
	this.users;
    this.legitimationID = "";
    this.dirObject;
    this.userDir = "";
    this.acutalDir = "";
    this.callbacks = { };
    this.loadinginfo = "";
    this.alertinfo = "";
    
    this.databind = function(object, callback){
        this.callbacks[object] = callback;
        callback(this[object]);
    };
    
    this.set = function(object, value){
        this[object] = value;
        if(this.callbacks[object]){
            this.callbacks[object](value);
        }
    };
    
    this.update = function(object){
        if(this.callbacks[object]){
            this.callbacks[object](data[object]);
        }
    };
    
    this.edited_sync = function(fileID, contentID){
        if(fileID == uiControl.file){
            var type = contentID.substr(0,3);
            switch(type){
                case '100':
                    textbox.setid(contentID, data.files[fileID][contentID]);
                    break;
                case '103':
                    staticItems.setid(contentID, data.files[fileID][contentID]);
                    break;
            }
        } else {
            console.log("Error: UI is not in sync with L3");
        }
    };
    
    this.edited_UI = function(contentID){
        //L3.send(contentID);
        L3.uiEdit(uiControl.file, contentID);
    };
    
    this.reset = function(){
        this.fileList = "";
	    this.files = { };
	    this.users = "";
        this.legitimationID = "";
    }
        
    this.delete_UI = function(id){
        delete data.files[L3.file][id];
        L3.delete(id);
    }
        
    this.delete_sync = function(id){
        delete data.files[L3.file][id];
        textbox.removeElement("editarea"+id);
    }
    
    
    this.showCache = function(){
        if(uiControl.file){
            if(!data.files[uiControl.file]) {
                data.files[uiControl.file] =  { };
            } else {
                for(key in data.files[uiControl.file]){
                    data.edited_sync(uiControl.file, key);
                }
            }
        } else {
            console.log("Error: uiControl.file needs to be prepared before switching UI!");
        }
    };
    
};
var data = new data_typ();
