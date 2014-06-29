function manager_typ() {

    this.setUserActive = function (userID, active) {
        pfile.dirObject[userID].active = active;
        pfile.saveDirObject();
    };
    
    this.chPassword = function (clientID, userID, chpw) {
        if(chpw.new == chpw.new2){
            if(chpw.old == pfile.dirObject[userID].password){
                if(userID!=pfile.guestUser){
                    pfile.dirObject[userID].password = chpw.new;
                    pfile.saveDirObject();
                    L2x1.send(clientID, sID.message, "Password changed!");
                } else {
                    L2x1.send(clientID, sID.message, "You cannot change Guest password!");
                }
            } else {
                L2x1.send(clientID, sID.message, "Old password is incorrect!");
            }
        } else {
            L2x1.send(clientID, sID.message, "New passwords are not equal!");
        }
    };

    this.resetSystem = function () {
        log("RESETTING SYSTEM");
        var dir = fs.readdirSync(global.config.dir);
        for (i in dir) {
            log("Deleting " + dir[i] + " ...");
            if (fs.existsSync(global.config.dir+dir[i])) {
                fs.unlinkSync(global.config.dir+dir[i]);
                log("File " + dir[i] + " deleted");
            }
        }
        pfile.checkFileSystem(JSON.parse(JSON.stringify(defaultData.dirObject)));
        pfile.writeStr('x', 'dir', 12);   // THE ONLY PART OF THE SCRIPT WHICH IS ALLOWED TO DO THIS WITHOUT pfile.saveDirObject();
        //pfile.saveDirObject(true);
    };
}

var manager = new manager_typ();