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
#       Filename......................: pDrawInit.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var pDrawInit_typ = function pDrawInit_typ(){
    
	this.fileList;
	this.files = new Array(); //Struktur: files[fileID][contentID] = content;
	this.users;
    
    this.mousemove = function(){
        var Ereignis = window.event;
        pDrawFoc.move(Ereignis);
    };
    
    this.mouseup = function(){
    	Ereignis = window.event;
    };
    
    this.reset = function(){
        this.fileList = "";
	    this.files = new Array();
	    this.users = "";
    }
        
    this.delete_UI = function(id){
        data.files[L3.file].splice(id, 1);
        L3.delete(id);
    }
        
    this.delete_sync = function(id){
        data.files[L3.file].splice(id, 1);
        textbox.removeElement("editarea"+id);
    }
    
};

var pDrawInit = new pDrawInit_typ();