
function manager_typ(){
    
    this.setUserActive = function(userID, active){
        pfile.dirObject[userID].active = active;
    };
}

var manager = new manager_typ();