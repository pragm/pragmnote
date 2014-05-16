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
#       Filename......................: global_vars.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var global_typ = function global_typ(){
    this.config = JSON.parse(globalconfig);
    this.websocket_server_address_online = 'ws://pragm.dyndns-work.com:9343';
    this.websocket_server_address_local  = 'ws://localhost:9343';
	this.websocket_server_address = 'ws://91.89.70.45:9343'; 
    this.websocket_server_address = 'ws://localhost:9343'; //ws://pragm.dyndns-work.com:9300
    this.websocket_server_address_array = new Array();
    this.websocket_server_address_array[0] = 'ws://localhost:9343'; //ws://pragm.dyndns-work.com:9300 
	this.websocket_server_address_array[3] = 'ws://localhost:9342'; 
	this.websocket_server_address_array[2] = 'ws://demo.pragm.de:9342'; 
	this.websocket_server_address_array[1] = 'ws://demo.pragm.de:9343';
    this.actualServer = -1;
    this.pServer = this.websocket_server_address_array[3];
    this.firstConnect = true;
    this.firstTry = true;
    
    this.get_websocket_server_address = function(){
        if(this.config.addressalert){
            return prompt("WebSocket Server:", this.pServer);
        } else {
            return this.config.serveraddress;
        }
        if(this.firstTry){
            this.firstTry = false;
            //return prompt("WebSocket Server:", this.pServer);
        } else {
            //return prompt("Connection failed! Please retry! WebSocket Server:", this.pServer);
        }
        this.actualServer++;
        if(!this.websocket_server_address_array[this.actualServer]){
            this.actualServer = 0;
        }
        return this.websocket_server_address_array[this.actualServer];
    };
    //var temp = confirm("Befinden Sie sich im lokalen Netzwerk des Servers?");
    //if(temp){
    //    this.websocket_server_address = this.websocket_server_address_local;
    //}

	this.retry_when_disconnected = true;
    this.time = 1;
    this.fps = 60;              //FramesPerSecond für mousemove
    this.chX = 0;             //X-Position des notecon div's
    this.chY = 50;              //Y-Position des notecon div's
    this.textboxXdif = 8;       //X-Verschiebung einer Textbox beim erstellen
    this.textboxXdif = 18;      //Y-Verschiebung einer Textbox beim erstellen
    this.websocket_slow_down = 10; //Verlangsame reconnect Versuche nach n Versuchen
    this.websocket_slow_time = 500; // nach 20 Sekunden Reconnect
    this.draganddroprealtime = false;
    this.difcut = 457;
    this.notecon = '<div class="noteheadline" contenteditable="true" oninput="staticItems.saveid(this.id);" onfocus="staticItems.focus();" onblur="staticItems.blur();" id="1031111111">My Headline</div><div class="notedateline" contenteditable="true" oninput="staticItems.saveid(this.id);"  onfocus="staticItems.focus();" onblur="staticItems.blur();"id="1031111112">Mittwoch 7.November 2012<br>12:42</div>';
    
    this.setTime = function(time){
        this.time = time;
    };
};


var global = new global_typ();


