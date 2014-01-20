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
    
    this.loadwait;
    this.loadtimeout = 100;
    this.switchfilebool = false;
    this.switchfile = "";
    this.unloadfile = false;
    
	this.loadFile = function(id){
        tab.fileOpened(id);
		L3.loadFile(id);
		this.view('editor');
	}

	this.unloadFile = function(){
		L3.unloadFile(L3.file);
        this.unloadfile = true;
	}

	this.loadOtherFile = function(id){
        this.switchfilebool = true;
        tab.fileOpened(id);
        this.switchfile = id;
		L3.unloadFile(L3.file);
	}

	this.resetUI = function(){
		//document.getElementById("notecon").innerHMTL = global.notecon;
		document.getElementById("notecon").innerHTML = "";
		document.getElementById("notecon").innerHTML = global.notecon;
	}

	this.login = function (){
		var loginObject = new Object();

		loginObject.userName     = document.getElementById('loginUsername').value;
		loginObject.userPassword = document.getElementById('loginPassword').value;
		loginObject.legitimationID = data.legitimationID;

		data.loginObject = loginObject;
        uiControl.loadHandler();
		L3.login(loginObject);
		return false;
	};

	this.loginGood = function (){
		this.view('load');
		L2.send(sID.getServer, sID.fileList);
	};

	this.loginBad = function (){
		alert("Bad Login");
		this.view('start');
	};
    
    this.addFile = function(name, type){
        //this.view("load");
        L3.addFile(name, lastDir, type);
    };
    
    this.loadHandler = function(){
        this.loadwait = setTimeout("uiControl.view('load');", this.loadtimeout);
    };
    
    this.loadHandlerFin = function(){
        clearTimeout(this.loadwait);
    };

	this.view = function (code){
		switch (code) {
	        case "start":
				document.getElementById('noteconBackground').style.display = "none";
				document.getElementById('loginHTML').style.display = "";
				document.getElementById('pleasewait').style.display = "none";
				document.getElementById('fileTabs').style.height = "50px";
                document.title = "pragm note";
				break;
	        case "files":
				document.getElementById('noteconBackground').style.display = "";
				document.getElementById('loginHTML').style.display = "none";
				document.getElementById('pleasewait').style.display = "none";
				document.getElementById('fileTabs').style.height = "50px";
                document.title = "pragm note";
				break;
	        case "editor":
				document.getElementById('loginHTML').style.display = "none";
				document.getElementById('noteconBackground').style.display = "none";
				document.getElementById('pleasewait').style.display = "none";
				document.getElementById('fileTabs').style.height = "";
                document.title = getFileName(testDir.split(":"), L3.file);
	            break;
	        case "load":
				//document.getElementById('loginHTML').style.display = "none";
				//document.getElementById('noteconBackground').style.display = "none";
				document.getElementById('pleasewait').style.display = "";
				//document.getElementById('fileTabs').style.height = "50px";
                document.title = "pragm note - please wait";
	            break;
	        default:
	            console.log("command '"+code+"' does not exist");
	            break;
	    }
	};
};

var uiControl = new uiControl_typ();
