
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
    
    this.deleteInviteKey = function(key){
        var kill = false;
        for(i in pfile.dirObject['5000000000'].inviteKeyArray){
            if(pfile.dirObject['5000000000'].inviteKeyArray[i].key == key){
                if(!pfile.dirObject['5000000000'].inviteKeyArray[i].used){
                    kill = i;
                }
            }
        }
        if(kill){
            pfile.dirObject['5000000000'].inviteKeyArray = pfile.dirObject['5000000000'].inviteKeyArray.splice(kill,1);
        }
    };
    
    this.createInviteKey = function(){
        var found = true;
        var newKey = "";
        while(found){
            newKey = this.generateKey();
            found = false;
            for(i in pfile.dirObject['5000000000'].inviteKeyArray){
                if(pfile.dirObject['5000000000'].inviteKeyArray[i].key == newKey){
                    found = true;
                }
            }
        }
        pfile.dirObject['5000000000'].inviteKeyArray.push({"key":newKey,"used":false});
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