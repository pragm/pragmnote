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
    var pro = url.split('://');
    this.protocol = pro[0];
    var dom = pro[1].split('/')[0].split(':');
    this.domain = dom[0];
    this.port = parseInt(dom[1]) || this.protocols[protocol] || 80;
    this.defaulturl = "http://localhost:8080/socket.io/1/";
    
    var that = this;
    
    this.generateList = function(){
        var url = document.URL;
        var pro = url.split('://');
        var protocol = pro[0];
        var dom = pro[1].split('/')[0].split(':');
        var domain = dom[0];
        var port = parseInt(dom[1]) || this.protocols[protocol] || 80;
    };
    
    this.checkThisCB = function (id){
        if(that.request[id].readyState == 4){
            var httpresponsText = that.request[id].responseText;
            
        }
    };
  
    this.checkThis = function(srv){
        this.requestcount++;
        var id = this.requestcount;
        this.request[id] = getHTTPObject();
        if (this.request[id] != null) {
            this.request[id].open("POST",  srv, true);
            this.request[id].setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
            this.request[id].send();
            this.request[id].onreadystatechange = function temp(){
                that.checkThisCB(id);
            };
        }
    };
    
}