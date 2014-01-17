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
#       Filename......................: hash.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var hash_typ = function hash_typ(){

	this.old = function(e){for(var r=0,i=0;i<e.length;i++)r=(r<<5)-r+e.charCodeAt(i),r&=r;return r};
    
    this.a = function(e){
	   var r = 0;
	   var l = e.length;
	   for(i=0; i<l; i++){
           r = (r<<5)-r+e.charCodeAt(i);
           r &= r;
	   }
	   return r;
	};

	this.generate = function (e){
		var dat = parseInt(this.a(e));
		if(dat<0){
			dat = dat.toString();
			var ndat = "";
			for(i=1;i<dat.length;i++){
				ndat += (10-parseInt(dat[i])).toString();
				}
			dat = parseInt(ndat);
			}
		var dat = convert.int_to_string(dat);
		var x = dat.length
		if(x>6){dat = dat.substr(0,6);}else{
			x = 6-x;
			while(x>0){
				dat = "0"+dat;
				x--;
				}
			}
		return dat;
	}

};

var hash = new hash_typ();

