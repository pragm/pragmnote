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
#       Filename......................: item_text.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var textbox_typ = function textbox_typ(){
    
    this.focusactive = false;
    this.usingTimeout;
    this.lastusingid;
    this.startscrollTop = 0;
    this.startscrollLeft = 0;
    this.startscrollHeight = 0;
    this.catchNoSave = [];
	
    this.mousemove = function (){
       textbox.Ereignis = window.event;
	   if(textbox.draging==1){
           textbox.x = textbox.Ereignis.clientX;
           textbox.y = textbox.Ereignis.clientY;
           
            var tempTop = document.getElementById('notecon').scrollTop;
            var tempLeft = document.getElementById('notecon').scrollLeft;
           
           var tempTopDif = textbox.startscrollTop-tempTop;
           var tempLeftDif = textbox.startscrollLeft-tempLeft;
           
           textbox.movX = textbox.x-textbox.startX-tempLeftDif;
           textbox.movY = textbox.y-textbox.startY-tempTopDif;
           textbox.actualX = textbox.movX+textbox.objectX;
           textbox.actualY = textbox.movY+textbox.objectY;
           
           
           var tempHeight = document.getElementById('notecon').scrollHeight;
           console.log("old: "+textbox.startscrollHeight+" act: "+tempHeight);
           if(textbox.startscrollHeight-10<tempHeight){
               //document.getElementById('notecon').scrollTop += tempHeight+10-textbox.startscrollHeight;
           }
           if(textbox.startscrollHeight+10>tempHeight){
               //document.getElementById('notecon').scrollTop -= textbox.startscrollHeight+10-tempHeight;
           }
           
           if(!(textbox.actualX<=10)){
               document.getElementById(textbox.dragid).style.left = textbox.actualX+"px";
           }
           if(!(textbox.actualY<19)){
               document.getElementById(textbox.dragid).style.top  = textbox.actualY+"px";
           }
           document.getElementById(textbox.dragid).className = "editareax2";
           //textbox.saveid('editing'+textbox.draganddropid);
       }
	   if(textbox.resizeing==1){
           textbox.x = textbox.Ereignis.clientX;
           textbox.difference = textbox.x-textbox.startXsize;
           textbox.newwidth = textbox.objectXsize+textbox.difference;
           document.getElementById(textbox.resizeid).style.width = textbox.newwidth+"px";
           document.getElementById(textbox.resizeid).className = "editareax2";
           //textbox.saveid('editing'+textbox.draganddropid);
       }
	};
    
    this.drag = function (id){
        this.activateUsing(id);
        document.getElementById("editarea"+id).className = "editareax2";
        textbox.startscrollHeight = document.getElementById('notecon').scrollHeight;
        textbox.startscrollTop = document.getElementById('notecon').scrollTop;
        textbox.startscrollLeft = document.getElementById('notecon').scrollLeft;
	    textbox.draging = 1;
        textbox.draganddropid = id;
        textbox.dragid = "editarea"+id;
        textbox.Ereignis = window.event;
        textbox.startX = textbox.Ereignis.clientX;
        textbox.startY = textbox.Ereignis.clientY;
        textbox.objectX = document.getElementById(textbox.dragid).style.left;
        textbox.objectY = document.getElementById(textbox.dragid).style.top;
        textbox.objectX = parseInt(textbox.objectX.replace(/px/g, ""));
        textbox.objectY = parseInt(textbox.objectY.replace(/px/g, ""));
    };
    
    this.drop = function (){
    if(textbox.draging == 1 || textbox.resizeing == 1){
        elem = document.getElementById("editing"+textbox.draganddropid); //This is the element that you want to move the caret to the end of
        textbox.setEndOfContenteditable(elem);
        textbox.saveid('editing'+textbox.draganddropid, true);
        if(!(textbox.focusactive && textbox.id == textbox.draganddropid)){
            this.deactivateUsing();
        }
    }
	textbox.draging = 0;
	textbox.resizeing = 0;
	};
    
    this.setEndOfContenteditable = function (contentEditableElement){
        var range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        { 
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    };
    
    this.resize = function (id){
        this.activateUsing(id);
	    document.getElementById("editarea"+id).className = "editareax2";
	    textbox.resizeing = 1;
	    textbox.draganddropid = id;
	    textbox.resizeid = "editarea"+id;
	    textbox.Ereignis = window.event;
	    textbox.startXsize = textbox.Ereignis.clientX;
	    textbox.objectXsize = document.getElementById(textbox.resizeid).style.width;
	    textbox.objectXsize = parseInt(textbox.objectXsize.replace(/px/g, ""));
	};
    
    this.aktivatefocus = function (id){
        this.focusactive = true;
	   textbox.iding = id.split("editing");
	   textbox.id = textbox.iding[1];
        this.activateUsing(textbox.id);
	   textbox.aktiveid = textbox.id;
	   document.getElementById("editarea"+textbox.id).className = "editareax2";
	   color.setcolorswitch(textbox.id);
	   }

    this.deaktivatefocus = function (id){
        this.deactivateUsing();
	   textbox.eid = id;
	   textbox.iding = id.split("editing");
	   textbox.id = textbox.iding[1];
	   if(document.getElementById("editarea"+textbox.id)){
           document.getElementById("editarea"+textbox.id).className = "editareax";
       }
        this.focusactive = false;
	}
        
    this.setid =function (id, value){
        L3.unsetUserEditIfSame(id);
        textbox.init = convert.string_to_int(value.substr(0,1));
        
        var temp = ''+textbox.init/16+'';
        textbox.widthL = parseInt(temp.substr(0,1))+3;
        textbox.init = textbox.init%16;
        
        var temp = ''+textbox.init/4+'';
        textbox.yPosL = parseInt(temp.substr(0,1))+3;
        textbox.xPosL = (textbox.init%4)+3;
        
        var content = value.substr(1+textbox.xPosL+textbox.yPosL+textbox.widthL);
        var xPos = value.substr(1, textbox.xPosL);
        var yPos = value.substr(1+textbox.xPosL, textbox.yPosL);
        var width = value.substr(1+textbox.xPosL+textbox.yPosL, textbox.widthL);
        
        
	   if(document.getElementById('editarea'+id)){
           if(content!=0){
               document.getElementById('editing'+id).innerHTML = content;
           }
           if(xPos!=0){
               document.getElementById('editarea'+id).style.left = xPos+'px';
           }
           if(yPos!=0){
               document.getElementById('editarea'+id).style.top = yPos+'px';
           }
           if(width!=0){
               document.getElementById('editarea'+id).style.width = width+'px';
           }
       } else {
	   	
           textbox.newdiv = document.createElement("div");
           textbox.newdiv.className		     = "editareax";
           textbox.newdiv.id				 = 'editarea'+id;
           textbox.newdiv.style.left		 = xPos+'px';
           textbox.newdiv.style.top		     = yPos+'px';
           textbox.newdiv.style.width		 = width+'px';
           textbox.newdiv.contenteditable	 = 'false';
           textbox.newdiv.innerHTML 		 = textbox.getTextboxHTML(id, content);	   
           document.getElementById('notecon').appendChild(textbox.newdiv);
           data.update('fileUserList');
       }
	};
    
    this.addfield = function (){
        if(!this.focusactive && !staticItems.focusactive){
           this.id = textbox.makeid('100');
           this.Ereignis = window.event;
           this.x = this.Ereignis.clientX-global.chX-global.textboxXdif+document.getElementById('notecon').scrollLeft;//changestartsize42 8
           this.y = this.Ereignis.clientY-global.chY-global.textboxXdif+document.getElementById('notecon').scrollTop; //changestartsize42 18
           textbox.newdiv = document.createElement("div");
           textbox.newdiv.className		 = "editareax";
           textbox.newdiv.id				 = 'editarea'+this.id;
           textbox.newdiv.style.left		 = this.x+'px';
           textbox.newdiv.style.top		 = this.y+'px';
           textbox.newdiv.style.width		 = '400px';
           textbox.newdiv.contenteditable	 = 'false';
           textbox.newdiv.innerHTML 		 = textbox.getTextboxHTML(this.id, "");
           document.getElementById('notecon').appendChild(textbox.newdiv);
           document.getElementById("editing"+this.id).focus();
        }
	};
    
    this.getTextboxHTML = function (id, content){
        return '<div class="inarea2" contenteditable="false" id="'+id+'" onmousedown="textbox.drag(this.id);"></div><div class="inarea3" contenteditable="false" id="'+id+'" onmousedown="textbox.resize(this.id);"></div><div class="editspan" contenteditable="true" id="editing'+id+'" onblur="textbox.deleteelement(this.id); textbox.deaktivatefocus(this.id);" onfocus="textbox.aktivatefocus(this.id);" oninput="textbox.saveid(this.id);">'+content+'</div>';
    };
    
    this.makeid = function (type){
	   var id = (Math.random()*100000000000000000);
	   id = id.toString();
	   id = id.substring(0,7);
	   return type+""+id;
	   };
        
    this.removeElement = function (id) {
	   if(document.getElementById(id)){
           this.element = document.getElementById(id);
           this.element.parentNode.removeChild(this.element);
       }
    };

    this.deleteelement = function (id){
        var tid = id;
        id = id.split("editing")[1];
        textbox.tempcon = document.getElementById("editing"+id).innerHTML;
        if(textbox.tempcon == "<br>" || textbox.tempcon==""){
            textbox.removeElement("editarea"+id);
            data.delete_UI(id);
		    } else {
                textbox.saveid(tid, true);
            }
	   };
    
    this.saveid = function (id, force){
        id = id.split("editing")[1];
        var force = force || false;
        if(data.ecoMode == false || force == true){
            textbox.content		=	document.getElementById('editing'+id).innerHTML;
            textbox.posX 		=	document.getElementById('editarea'+id).style.left; // 4^0
            textbox.posY 		=	document.getElementById('editarea'+id).style.top;  // 4^1
            textbox.width 		=	document.getElementById('editarea'+id).style.width;// 4^2

            textbox.posX = textbox.posX.replace(/px/g, "");
            textbox.posY = textbox.posY.replace(/px/g, "");
            textbox.width = textbox.width.replace(/px/g, ""); //parseInt()

            textbox.posXL = textbox.posX.length;
            while(textbox.posXL<3){
                textbox.posX = '0'+textbox.posX;
                textbox.posXL = textbox.posX.length;
            }

            textbox.posYL = textbox.posY.length;
            while(textbox.posYL<3){
                textbox.posY = '0'+textbox.posY;
                textbox.posYL = textbox.posY.length;
            }

            textbox.widthL = textbox.width.length;
            while(textbox.widthL<3){
                textbox.width = '0'+textbox.width;
                textbox.widthL = textbox.width.length;
            }

            textbox.init = convert.int_to_string(parseInt((textbox.posXL-3)+(textbox.posYL-3)*4+(textbox.widthL-3)*16));

            var tempContent = textbox.content;        

            textbox.value = textbox.init+''+textbox.posX+''+textbox.posY+''+textbox.width+''+tempContent;

            data.edited_UI(id, textbox.value);
        } else {
            if(textbox.catchNoSave.indexOf(id) < 0){
                textbox.catchNoSave.push(id);
            }
        }
    };
    
    this.deactivateEcoMode = function(){
        for(i in this.catchNoSave){
            this.saveid(this.catchNoSave[i], true);
        }
        this.catchNoSave = null;
        this.catchNoSave = [];
    };
    
    this.deactivateUsingNow = function(){
           L3.setUserEditing("");
        if(this.draging != 1 && this.resizeing != 1 &&  this.focusactive == false){
           //L3.setUserEditing("");
        }
    };
    
    this.deactivateUsing = function(){
        if(this.draging != 1 && this.resizeing != 1){
            clearTimeout(this.usingTimeout);
           this.usingTimeout = setTimeout('textbox.deactivateUsingNow();', 100);
        }
    };
           
    this.activateUsing = function(id){
        clearTimeout(this.usingTimeout);
        this.lastusingid = id;
        L3.setUserEditing(id);
    };
    
    this.setBlocked = function(id, color){
        L3.unsetUserEditIfSame(id);
        if(document.getElementById("editarea"+id)){
            document.getElementById("editarea"+id).style.boxShadow = "inset 0px 5px 5px -5px "+tools.hexToRgb(color, 0.4)+", inset 5px 0px 0px 0px "+color+", inset 5px -5px 5px -5px "+tools.hexToRgb(color, 0.4)+", inset 0px 0px 5px 0px "+tools.hexToRgb(color, 0.2)+"";
            document.getElementById("editarea"+id).style.background = tools.hexToRgb(color, 0.04);
            document.getElementById("editarea"+id).style.borderRadius = "5px";
            return true;
        } else {
            return false;
        }
    };
    
    this.setUnBlocked = function(id){
        //this.unsetUserEditIfSame(id);
        if(document.getElementById("editarea"+id)){
            document.getElementById("editarea"+id).style.boxShadow = "";
            document.getElementById("editarea"+id).style.background = "";
            document.getElementById("editarea"+id).style.borderRadius = "";
            return true;
        } else {
            return false;
        }
    };
};

var textbox = new textbox_typ();

