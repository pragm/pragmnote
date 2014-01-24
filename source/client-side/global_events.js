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
#       Filename......................: global_events.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var globalEvent_typ = function globalEvent_typ(){

    //function update_websocketstate(){
	//   stateupdate();
    //}
    
    this.fpsTimer = false;
    this.fpsTimer2 = false;
    this.fpsControl = false;
    this.stateTimer = false;

    this.mousemove = function (){
        if(globalEvent.fpsControl) {
            if(!globalEvent.fpsTimer){
                clearTimeout(globalEvent.fpsTimer2);
                globalEvent.mousemove_fps();
                globalEvent.fpsTimer = setTimeout("globalEvent.fpsTimer = false;", 1000/global.fps);
                globalEvent.fpsTimer2 = setTimeout("globalEvent.mousemove_fps();", 1100/global.fps);
            }
        } else {
            globalEvent.mousemove_fps();
        }
    };

    this.mousemove_fps = function (){
        globalEvent.fpsTimer = false;
        textbox.mousemove();
    };
        
    this.onload = function (){
        this.updateMainFieldPosition();
        //this.setDefaultNotecon();
        //setTimeout("globalEvent.lateload();", 1000);
        document.getElementById('displayBlocker').style.display = "none";
        
        document.getElementById('madebyinfo').innerHTML = "Version: "+clientversion+" | "+document.getElementById('madebyinfo').innerHTML;
        //document.getElementById('noteconBackground').style.display = "none";
        //uiControl.view('start');
        //L1.onload();
        uiControl.view("start");
    };
    
    this.onConnect = function (){
        //setTimeout('L3.loadFile("3aaaaaaaaa");', 1000);
    };
    
    this.drop = function () {
        //slidestop();
        //drawmouseup();
        textbox.drop();
    };
        
    this.updateMainFieldPosition = function (){
	   global.chY = document.getElementById("notecon").offsetTop;
	   global.chX = document.getElementById("notecon").offsetLeft;
    };
        
    this.onclick = function (){
        //drawunfocus();
    };

    this.state = function (n){
        // Rot: #f92d4d Gruen: #67d200
        clearTimeout(this.stateTimer);
        switch(n){
            case 0:
                //document.getElementById("pragmico1").src = "img/doc/pragm_1.png";
                document.getElementById("pragmico2").style.backgroundImage = "url('img/doc/pragm_1_white.png')";
                //document.getElementById('fileTabs').style.height = "";
                //document.getElementById('noteconBackground').style.display = "none";
                break;
            case 1:
                //document.getElementById("pragmico1").src = "img/doc/pragm_1_green.png";
                document.getElementById("pragmico2").style.backgroundImage = "url('img/doc/pragm_1_lightgreen.png')";
                this.stateTimer = setTimeout('globalEvent.state(0)', 1000);
                break;
            case 2:
                //document.getElementById("pragmico1").src = "img/doc/pragm_1_red.png";
                document.getElementById("pragmico2").style.backgroundImage = "url('img/doc/pragm_1_red.png')";
                //document.getElementById('fileTabs').style.height = "50px";
                //document.getElementById('noteconBackground').style.display = "";
                break;
            case 3:
                //document.getElementById("pragmico1").src = "img/doc/pragm_1_yellow.png";
                document.getElementById("pragmico2").style.backgroundImage = "url('img/doc/pragm_1_yellow.png')";
                //document.getElementById('fileTabs').style.height = "50px";
                //document.getElementById('noteconBackground').style.display = "";
                break;
        }
    }
};

var globalEvent = new globalEvent_typ();

