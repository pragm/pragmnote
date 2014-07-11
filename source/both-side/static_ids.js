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
#       Filename......................: static_ids.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var sID_typ = function sID_typ() {
    //bei verÃ¤nderung auch verÃ¤nderungen in sync_L3.php vornehemen!
    //GET_FROM_SERVER
    this.idLength = 10; //ZeichenlÃ¤nge einer ID

    this.getServer = "2000000000"; //Fragt Server nach bestimmter static ID

    //SEND_TO_SERVER
    this.clientName = "2000000001"; //Ãœbergibt den Clientnamen der Instanz an den Server
    this.file = "2000000002"; //Ãœbergibt zu landene DateiID an den Server
    this.userName = "2000000007"; //Ãœbergibt den Login Benutzernamen an den Server
    this.userPassword = "2000000008"; //Ãœbergibt das Login Passwort an den Server
    this.legitimationID = "2000000009"; //Ãœbergibt das Login Passwort an den Server
    this.userEdit = "2000000016"; //Ãœbergibt das Login Passwort an den Server

    //SEND_TO_SERVER ACTIONS WITH LEGITIMATION ID
    this.Login = "2001000000"; //Ãœbergabe und RÃ¼ckgabe des Login Objektes
    this.unloadFile = "2001000001"; //SchlieÃŸt die Datei
    this.addFile = "2001000002"; //FÃ¼gt eine Datei ins Verzeichnis hinzu
    this.deleteFile = "2001000003"; //LÃ¶scht eine Datei von ID
    this.killServer = "2001000004"; //LÃ¶scht eine Datei von ID
    this.moveFile = "2001000005"; //LÃ¶scht eine Datei von ID
    this.copyFile = "2001000006"; //LÃ¶scht eine Datei von ID
    this.checkKillLink = "2001000007"; //PrÃ¼ft ob Datei noch existiert und lÃ¶scht wenn nicht den link
    this.fileInfo = "2001000008";
    this.getUserName = "2001000009";
    this.createAccount = "2001000010"; //Sends and Returns Account Information
    this.deleteInviteKey = "2001000011"; //Sends and Returns Account Information
    this.setUserActive = "2001000012"; //Sends and Returns Account Information
    this.createInviteKey = "2001000013";
    this.chPassword = "2001000014";
    this.chUserConfig = "2001000015";
    this.getUserId = "2001000016";
    this.deleteNotification = "2001000017";


    //GET_FROM_SERVER
    this.fileList = "2000000003"; //Server sendet Dateiliste
    this.userList = "2000000004"; //Server sendet Userliste
    this.deleteID = "2000000005"; //Server sendet zu lÃ¶schende ID
    this.message = "2000000006"; //Server sendet anzuzeigende Nachricht
    this.testid = "2000000010";
    this.updated = "2000000011"; //Server meldet, dass Datei fertig geladen hat.
    this.fileunloadtrue = "2000000012"; //Server says, that closing file completed GitHub => #5
    this.fileUserList = "2000000013"; //Server sends userlist of a file to client
    this.returnUserName = "2000000014";
    this.fileRigths = "2000000015"; //Server sends userlist of a file to client
    this.ownclientID = "2000000017";
    this.returnUserId = "2000000018";

    /*
    	LEGITIMATION ID: Idee: 
    	- wird vom server erstellt und gesendet
    	- kann nur einmal verwendet werden fÃ¼r wichtige sachen (Login)
    	- danach wird neue benÃ¶tigt
    	- wenn falsch 24h IP-Ban 
    	*/
};

var sURL_typ = function sURL_typ() {
    //bei verÃ¤nderung auch verÃ¤nderungen in sync_L3.php vornehemen!
    //GET_FROM_SERVER
    //this.getUserDir        = "hex/pragm/dirServer/dirServer.php?jop=getUserDir"; //URL fÃ¼r UserID
    this.fileserver = {
        hostname: 'hex',
        port: 80,
        path: '/pragm/dirServer/dirServer.php',
        method: 'POST'
    };

};

var sURL = new sURL_typ();
var sID = new sID_typ();