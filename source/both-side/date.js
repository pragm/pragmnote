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
#       Developer/Date................: Dustin Robert Hoffner, 21.01.2014
#       Filename......................: date.js
#       Version/Release...............: 0.6xx
#
******************************************************************************************/

var date_typ = function date_typ(){

	this.day = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	this.month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    
    this.fileDate = function(){
	    var now = new Date(); // Muster: Sunday 4.December 2013<br>22:42
        var Std = now.getHours();
        var Min = now.getMinutes();
        var StdAusgabe = ((Std < 10) ? "0" + Std : Std);
        var MinAusgabe = ((Min < 10) ? "0" + Min : Min);
        return this.day[now.getDay()]+" "+now.getDate()+"."+this.month[now.getMonth()]+" "+now.getFullYear()+"<br>"+StdAusgabe+":"+MinAusgabe; 
	};

};

var date = new date_typ();

