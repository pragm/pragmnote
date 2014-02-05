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
#       Filename......................: uiControl.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var uiControl_typ = function global_typ(){
    
    this.file = false;
    this.takeFile = false;
    this.loadwait;
    this.loadtimeout = 200;
    this.switchfilebool = false;
    this.switchfile = "";
    this.unloadfile = false;
    this.lastview;
    this.disconnectdata = { };
    this.disconnectdata.bool = false;
    this.disconnectdata.lastDir = "";
    
	this.loadFileOld = function(id){
        this.file = id;
		this.view('editor');
        console.log(1);
        tab.fileOpened(id);
		L3.loadFile(id);
	}
    
    this.loadFile = function(id){
        //data.set('loadinginfo', "loading file");
        this.loadHandler("loading file");
        this.takeFile = id;
		this.view('editor');
        tab.fileOpened(id);
        L3.loadFileCallback(id, function(){
            console.log("Callback => LOADED");
            //data.set('loadinginfo', "");
            uiControl.loadHandlerFin();
        });
    };

	this.unloadFile = function(){
		L3.unloadFileCallback(L3.file, function(){
            console.log('Callback => UNLOADED')
        });
        uiControl.view('files');
	}

	this.loadOtherFile = function(id){
        this.loadFile(id);
        /*this.switchfilebool = true;
        tab.fileOpened(id);
        this.switchfile = id;
        console.log("UNLOADING");
		L3.unloadFile(L3.file);*/
	}

	this.resetUI = function(){
		//document.getElementById("notecon").innerHMTL = global.notecon;
		//document.getElementById("notecon").innerHTML = "";
		//document.getElementById("notecon").innerHTML = global.notecon;
	}

	this.login = function (){
        var loginObject = new Object();
        
        
    
        L3.loginDat.userName     = document.getElementById('loginUsername').value;
        L3.loginDat.userPassword = document.getElementById('loginPassword').value;
        //uiControl.loadHandler();
        //L3.loginDat = loginObject;
		if(L3.firstload){
            //loginObject.legitimationID = data.legitimationID;
    
            //L3.login(loginObject);
            L1.onload();
        } else {
            L3.login();
        }
        
        return false;
	};

	this.loginGood = function (){
		this.view('load');
		L2.send(sID.getServer, sID.fileList);
        if(this.disconnectdata.bool){
            if(data.login.userRight){
                if(data.login.userRight < 5){
                    if(this.disconnectdata.file && this.disconnectdata.file != ""){
                        //dirCreator.openFile(this.disconnectdata.file);
                        this.loadFile(this.disconnectdata.file);
                    }
                    if(this.lastview && this.lastview != ""){
                        this.view(this.lastview);
                    }
                    this.disconnectdata.bool = false;
                }
            }
        }
	};

	this.loginBad = function (){
		alert("Bad Login");
        this.loadHandlerFin();
		this.view('start');
	};
    
    this.addFile = function(name, type){
        //this.view("load");
        L3.addFile(name, data.acutalDir, type);
    };
    
    this.loadHandler = function(text){
        this.loadwait = setTimeout("data.set('loadinginfo', '"+text+"');", this.loadtimeout);
    };
    
    this.loadHandlerFin = function(){
        clearTimeout(this.loadwait);
        data.set('loadinginfo', "");
    };

	this.view = function (code){
        this.lastview = code;
            console.log("Viewchange => "+code);
		switch (code) {
	        case "start":
                this.file = false;
                window.location.href = "#";
				/*document.getElementById('noteconBackground').style.display = "none";
				document.getElementById('loginHTML').style.display = "";
				document.getElementById('pleasewait').style.display = "none";*/
				document.getElementById('fileTabs').style.height = "0px";
                document.title = "pragm note";
				break;
	        case "files":
                this.file = false;
                window.location.href = "#files";
				/*document.getElementById('noteconBackground').style.display = "";
				document.getElementById('loginHTML').style.display = "none";
				document.getElementById('pleasewait').style.display = "none";*/
				document.getElementById('fileTabs').style.height = "50px";
                document.title = "pragm note";
				break;
	        case "editor":
                window.location.href = "#editor";
				/*document.getElementById('loginHTML').style.display = "none";
				document.getElementById('noteconBackground').style.display = "none";
				document.getElementById('pleasewait').style.display = "none";*/
				document.getElementById('fileTabs').style.height = "";
                document.title = data.dirObject[uiControl.takeFile].name;
	            break;
	        case "load":
                //window.location.href = "#loading";
				//document.getElementById('loginHTML').style.display = "none";
				//document.getElementById('noteconBackground').style.display = "none";
				//document.getElementById('pleasewait').style.display = "";
				//document.getElementById('fileTabs').style.height = "50px";
                document.title = "pragm note - please wait";
	            break;
            default:
	            console.log("command '"+code+"' does not exist");
	            break;
	    }
	};
    
    this.connect = function(){
        //L3.login();
    };
    
    this.reconnect = function(){
        this.disconnectdata.bool = true;
    };
    
    this.disconnect = function(){
        this.disconnectdata.view = this.lastview;
        this.disconnectdata.file = uiControl.file;
        this.disconnectdata.lastDir = data.userDir;
        //this.resetUI();
        //this.view('load');
    };
};

var uiControl = new uiControl_typ();
