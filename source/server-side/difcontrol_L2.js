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
#       Filename......................: difcontrol_L2.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var L2_typ = function L2_typ(){

	this.cache = new Array();
    
    this.old = new Object();
    this.old.Stext;
    this.old.Scache;
    this.old.dif = new Object();
    this.old.dif.pos1 = 0;
    this.old.dif.pos2 = 0;
    this.old.dif.edit = "";
    this.lastSendID = new Array();
    this.lastReceiveID = new Array();
	
	this.send = function(clientID, id, text) {
        //global.setTime(new Date().getTime());
        text = text.toString(); 

		if(typeof this.cache[clientID][id] == 'undefined'){
			this.cache[clientID][id] = "";
		}
        var oldText = this.cache[clientID][id];
        this.cache[clientID][id] = text;
        
        if(oldText == this.old.Scache && text == this.old.Stext){
            this.newdif.pos1 = this.old.dif.pos1;
            this.newdif.pos2 = this.old.dif.pos2;
            this.newdif.edit = this.old.dif.edit;
        } else {
            this.newdif = dif.generateOpt(text, oldText);
            this.old.dif.pos1 = this.newdif.pos1;
            this.old.dif.pos2 = this.newdif.pos2;
            this.old.dif.edit = this.newdif.edit;
        }

		this.newmd5 = net.hashCode(text);

		//this.cache[clientID][id] = text;
		
		this.pos1 = convert.int_to_string(this.newdif.pos1);
		this.pos2 = convert.int_to_string(this.newdif.pos2);
		
		this.init = convert.int_to_string(parseInt(this.pos1.length+''+this.pos2.length));
        
		this.output = id+''+this.newmd5+''+this.init+''+this.pos1+''+this.pos2+''+this.newdif.edit;
        
        if(this.output.length<=28 && this.lastSendID[clientID] == id){
            this.output = this.output.substr(10);
        }
        
        this.lastSendID[clientID] = id;
		L1.send(clientID, this.output);
		//return this.output;
		};
	
	this.recieve = function(clientID, text) {
        
        if(text[0] == '='){
            this.id = text.substr(1,10);
            log("Clearing Cache of ID "+this.id+"");
            this.cache[clientID][this.id] = "";
            return;
        }
		
        if(text.length <= 18){
            text = this.lastReceiveID[clientID]+text;
        }
        
		this.id = text.substr(0, 10);
		text =  text.substr(10);
		
        this.lastReceiveID[clientID] = this.id;
        
		//this.work = text.substr(0, 1);
		//text =  text.substr(1);
		
		this.md5 = text.substr(0, net.hashlength);
		text =  text.substr(net.hashlength);
		
		this.init = String(convert.string_to_int(text.substr(0, 1)));
		text =  text.substr(1);
		
		this.pos1x = parseInt(this.init.substr(0, 1));
		this.pos2x = parseInt(this.init.substr(1, 1));

		this.pos1 = convert.string_to_int(text.substr(0, this.pos1x));
		this.pos2 = convert.string_to_int(text.substr(this.pos1x, this.pos2x));

		text =  text.substr(this.pos1x+this.pos2x);
		this.edit = text;
		
		if(typeof this.cache[clientID][this.id] == 'undefined'){
			this.cache[clientID][this.id] = "";
		}
		
		this.oldcon = this.cache[clientID][this.id];
	
		
		this.newcon = dif.buildnew(this.pos1, this.pos2, this.edit, this.oldcon);  // this.work ist draussen
		
		this.newmd5 = net.hashCode(this.newcon);
		
		if(this.newmd5 != this.md5){
            this.cache[clientID][this.id] = "";
            L1.send(clientID, "="+this.id);
			log("CLIENT=>"+clientID+" ID=>"+this.id+" NEWCON=>"+this.newcon.substr(0,10)+"..."); //.substr(0,10)
			log("ID => "+this.id+" HASH => "+this.md5+" INIT => "+this.init+" P1 => "+this.pos1+" P2 => "+this.pos2+" EDIT => "+this.edit+" OLD => "+this.oldcon);
			error.report(0, "HASHES are nor equal! ID: "+this.id+" => Cache cleared!");
		} else {
			this.cache[clientID][this.id] = this.newcon;
            L2x1.recieve(clientID, this.id, this.newcon); 
            //newmsg(this.newcon);
		}
		dlog("CLIENT=>"+clientID+" ID=>"+this.id+" NEWCON=>"+this.newcon.substr(0,10)+"..."); // .substr(0,10)
		
		
		};
		
	this.reset = function(clientID) {
		this.cache[clientID] = new Array();
        L3.reset(clientID);
        secure.reset(clientID);
		};	
};

var L2 = new L2_typ();

//var abc = new L2_typ();

//public functions 

//exports.send = L2.send;
//exports.recieve = L2.recieve;
//exports.reset = L2.reset;
//exports.init = L2.init;
