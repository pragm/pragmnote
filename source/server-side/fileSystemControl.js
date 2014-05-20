

var fileSystemControl_typ = function fileSystemControl(){
    
    this.checkKillLink = function(clientID, userID, checkObject){
        if(!(checkObject.linkID in pfile.dirObject)){
            if(pfile.dirObject[checkObject.folderID].content.indexOf(checkObject.linkID) != -1){
                dlog("REMOVED DEAD LINK: "+checkObject.linkID+" IN FOLDER "+checkObject.folderID);
                pfile.removeLink(checkObject.folderID, checkObject.linkID);
            }
            pfile.generateUserFilelist(clientID, userID);
            dlog("ALL OK => JUST UPDATE: "+checkObject.linkID+" IN FOLDER "+checkObject.folderID);
        } else {
            dlog("ALL OK: "+checkObject.linkID+" IN FOLDER "+checkObject.folderID);
        }
    };
    
};

var fileSystemControl = new fileSystemControl_typ();