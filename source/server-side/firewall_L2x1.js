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
#       Filename......................: firewall_L2x1.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var L2x1_typ = function L2x1_typ(){

	this.firewall = [];
	this.mandant = global.mNoLogin;
	this.id_pre = "2";
	
	this.send = function(clientID, id, data) {
        try{
            var mandant = secure.check(clientID);

            this.firewall = global.firewall[mandant];

            this.id_pre = id.substr(0, 1);

            if(this.firewall.indexOf(this.id_pre) >= 0 || this.firewall.indexOf(id) >= 0){
                L2.send(clientID, id, data);
            } else {
                error.report(4, "Firewall blocked send ID "+id+" of User "+clientID+" Mandant "+mandant);
            }
        } catch(e){
            console.log("=> FIREWALL CRASH SEND=> ClientID="+clientID+" ID="+id);
            console.log("=> FIREWALL CRASH SEND=> Mandant="+JSON.stringify(secure.check(clientID))+" Firewall="+JSON.stringify(global.firewall[secure.check(clientID)]));
            console.log(e);
            console.error("FIRE SEND");
        }
     };
	
	this.recieve = function(clientID, id, text) {
        try{
            var mandant = secure.check(clientID);

            this.firewall = global.firewall[mandant];

            this.id_pre = id.substr(0, 1);

            if(this.firewall.indexOf(this.id_pre) >= 0 || this.firewall.indexOf(id) >= 0){
                L3.recieve(clientID, id, text);
            } else {
                error.report(4, "Firewall blocked recieved ID "+id+" of User "+clientID+" Mandant "+mandant);
            }
        } catch(e){
            console.log("=> FIREWALL CRASH RESS=> ClientID="+clientID+" ID="+id);
            console.log("=> FIREWALL CRASH RESS=> Mandant="+JSON.stringify(secure.check(clientID))+" Firewall="+JSON.stringify(global.firewall[secure.check(clientID)]));
            console.log(e);
            console.error("FIRE RESS");
        }
	 };
};

var L2x1 = new L2x1_typ();
