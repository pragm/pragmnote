

var fileSystemControl_typ = function fileSystemControl(){
    
    this.checkKillLink = function(clientID, userID, checkObject){
        dlog("Remove Dead Link "+checkObject.linkID+" "+checkObject.folderID);
        if(!((checkObject.linkID in pfile.dirObject) && (userID in pfile.dirObject[checkObject.linkID].share))){
            if(pfile.dirObject[checkObject.folderID].content.indexOf(checkObject.linkID) != -1){
                dlog("REMOVED DEAD LINK: "+checkObject.linkID+" IN FOLDER "+checkObject.folderID);
                pfile.removeLink(checkObject.folderID, checkObject.linkID);
            }
            pfile.generateUserFilelist(clientID, userID);
            pfile.saveDirObject(false);
            dlog("ALL OK => JUST UPDATE: "+checkObject.linkID+" IN FOLDER "+checkObject.folderID);
        } else {
            dlog("ALL OK: "+checkObject.linkID+" IN FOLDER "+checkObject.folderID);
        }
    };
    
    this.checkFileSystem = function(fobj){
        console.log('    CHECKING FILESYSTEM ... ');
        var change = false;
        var c = true;
        var deadObjects = [];
        for (i in fobj) {
            //if (fobj[i].share != {}) {
                if(fobj[i].share){
                    for(j in fobj[i].share){
                        if(typeof fobj[i].share[j] == 'string'){
                            var s = {"r":fobj[i].share[j],"a":"y"};
                            fobj[i].share[j] = s;
                            console.log("    Change Share to "+JSON.stringify(s));
                            change = true;
                        }
                    }
                }
                //fobj[i].share = { };
                //console.log('    SET SHARE TO OBJECT');
                //change = true;
            //}
            if (i[0] == "5") {
                if(!fobj[i].notifications){
                    fobj[i].notifications = [];
                    change = true;
                }
                //fobj[i].maxStorageScore = 200000;
                //console.log('    SET maxStorageScore TO 1000');
                //fobj[i].active = true;
                //fobj[i].lastactive = Date.now();
                //console.log('    SET active True');
            }
            c = false;
            if(fobj[[fobj[i].parent]]){
                if(fobj[[fobj[i].parent]].content.indexOf(i) > -1){
                    c = true;
                }
            }
            if(c==false){
                console.log('     Object '+i+' has no valid parent!'); 
                deadObjects.push(i);
            }
        }
        for(i in deadObjects){
            var i = deadObjects[i];
            fobj[i].parent = pfile.deadObj;
            if(fobj[pfile.deadObj].content.indexOf(i) < 0){
                fobj[pfile.deadObj].content.push(i);
            }
            console.log('      Moved '+i+' to '+pfile.deadObj+'!'); 
        }
        console.log('    CHECKING DONE !');
        pfile.dirObject = fobj;
        if (change) {
            pfile.saveDirObject();
            //pfile.writeStr('x', 'dir', 12);
        }
        pfile.init();
    };
    
};

var fileSystemControl = new fileSystemControl_typ();