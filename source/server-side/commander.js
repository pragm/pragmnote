

var commander_typ = function commander_typ(){
    
    this.send = function(comm, object){
        console.log("#"+comm+""+JSON.stringify(object));
    };
    
    this.portBloc = function(port){
        this.send("bloc", {"port": port, "info": "Port is blocked!"})
    };
    
};

var commander = new commander_typ();