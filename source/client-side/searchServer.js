function getHTTPObject(){
   if (window.ActiveXObject) return new ActiveXObject("Microsoft.XMLHTTP");
   else if (window.XMLHttpRequest) return new XMLHttpRequest();
   else {
      alert("Dein Browser ist scheisse und unterstuetzt kein AJAX!");
      return null;
   }
} 


function searchServer(){
    
    this.list = global.config.list;
    this.protocols = {"http":80,"ftp":21,"https":443};
    this.request = [];
    this.requestcount = -1;
    this.url = document.URL;
    var pro = this.url.split('://');
    this.protocol = pro[0];
    var dom = pro[1].split('/')[0].split(':');
    this.domain = dom[0];
    this.port = parseInt(dom[1]) || this.protocols[this.protocol] || 80;
    this.defaulturl = "http://localhost:8080/socket.io/1/";
    this.currentAddress = {"domain": "localhost", "protocol": "http", "port": 8080, "prio": 0};
    
    var that = this;
    
    this.generateList = function(){
        this.list.push({"domain": this.domain, "protocol": this.protocol, "port": this.port, "prio": 9});
        this.list.push({"domain": this.domain, "protocol": this.protocol, "port": global.config.defaultport, "prio": 8});
        for(i in global.config.otherPorts){
            this.list.push({"domain": this.domain, "protocol": this.protocol, "port": global.config.otherPorts[i], "prio": 6});
        }
    };
    
    this.checkAll = function(){
        for(i in this.list){
            var x = this.list[i];
            this.checkThis(x.protocol+"://"+x.domain+":"+x.port+"/socket.io/1/", x);
        }
    };
    
    this.checkThisCB = function (id, addr){
        if(that.request[id].readyState == 4){
            var httpresponsText = that.request[id].responseText;
            if(httpresponsText.length > 20 && httpresponsText.length<80){
                if(that.currentAddress.prio<addr.prio){
                    that.currentAddress = JSON.parse(JSON.stringify(addr));
                    global.config.serveraddress = that.currentAddress.protocol+"://"+that.currentAddress.domain+":"+that.currentAddress.port+"/";
                }
            }
        }
    };
  
    this.checkThis = function(srv, addr){
        this.requestcount++;
        var id = this.requestcount;
        this.request[id] = getHTTPObject();
        if (this.request[id] != null) {
            this.request[id].open("POST",  srv, true);
            this.request[id].setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
            this.request[id].send();
            this.request[id].onreadystatechange = function temp(){
                that.checkThisCB(id, addr);
            };
        }
    };
    
}