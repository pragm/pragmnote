function manager_typ() {

    this.setUserActive = function (userID, active) {
        pfile.dirObject[userID].active = active;
    };

    this.resetSystem = function () {
        log("RESETTING SYSTEM");
        var dir = fs.readdirSync(global.config.dir);
        for (i in dir) {
            if (fs.existsSync(dir[i])) {
                fs.unlinkSync(dir[i]);
                log("File " + id + ".json deleted");
            }
        }
        pfile.checkFileSystem(JSON.parse(JSON.stringify(defaultData.dirObject)));
        pfile.saveDirObject(true);
    };
}

var manager = new manager_typ();