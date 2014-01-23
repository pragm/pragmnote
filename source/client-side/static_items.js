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
#       Filename......................: static_items.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var staticItems_typ = function staticItems_typ(){
    
    this.focusactive = false;
    
    this.focus = function(){
        this.focusactive = true;
    }
    
    this.blur = function(){
        this.focusactive = false;
    }
    
    this.setid = function(id, content){
        if(document.getElementById(id)){
            document.getElementById(id).innerHTML = content; //TODO: Tryes to call ID 1031111110
        } else {
            error.report(3, "ID: "+id+" Content: "+content);
        }
    };

    this.saveid = function(id){
        if(document.getElementById(id)){
            var content = document.getElementById(id).innerHTML;
            data.files[L3.file][id] = content;
            data.edited_UI(id);
        } else {
            error.report(3, "ID: "+id+" Content: "+content);
        }
    };

};


var staticItems = new staticItems_typ();


