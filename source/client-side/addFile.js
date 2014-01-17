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
#       Filename......................: addFile.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var addFile_typ = function addFile_typ(){

    this.AddFile = false;
    this.AddFileChoice = false;

    this.toggleAddFile = function(){
        if(this.AddFile){
            document.getElementById('AddFile').className = 'dirButtonsLi';
            this.AddFile = false;
        } else {
            document.getElementById('AddFile').className = 'dirButtonsLiAdd';
            this.AddFile = true;
            document.getElementById('AddFileInput').focus();
        }
    }
    
    this.AddFileD = function(x){
        if(x){
            document.getElementById('AddFile').className = 'dirButtonsLiAdd';
            this.AddFile = true;
        }else{
            document.getElementById('AddFile').className = 'dirButtonsLi';
            this.AddFile = false;
        }
    }//
    
    this.toggleAddFileChoice = function(){
        if(this.AddFileChoice){
            document.getElementById('AddFileChoice').src = 'img/doc/file.png';
            document.getElementById('AddFileChoice').style.bottom = '0px';
            this.AddFileChoice = false;
            document.getElementById('AddFileInput').focus();
        } else {
            document.getElementById('AddFileChoice').src = 'img/doc/folder.png';
            document.getElementById('AddFileChoice').style.bottom = '3px';
            this.AddFileChoice = true;
            document.getElementById('AddFileInput').focus();
        }
    }
    
    this.checkEnter = function(){  
      if(event.keyCode == 13){
        this.AddFileEnter();
      }  
    }
    
    this.AddFileEnter = function(){
        var fileType = 'p';
        if(this.AddFileChoice){
            fileType = 'f';
        }
        var fileName = document.getElementById('AddFileInput').value;
        this.AddFileD(false);
        document.getElementById('AddFileInput').value = "";
        document.getElementById('AddFileInput').blur();
        //console.log(fileType+' '+fileName);
        uiControl.addFile(fileName, fileType);
    }
}

var addFile = new addFile_typ();