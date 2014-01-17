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
#       Filename......................: dirCreator.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/


var testDir = "33e1d210cfDatei1:39f6168622Datei2:3aaaaaaaaaDatei3:4000000000root;4000000001;3aaaaaaaaa:4000000001Ordner1;45909c4fcf;39f6168622:45909c4fcfOrdner2;33e1d210cf";
var lastDir = '5000000001';
var mainDir = '5000000001';
//alert(testDir.substr(10));
// TODO: Muss noch an Programmierrichtlinien Angepasst werden.

function createDirArray(dir, folder){
    var fullDirArray = dir.split(":");
    var key = getFolderKey(fullDirArray, folder);
    var folderContent = fullDirArray[key].substr(10);
    var folderArray = folderContent.split(";");
    var folderName = folderArray[0];
    var folderNameLength = folderName.length;
    folderContent = folderContent.substr(folderNameLength+1);
    folderArray = folderContent.split(";");
    var fileCounter = 0;
    var id   = false;
    var name = false;
    var html = "";
    while(folderArray[fileCounter]){
        id   = folderArray[fileCounter];
        name = getFileName(fullDirArray, folderArray[fileCounter]);
        html = html+createElement(id, name);
        fileCounter++;
    }
    document.getElementById('fileListUl').innerHTML = html;
    }

function showDir(id){
    return createDirArray(testDir, id);
}

function getFolderKey(fullDirArray, id){
    var counter = 0;
    while(fullDirArray[counter]){
        if(fullDirArray[counter].substr(0,10) == id){
            return counter;
            console.log('t');
            }
        counter++
        }
}

function getFileName(fullDirArray, id){
    var idCounter = 0;
    var name = false;
    while(fullDirArray[idCounter] && name == false){
        if(fullDirArray[idCounter].substr(0,10) == id){
            var temp = id.substr(0,1);
            if(temp == "4"){
                var name = fullDirArray[idCounter].substr(10).split(";")[0];
            }
            if(temp == "5"){
                var name = fullDirArray[idCounter].substr(10).split(";")[0];
            }
            if(temp == "3"){
                var name = fullDirArray[idCounter].substr(10);
            }
        }
        idCounter++;
        }
    return name;
}

function createElement(id, name){
    var t = new Array("fileIcon", "file");
    switch(id.substr(0,1)){
            case "3":
            t[0] = "fileIcon";
            t[1] = "file";
            break;
            case "4":
            t[0] = "folderIcon";
            t[1] = "folder";
            break;
            case "5":
            t[0] = "fileIcon";
            t[1] = "user";
            break;
    }
    id = "'"+id+"'";
    var e = '<li onclick="openFile('+id+');"><img src="img/doc/'+t[1]+'.png" class="'+t[0]+'"><font style="position: relative; left: 30px;">'+name+'</font></li>';
    return e;
    
}

function createFolderElement(id, name){
    id = "'"+id+"'";
    var e = '<li onclick="openFile('+id+');">'+name+'</li>';
    return e;
}

function getFilePath(id){
    var dir = testDir;
    var fullDirArray = dir.split(":");
    var filePath = searchLink(fullDirArray, id);
    var filePathCounter = 0;
    var html = "";
    while(filePath[filePathCounter]){
        id = filePath[filePathCounter];
        name = getFileName(fullDirArray, id);
        html = createFolderElement(id, name)+html;
        filePathCounter++;
    }
    //var temp = "'4000000000'";
    //html = '<li style="color: #333333;" onclick="openFile('+temp+')">//</li>'+html;
    document.getElementById('dirShow').innerHTML = html;
}

function searchLink(fullDirArray, id){
    var searchCounter = 1;
    var searchArray = new Array();
    var found = false;
    var checkId = id;
    searchArray[0] = id;
    while(checkId != mainDir && searchCounter<100){
        checkId = getSuperPath(fullDirArray, checkId);
        if(!checkId){ alert('Fatal Error: Konnte Uebergeordnetes Verzeichnis nicht finden!'); }
        searchArray[searchCounter] = checkId;
        searchCounter++
    }
    return searchArray;
}

function getSuperPath(fullDirArray, id){
    var counter = 0;
    var found = false;
    while(fullDirArray[counter]){
        if(fullDirArray[counter].substr(0,1) == "4" ||fullDirArray[counter].substr(0,1) == "5"){
            var folderContent = fullDirArray[counter].split(';');
            var fCounter = 0;
            while(folderContent[fCounter]){
                if(folderContent[fCounter] == id){
                    return fullDirArray[counter].substr(0,10);
                }
                fCounter++;
            }
        }
        counter++;
    }
}
    

function openFile(id){
    switch(id.substr(0,1)){
            case "3":
            //Datei Oeffnen
            uiControl.loadFile(id);
            break;
            case "4":
            showDir(id);
            getFilePath(id);
            lastDir = id;
            break;
            case "5":
            showDir(id);
            getFilePath(id);
            lastDir = id;
            break;
    }
}

function refreshShow(){
    showDir(lastDir);
    getFilePath(lastDir);
}

function createFile(folder, name, type){
    
}