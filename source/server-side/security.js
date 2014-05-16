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
#       Filename......................: security.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var secure_typ = function secure_typ(){

	this.userRights = new Array();
	this.userLegitimationIDs = new Array();

	this.check = function(clientID) {
        return this.userRights[clientID];
	};

	this.login = function(clientID, loginObject){
		if(this.userRights[clientID] == global.mNoLogin){
			if(this.userLegitimationIDs[clientID] == loginObject.legitimationID){
				pfile.checkLogin(clientID, loginObject.userName, loginObject.userPassword);
			} else {
				L2x1.send(clientID, sID.Login, this.userRights[clientID]);
				this.legitimationSet(clientID);
			}
		}
	};

	this.loginData = function(clientID, loginObject){
		this.userRights[clientID] = loginObject.userRight;
		if(this.userRights[clientID] == global.mNoLogin){
			this.legitimationSet(clientID);
			log("LOGIN FAILED => User '"+loginObject.username+"' ID '"+loginObject.userID+"' Mandant '"+loginObject.userRight+"'");
		} else {
			this.legitimationSetX(clientID);
			log("LOGIN => User '"+loginObject.username+"' ID '"+loginObject.userID+"' Mandant '"+loginObject.userRight+"'");
		}
        L3.users[clientID]['userID'] = loginObject.userID;
        L3.users[clientID]['username'] = loginObject.userID;
		L2x1.send(clientID, sID.Login, JSON.stringify(loginObject));
	};

	this.legitimationSet = function (clientID){
		this.userLegitimationIDs[clientID] = this.makeid();
		L2.send(clientID, sID.legitimationID, this.userLegitimationIDs[clientID]);
	};

	this.legitimationSetX = function (clientID){
		this.userLegitimationIDs[clientID] = this.makeid();
		//L2.send(clientID, sID.legitimationID, this.userLegitimationIDs[clientID]);
	};

	this.reset = function(clientID){
		log("CONNECTION LOST => User '"+ L3.users[clientID]['username']+"' ID '"+L3.users[clientID]['userID']+"' Mandant '"+this.userRights[clientID]+"'");
		if(this.userRights[clientID]){delete this.userRights[clientID]};
	};

	this.makeid = function (){
	   var id = (Math.random()*100000000000000000);
	   id = id.toString()+"0000000000";
	   id = id.substring(0,16);
	   return id;
	   };

	this.init = function (clientID){
        this.userRights[clientID] = global.mNoLogin;
	};
};

var secure = new secure_typ();
