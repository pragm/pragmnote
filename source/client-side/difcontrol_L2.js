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
    this.lastSendID;
    this.lastReceiveID;
	
	this.send = function(id, text) {
        global.setTime(new Date().getTime());
        
        //console.log(id);
        //console.log(text);
		
		if(!this.cache[id]){
			this.cache[id] = "";
		}
        var oldText = this.cache[id];
        this.cache[id] = text;
        
		this.newdif = dif.generateOpt(text, oldText);

		this.newmd5 = net.hashCode(text);
		
		//this.cache[id] = text;
		
		this.pos1 = convert.int_to_string(this.newdif.pos1);
		this.pos2 = convert.int_to_string(this.newdif.pos2);
		
		this.init = convert.int_to_string(parseInt(this.pos1.length+''+this.pos2.length));
		
		this.output = id+''+this.newmd5+''+this.init+''+this.pos1+''+this.pos2+''+this.newdif.edit;
		
        if(this.output.length<=28 && this.lastSendID == id){
            this.output = this.output.substr(10);
        }
        this.lastSendID = id;
		L1.send(this.output);

        //console.log(this.output);
		};
	
	this.recieve = function(text) {
        if(text[0] == '='){
            this.id = text.substr(1,10);
            console.log("Clearing Cache of ID "+this.id+"");
            this.cache[this.id] = "";
            return;
        }        
        
        if(text.length <=18){
            text = this.lastReceiveID+text;
        }
        
		this.id = text.substr(0, 10);
		text =  text.substr(10);
        
        this.lastReceiveID = this.id;
		
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
		
		if(!this.cache[this.id]){
			this.cache[this.id] = "";
		}
		
		this.oldcon = this.cache[this.id];
		
		this.newcon = dif.buildnew(this.pos1, this.pos2, this.edit, this.oldcon); // this.work ist draussen
		
		this.newmd5 = net.hashCode(this.newcon);
		
		if(this.newmd5 != this.md5){
			error.report(0, "HASHES are not equal! ID:"+this.id);
            this.cache[this.id] = "";
            L1.send("="+this.id);
		} else {
			this.cache[this.id] = this.newcon;
            L3.recieve(this.id, this.newcon); 
            //newmsg(this.newcon);
		}
		
		
		
		};
    
    this.errorhandling = function() {
        
    }
		
	this.reset = function() {
		this.cache = new Array();
        L3.reset();
		};	
    
    this.init = function(){
        //var L3 = new L3_typ();
        L3.init();
    }
};

var L2 = new L2_typ();

