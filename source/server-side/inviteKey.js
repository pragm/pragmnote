
function inviteKey_typ(){
    
    this.isKeyFree = function(key){
        for(i in pfile.dirObject['5000000000'].inviteKeyArray){
            if(pfile.dirObject['5000000000'].inviteKeyArray[i].key == key){
                if(!pfile.dirObject['5000000000'].inviteKeyArray[i].used){
                    return true
                } else {
                    return false;
                }
            }
        }
        return false;
    };
    
    this.setKeyUsed = function(key, userID){
        for(i in pfile.dirObject['5000000000'].inviteKeyArray){
            if(pfile.dirObject['5000000000'].inviteKeyArray[i].key == key){
                pfile.dirObject['5000000000'].inviteKeyArray[i].used = {"userID": userID, "time": Date.now()};
                break;
            }
        }
    };
}

var inviteKey = new inviteKey_typ();