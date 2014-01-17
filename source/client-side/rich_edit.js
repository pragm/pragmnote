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
#       Filename......................: rich_edit.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var rich_typ = function rich_typ (){

	this.fontchangetimer;
	this.dropdownA = 0;
	this.dropdownB = 0;
	this.sizechangetimer;
	this.showtitles = 0;
	this.showtitletimer;
	this.unshowtitletimer;

	this.fontEdit = function(x,y){
		document.execCommand(x,"",y);
		document.STOP_EXEC_COMMAND = true; 
		//checkedit(aktiveid);
	};

	this.fontchangepos = function(){
		var widthOff = document.getElementById('fontchangeButton').offsetWidth;
		var leftOff  = document.getElementById('fontchangeButton').offsetLeft;
		var posOff = leftOff+(widthOff/2)-55+global.chX;
		document.getElementById('fontchange').style.left = posOff;
	};

	this.fontchange = function(s){
	if(s==1){
		document.getElementById('fontchange').style.height = "";
		document.getElementById('fontchange').style.zIndex = 15;
		document.getElementById('fontchangeButton').className = "editlidown";
		clearTimeout(rich.fontchangetimer);
		rich.unshowtitlenow();
		rich.fontchangepos();
		rich.dropdownA=1;
		}
	if(s==0){
		document.getElementById('fontchange').style.height = "0px";
		document.getElementById('fontchangeButton').className = "editli";
		document.getElementById('fontchange').style.zIndex = 7;
		rich.dropdownA=0;
		}
	};
	
	this.fontchangehide = function(){
		rich.fontchangetimer = setTimeout("rich.fontchange(0);", 10);
	};

	this.sizechangepos = function(){
		var widthOff = document.getElementById('sizechangeButton').offsetWidth;
		var leftOff  = document.getElementById('sizechangeButton').offsetLeft;
		var posOff = leftOff+(widthOff/2)-55+global.chX;
		document.getElementById('sizechange').style.left = posOff;
	};

	this.sizechange = function(s){
	if(s==1){
		document.getElementById('sizechange').style.height = "";
		document.getElementById('sizechange').style.zIndex = 15;
		document.getElementById('sizechangeButton').className = "editlidown";
		clearTimeout(rich.sizechangetimer);
		//rich.unshowtitlenow(); #WET#
		rich.sizechangepos();
		rich.dropdownB=1;
		}
	if(s==0){
		document.getElementById('sizechange').style.height = "0px";
		document.getElementById('sizechangeButton').className = "editli";
		document.getElementById('sizechange').style.zIndex = 7;
		rich.dropdownB=0;
		}
	};
	
	this.sizechangehide = function(){
		rich.sizechangetimer = setTimeout("rich.sizechange(0);", 10);
	};
	
	this.donthide = function(id){
	if(id=="fontchangeButton" && rich.dropdownB==1){
		clearTimeout(rich.fontchangetimer);
		rich.fontchange(1);
		}
	if(id=="sizechangeButton" && rich.dropdownA==1){
		rich.sizechange(1);
		clearTimeout(rich.sizechangetimer);
		}
	};
	
	this.dohide = function(){
		rich.fontchangetimer = setTimeout("rich.fontchange(0);", 10);
		rich.sizechangetimer = setTimeout("rich.sizechange(0);", 10);
	};

	this.showtitle = function(width, yPos, title){
		clearTimeout(rich.unshowtitletimer);
		if(rich.showtitles==1){
			rich.showtitlenow(width, yPos, title);
		} else {
			clearTimeout(rich.showtitletimer);
			rich.showtitletimer = setTimeout("rich.showtitlenow("+width+", "+yPos+", '"+title+"');", 500);
		}
	};
	this.unshowtitle = function(){
		clearTimeout(rich.unshowtitletimer);
		rich.unshowtitletimer = setTimeout("rich.unshowtitlenow();", 100);
	};
	
	this.showtitlenow = function(width, yPos, title){
		rich.showtitles=1;
		document.getElementById('showtitle').innerHTML = "<div class='titleeck' id='titleeck'></div>"+title;
		var titlewidth = document.getElementById('showtitle').offsetWidth;
		
		var titlepos = ((width/2)-(titlewidth/2))+yPos+1+global.chX;
		
		if(titlepos<global.chX){
			document.getElementById('titleeck').style.marginLeft = titlepos-5-global.chX;
			titlepos=global.chX;
			}
		documentoffset = document.getElementById('body').offsetWidth;
		if(titlepos>documentoffset-titlewidth){
			document.getElementById('titleeck').style.marginLeft = ((documentoffset-titlewidth-titlepos)*(-1))-5;
			titlepos=documentoffset-titlewidth;
			}
		
		document.getElementById('showtitle').style.left = titlepos+"px";
	}
	
	this.unshowtitlenow= function(){
		clearTimeout(rich.showtitletimer);
		document.getElementById('showtitle').style.left = "-200px";
		rich.showtitles=0;
	}
    
    this.win = null;
    
    this.printTest = function(){
        printContent = document.getElementById('notecon').innerHTML;
    };
};

var rich = new rich_typ();