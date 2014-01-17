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
#       Filename......................: testscripts.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


function stateupdate(){
	var text;
	switch(L1.state){
	case 0:
		text = "Offline";
		document.getElementById('state').style.color = "#ff0000";
		break;
	case 1:
		text = "Verbindung wird hergestellt";
		document.getElementById('state').style.color = "#FFBF00";
		break;
	case 2:
		text = "Online";
		document.getElementById('state').style.color = "#04B404";
		break;
	default:
		text = "Fehler!";
		document.getElementById('state').style.color = "#ff0000";
		break;
	}
	document.getElementById('state').innerHTML = text;
}

function newmsg(msg){
	document.getElementById('msg').innerHTML = msg;
}

var intervall; 
var count3=0;
    
function startTest(){
    intervall = window.setInterval("sendTest();", 0);
}

function sendTest(){
    tee = count3;
    L2.send(1001234911, 'Hallo ich bin nicht '+tee+' wirklich Toll');
    count3++;
}

function stopTest(){
    window.clearInterval(intervall);
}

function onmousemove(){
    alert(1);
}