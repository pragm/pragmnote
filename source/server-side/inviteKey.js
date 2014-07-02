
function inviteKey_typ(){
    
    this.isKeyFree = function(key){
        for(i in pfile.dirObject[pfile.systemUsr].inviteKeyArray){
            if(pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].key == key){
                if(!pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].used){
                    return true
                } else {
                    return false;
                }
            }
        }
        return false;
    };
    
    this.setKeyUsed = function(key, userID){
        for(i in pfile.dirObject[pfile.systemUsr].inviteKeyArray){
            if(pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].key == key){
                pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].used = {"userID": userID, "time": Date.now()};
                pfile.saveDirObject();
                break;
            }
        }
    };
    
    this.deleteInviteKey = function(key){
        var kill = false;
        for(i in pfile.dirObject[pfile.systemUsr].inviteKeyArray){
            if(pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].key == key){
                if(!pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].used){
                    kill = i;
                }
            }
        }
        if(kill){
            pfile.dirObject[pfile.systemUsr].inviteKeyArray.splice(kill,1);
            pfile.saveDirObject();
        }
    };
    
    this.createInviteKey = function(){
        var found = true;
        var newKey = "";
        while(found){
            newKey = this.generateKey();
            found = false;
            for(i in pfile.dirObject[pfile.systemUsr].inviteKeyArray){
                if(pfile.dirObject[pfile.systemUsr].inviteKeyArray[i].key == newKey){
                    found = true;
                }
            }
        }
        pfile.dirObject[pfile.systemUsr].inviteKeyArray.push({"key":newKey,"used":false});
        pfile.saveDirObject();
    };
    
    this.generateKey = function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 32; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };
}

var inviteKey = new inviteKey_typ();