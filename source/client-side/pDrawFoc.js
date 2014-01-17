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
#       Filename......................: pDrawFoc.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var pDrawFoc_typ = function pDrawFoc_typ(){
    this.p1x = 0;
    this.p1y = 0;
    this.p2x = 0;
    this.p2y = 0;
    this.pSx = 0;
    this.pSy = 0;


    this.edit = function(pID){
        var Ereignis = window.event;
		this.pSx = Ereignis.clientX;     //Ereignis.clientX
		this.pSy = Ereignis.clientY;     //Ereignis.clientY
        var a = pID.substr(0,1);
        var b = pID.substr(1,1);

        
        if(a=="t"){this.yDifferenz = function(yDif){ return Array(this.p1y + yDif, this.p2y); };}
        if(a=="b"){this.yDifferenz = function(yDif){ return Array(this.p1y, this.p2y + yDif); };}
        if(a=="c"){this.yDifferenz = function(yDif){ return Array(this.p1y, this.p2y);};}
        
        if(a=="l" || b=="l"){this.xDifferenz = function(xDif){ return Array(this.p1x + xDif, this.p2x); };}
        if(a=="r" || b=="r"){this.xDifferenz = function(xDif){ return Array(this.p1x, this.p2x + xDif); };}
        
        if(pID=="cc"){
        	this.xDifferenz = function(xDif){ return Array(this.p1x + xDif, this.p2x + xDif); };
        	this.yDifferenz = function(yDif){ return Array(this.p1y + yDif, this.p2y + yDif); };
        }
    };

    this.move = function(Ereignis){
		var pAx = Ereignis.clientX;     //Ereignis.clientX
		var pAy = Ereignis.clientY;     //Ereignis.clientY
		var tempX = this.xDifferenz(this.pSx-this.pAx);
		var tempY = this.yDifferenz(this.pSy-this.pAy);
		this.drawingrect(tempX[0],tempY[0],tempX[1],tempY[1]);
    };
    
    this.drawingrect = function (p1X, p1Y, p2X, p2Y){
		var drawrectid = 'foc';
		var temp_p1X = p1X;
		var temp_p1Y = p1Y;
		var temp_p2X = p2X;
		var temp_p2Y = p2Y;
		
		
		if(p1X>p2X){
			var temp = p1X;
			p1X = p2X;
			p2X = temp;
		}
		if(p1Y>p2Y){
			var temp = p1Y;
			p1Y = p2Y;
			p2Y = temp;
		}
		
		var height = p2Y-p1Y;
		var width = p2X-p1X;
		var posX = p1X;
		var posY = p1Y;
		
		console.log('Points /'+p1X+':'+p1Y+':'+p2X+':'+p2Y);
		console.log(height+':'+width+':'+posX+':'+posY);
		
		document.getElementById(drawrectid).style.left 					= posX-chX+"px";    //changestartsize42
		document.getElementById(drawrectid).style.top  					= posY-chY+"px"; //changestartsize42
		document.getElementById(drawrectid).style.width 				= width+"px";
		document.getElementById(drawrectid).style.height 				= height+"px";
		//document.getElementById(drawrectid).setAttribute("points", temp_p1X+":"+temp_p1Y+":"+temp_p2X+":"+temp_p2Y, 0);
	};
};


var pDrawFoc = new pDrawFoc_typ();