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
#       Filename......................: error_reports.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var error_typ = function error_typ(){
	this.report = function(number, info){
		this.text;
		switch(number){
		case 0:
			this.text = "Fatalerror";
			break;
		case 1:
			this.text = "Sonstige";
			break;
		case 2:
			this.text = "Unbekannte Package ID";
			break;
		default:
			this.text = "Fatalerror";
			break;
		}
		console.log("Error: ["+number+"] => "+this.text+"; "+info+";");
	};
};

var error = new error_typ();

