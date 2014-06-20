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
#       Filename......................: colorshemer.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var color_typ = function color_typ(){
    this.colorswitchid = false;
	this.switchline = 0;
	this.switchbox = 0;
	this.switchrect = 0;
    
    this.setcolorswitch = function (id){
	    color.colorswitchid = id;
        var idstring = id.toString();
        var type = idstring.substring(0, 3);
	   
        switch (type) {
			    case "100":
				    //unfocusline();
				    if(color.switchbox==0){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinputColor' value='fontcolor'></input>";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinputColor' value='fontbackground'></input>";}
				    break;
			    case "101":
				    //unfocusline();
				    if(color.switchrect==0){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>rect color";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>rect border width";}
                    break;
                case "102":
				    if(color.switchline==1){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>line width";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>line color";}
				    break;
			    case "104":
				    document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Pfeilfarbe";
				    break;
			    default:
				    break;
		}
	};
    
    this.togglecolor = function (){
        var idstring = color.colorswitchid.toString();
        var type = idstring.substring(0, 3);
	   
        switch (type) {
			    case "100":
				    //unfocusline();
					if(color.switchbox==0){color.switchbox=1;}else{color.switchbox=0;}
				    if(color.switchbox==0){
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinputColor' value='fontcolor'></input>";
				    }else{
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinputColor' value='fontbackground'></input>";
				    }
				    break;
			    case "101":
				    //unfocusline();
					if(color.switchrect==0){color.switchrect=1;}else{color.switchrect=0;}
				    if(color.switchrect==0){
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>rect color";
				    }else{
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>rect border width";
				    }
                    break;
                case "102":
					if(color.switchline==0){color.switchline=1;}else{color.switchline=0;}
				    if(color.switchline==1){
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>line width";
				    }else{
				    	document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>line color";
				    }
				    break;
			    case "104":
				    document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Pfeilfarbe";
				    break;
			    default:
				    break;
		}
        document.STOP_EXEC_COMMAND = true; 
        return false;
	};

	this.setcolor = function(mycolor){
		var idstring = color.colorswitchid.toString();
		var type = idstring.substring(0, 3);
		
		switch (type) {
				case "100":
					if(color.switchbox==0){rich.fontEdit('ForeColor', mycolor);}else{rich.fontEdit('BackColor', mycolor);}
					break;
				case "101":
					if(color.switchrect==0){setdrawrectcolor(colorswitchid, mycolor);}else{alert('not available!');}
					break;
				case "102":
					if(color.switchline==0){setdrawlinecolor(colorswitchid, mycolor);}else{}
					break;
				case "104":
					if(color.switchline==0){setdrawarrowcolor(colorswitchid, mycolor);}else{}
					break;
				default:
					alert('Please chose an object!');
					break;
		}
	};
};
/*
var switchline=0;
var switchbox=0;
var switchrect=0;

function makecolorshemer(){
	var counter = 0;
	var colorcontent="";
	while(colorarray2[counter]){
		colorcontent=colorcontent+'<li unselectable="on" id="color'+counter+'" onclick="setcolor(this.style.background);" style="background: #'+colorarray2[counter]+';"><input type="button" unselectable="on" class="unselectinput"></input></li>';
		counter++;
		}
	colorcontent=colorcontent+'<li unselectable="on" id="color'+counter+'" onclick="setcolor(this.style.background);" style="background: transparent; border: 1px solid black;"><input type="button" unselectable="on" class="unselectinput"></input></li>';
	document.getElementById('colorshemer').innerHTML = colorcontent;	
	}
	

	
function togglecolor(){
	var idstring = colorswitchid.toString();
	var type = idstring.substring(0, 3);
	
	switch (type) {
			case "100":
				if(switchbox==0){switchbox=1;}else{switchbox=0;}
				if(switchbox==0){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Schriftfarbe";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Schrifthintergrund";}
				break;
			case "101":
				if(switchrect==0){switchrect=1;}else{switchrect=0;}
				if(switchrect==0){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Rechteckfarbe";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Rechteckrahmen";}
				break;
			case "102":
				if(switchline==0){switchline=1;}else{switchline=0;}
				if(switchline==1){document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Liniendicke";}else{document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Linienfarbe";}
				break;
			case "104":
				document.getElementById('colornote').innerHTML = "<input type='button' unselectable='on' class='unselectinput'></input>Pfeilfarbe";
				break;
			default:
				break;
	}
	
	}
	
	
function setcolor(mycolor){
	var idstring = colorswitchid.toString();
	var type = idstring.substring(0, 3);
	
	switch (type) {
			case "100":
				if(switchbox==0){fontEdit('ForeColor', mycolor);}else{fontEdit('BackColor', mycolor);}
				break;
			case "101":
				if(switchrect==0){setdrawrectcolor(colorswitchid, mycolor);}else{alert('Rahmenfarbe nicht verfuegbar!');}
				break;
			case "102":
				if(switchline==0){setdrawlinecolor(colorswitchid, mycolor);}else{}
				break;
			case "104":
				if(switchline==0){setdrawarrowcolor(colorswitchid, mycolor);}else{}
				break;
			default:
				alert('Bitte waehlen sie ein Objekt aus!');
				break;
	}
	}
//*/	
var color = new color_typ();
