// Requieres fileSystemJson.js

var fRights_typ = function fRights_typ(){
    
    this.getRights = function(num){
        var out = { };
        out.read = false, out.write = false, out.rename = false, out.move = false, out.copy = false, out.perm = false;
        var bin = num.toString(2);
        while(bin.length < 6){bin = "0"+bin;}
        var count = 0;
        for(i in out){
            if(bin.substr(count,1) == "1"){
                out[i] = true;
            }
            count++;
        }
        return out;
    };
    
    this.setRights = function(out){
        var num = 0;
        var count = 5;
        for(i in out){
            if(out[i]){
                num+=Math.pow(2, count)
            }
            count--;
        }
        return num;
    };
    
    this.getUserFilePermissions = function(fileID, userID){
        if(fileID in pfile.dirObject){
            if(pfile.dirObject[fileID].owner == userID || userID == pfile.systemUsr){
                var out = { };
                out.read = true, out.write = true, out.perm = true;
                return out;
            }
            if(userID in pfile.dirObject[fileID].share){
                var out = { };
                out.read = true, out.write = pfile.dirObject[fileID].share[userID] > 0, out.perm = pfile.dirObject[fileID].share[userID] > 1;
                if(pfile.guestUser in pfile.dirObject[fileID].share){
                    out.write = pfile.dirObject[fileID].share[pfile.guestUser] > 0 || out.write;
                }
                return out;
            }
            if(pfile.guestUser in pfile.dirObject[fileID].share){
                var out = { };
                out.read = true, out.write = pfile.dirObject[fileID].share[pfile.guestUser] > 0, out.perm = pfile.dirObject[fileID].share[pfile.guestUser] > 1;
                return out;
            }
            var out = { };
            out.read = false, out.write = false, out.perm = false;
            return out;
        } else {
            error.report(6, "ID "+fileID+" does not exist in dirObject! [fileRights:getUserFilePermissions]");
            var out = { };
            out.read = false, out.write = false, out.perm = false;
            return out;
        }
    }
    
    this.isUserAllowedTo = function(fileID, userID, doSome){
        var rights = this.getUserFilePermissions(fileID, userID);
        return rights[doSome];
    };
    
    
};

var fRights = new fRights_typ();