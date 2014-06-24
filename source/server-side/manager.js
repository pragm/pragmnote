function manager_typ() {

    this.setUserActive = function (userID, active) {
        pfile.dirObject[userID].active = active;
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
        pfile.writeStr('x', 'dir', 12);
    };
}

var manager = new manager_typ();