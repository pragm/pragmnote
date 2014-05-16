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
#       Filename......................: tabHandler.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var tab_typ = function tab_typ(){

    this.fileTabs = true;
    this.tabArray = new Array();
    this.tabArrayHTML = new Array();
    this.active;
    this.showElemNum = 7;
    
    this.fileOpened = function(oFile){
        var oFile = oFile.toString();
        var temp = this.tabArray.indexOf(oFile);
        this.active = oFile;
        //console.log("=> "+oFile+" <=> "+temp);
        if(temp === -1){
            this.tabArray.unshift(oFile);
        }
        if(this.tabArray[this.showElemNum]){this.tabArray.splice(this.showElemNum,1);}
        this.generate();
    }
    
    this.add = function(temp){
        this.tabArray.unshift(temp);
        if(this.tabArray[5]){this.tabArray.splice(5,1);}
        this.generate();
    }
    
    this.generate = function(){
        var out = "";
        var numb = 0;
        while(numb < this.showElemNum){
            if(this.tabArray[numb]){
                var add = "";
                if(this.active == this.tabArray[numb]){add = 'id="TabActive" ';}
                var temp = "'TabActive'";
                var tempId = "'"+this.tabArray[numb]+"'";
                //var fullDirArray = testDir.split(":");
                //var tempName = getFileName(fullDirArray, this.tabArray[numb]);
                try{
                    var tempName = data.dirObject[this.tabArray[numb]].name;
                } catch(e){
                    var tempName = "ERROR";
                }
                out += '<li '+add+'onclick="tab.deactivateTab(); uiControl.loadOtherFile('+tempId+'); this.id = '+temp+';">'+tempName+'</li>';
            }
            numb++;
        }
        document.getElementById('tabsUL').innerHTML = out;
    }
    
    this.html = function(name, active){
        var temp = "'TabActive'";
        if(active){
            return '<li id="TabActive" onclick="tab.deactivateTab(); this.id = '+temp+';">'+name+'</li>';
        } else {
            return '<li onclick="tab.deactivateTab(); this.id = '+temp+';">'+name+'</li>';
        }
    }
    
    this.deactivateTab = function(){
        if(data.login.userID != "5GUESTUSER"){
            if(document.getElementById('TabActive')){
                document.getElementById('TabActive').id = "";
            }
        }
    }
    
    this.position = function(key){
        switch(key){
            case "slideOut":
                document.getElementById('fileTabs').style.display = "block";
                document.getElementById('fileTabs').style.height = "50px";
                break;
            case "slideIn":
                document.getElementById('fileTabs').style.display = "block";
                document.getElementById('fileTabs').style.height = "0px";
                break;
            case "slide10In":
                document.getElementById('fileTabs').style.display = "block";
                document.getElementById('fileTabs').style.height = "";
                break;
            case "fastIn":
                document.getElementById('fileTabs').style.display = "none";
                break;
        }
    };
}
    
var tab = new tab_typ();