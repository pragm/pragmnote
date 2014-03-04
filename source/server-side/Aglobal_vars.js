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
#       Filename......................: Aglobal_vars.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/
//var agent = require('webkit-devtools-agent');
var fs = require('fs');

var global_typ = function global_typ(){

	//Mandanten
	this.mSystem = 0;
	this.mAdmin = 1;
	this.mManage = 2;
	this.mDefault = 3;
	this.mGuest = 4;
	this.mNoLogin = 5;
    
    
    //Dateirechte
	this.rAdmin = 0; // Is able to read/write/rename/move/copy/changePermissionsOf file
	this.rWrite = 1; // Is able to read/write/rename/move/copy file
	this.rRead = 2;  // Is able to view/copy file
	this.rDefault = 3;


    this.firewall = new Array();
    this.firewall[this.mSystem] = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    this.firewall[this.mAdmin] = new Array('1', '2', '3', '4', '5');
    this.firewall[this.mManage] = new Array('1', '2', '3', '4', '5');
    this.firewall[this.mDefault] = new Array('1', '2', '3', '4');
    this.firewall[this.mGuest] = new Array(sID.Login, sID.userName, sID.userPassword, sID.clientName, '1');
    this.firewall[this.mNoLogin] = new Array(sID.Login, sID.userName, sID.userPassword, sID.clientName);
    
    //this.config = { };
    //log(fs.readFileSync('config.json', 'UTF8'));
    this.config = JSON.parse(fs.readFileSync('config.json', 'UTF8'));
    log("CONFIG: "+JSON.stringify(this.config));
    //this = 9343;
    //this.config.dir = "./data/";

};

var global = new global_typ();
