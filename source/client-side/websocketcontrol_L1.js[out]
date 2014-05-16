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
#       Filename......................: websocketcontrol_L1.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var oTime = 1;

var L1_typ = function L1_typ(){
	
	this.Server;
	this.state;// test
	
	this.send = function(text) {
		this.Server.send('message',text);
        
        aTime = new Date().getTime();
        nTime = parseInt(aTime) - parseInt(global.time);
        //console.log("TIME: "+nTime);
		};
 
	this.onload = function() {
		L1.state = 1;
        this.countErrors = 0;
		//update_websocketstate();  //Test UI
		globalEvent.state(2);
        var address = global.get_websocket_server_address();
		this.Server = new SimplebSocket(address);
		this.Server.bind('open', function() {
            console.log("open");
			L1.state = 2;
            var L2 = new L2_typ();
            L2.init();
            globalEvent.state(1);
            if(global.firstConnect){
                uiControl.view('start');
                global.firstConnect = false;
            }
			//update_websocketstate();  //Test UI
			});
	 
		this.Server.bind('close', function( data ) {
			L1.state = 0;
			//update_websocketstate();  //Test UI
			globalEvent.state(2);
			this.Server = false;
			L2.reset();
            this.countErrors++;
			if(global.retry_when_disconnected){
                if(this.countErrors<global.websocket_slow_down){
				    L1.onload();
                } else {
                    setTimeout("L1.onload();", global.websocket_slow_time);
                }
				}
			});
	 
		this.Server.bind('message', function( msg ) {
            //console.log(msg);
			L2.recieve(msg);
			//newmsg(msg); //Test UI
			});
	     
		this.Server.connect();
		};
	
};

var L1 = new L1_typ();

		