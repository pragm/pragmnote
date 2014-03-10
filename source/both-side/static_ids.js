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


var sID_typ = function sID_typ(){
    //bei veränderung auch veränderungen in sync_L3.php vornehemen!
    //GET_FROM_SERVER
	this.idLength          = 10; //Zeichenlänge einer ID

	this.getServer         = "2000000000"; //Fragt Server nach bestimmter static ID
    
    //SEND_TO_SERVER
	this.clientName        = "2000000001"; //Übergibt den Clientnamen der Instanz an den Server
	this.file              = "2000000002"; //Übergibt zu landene DateiID an den Server
	this.userName          = "2000000007"; //Übergibt den Login Benutzernamen an den Server
	this.userPassword      = "2000000008"; //Übergibt das Login Passwort an den Server
	this.legitimationID    = "2000000009"; //Übergibt das Login Passwort an den Server

	//SEND_TO_SERVER ACTIONS WITH LEGITIMATION ID
	this.Login 			   = "2001000000"; //Übergabe und Rückgabe des Login Objektes
	this.unloadFile		   = "2001000001"; //Schließt die Datei
	this.addFile		   = "2001000002"; //Fügt eine Datei ins Verzeichnis hinzu
	this.deleteFile		   = "2001000003"; //Löscht eine Datei von ID
	this.killServer		   = "2001000004"; //Löscht eine Datei von ID
	this.moveFile		   = "2001000005"; //Löscht eine Datei von ID
	this.copyFile		   = "2001000006"; //Löscht eine Datei von ID
    this.checkKillLink     = "2001000007"; //Prüft ob Datei noch existiert und löscht wenn nicht den link
    this.fileInfo          = "2001000008";

    
    //GET_FROM_SERVER
	this.fileList          = "2000000003"; //Server sendet Dateiliste
	this.userList          = "2000000004"; //Server sendet Userliste
	this.deleteID          = "2000000005"; //Server sendet zu löschende ID
	this.message           = "2000000006"; //Server sendet anzuzeigende Nachricht
	this.testid			   = "2000000010";
    this.updated           = "2000000011"; //Server meldet, dass Datei fertig geladen hat.
    this.fileunloadtrue    = "2000000012"; //Server says, that closing file completed GitHub => #5
    
	/*
	LEGITIMATION ID: Idee: 
	- wird vom server erstellt und gesendet
	- kann nur einmal verwendet werden für wichtige sachen (Login)
	- danach wird neue benötigt
	- wenn falsch 24h IP-Ban 
	*/
};

var sURL_typ = function sURL_typ(){
    //bei veränderung auch veränderungen in sync_L3.php vornehemen!
    //GET_FROM_SERVER
	//this.getUserDir        = "hex/pragm/dirServer/dirServer.php?jop=getUserDir"; //URL für UserID
	this.fileserver = {
  		hostname: 'hex',
  		port: 80,
 		path: '/pragm/dirServer/dirServer.php',
  		method: 'POST'
	};

};

var sURL = new sURL_typ();
var sID = new sID_typ();
