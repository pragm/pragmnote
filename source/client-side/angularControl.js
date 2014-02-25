var pragmApp = angular.module('pragmApp', []);

	// configure our routes
	pragmApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'templates/login.html',
				controller  : 'loginController'
			})

			// route for the about page
			.when('/editor', {
				templateUrl : 'templates/noteEditor.html',
				controller  : 'editorController'
			})

			// route for the contact page
			.when('/files', {
				templateUrl : 'templates/fileExplorer.html',
				controller  : 'filesController'
			})
			.when('/crash', {
				templateUrl : 'templates/crash.html',
				controller  : 'crashController'
			})
			.when('/loading', {
				templateUrl : 'templates/loading.html',
				controller  : 'loadingController'
			});
	});


	// create the controller and inject Angular's $scope
	pragmApp.controller('loginController', function($scope) {
		// create a message to display in our view
		$scope.clientversion = clientversion;
		$scope.lan = 'cool';
		//$scope.loadslide = '';
        
        
		
        // Wait handler  ------------------------------------------------------
		$scope.loadinginfo = "";
		$scope.loadshow = 'none';
        $scope.updateLoad = function(){
            //console.log("Update Angular "+$scope.loadinginfo);
            if($scope.loadinginfo==""){
		      $scope.loadshow = 'none';
            } else {
		      $scope.loadshow = 'block';
              //$scope.loadslide = 'width: 100%;';
                document.getElementById('loadingslide').className = 'loadingslideIN';
              setTimeout("document.getElementById('loadingslide').className = 'loadingslideOUT';", 100);
            }
        }
        data.databind('loadinginfo', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.loadinginfo = x;
          $scope.updateLoad();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        // Alert handler   ---------------------------------------------------------
		$scope.alertinfo = "";
		$scope.alertshow = 'none';
        $scope.updateAlert = function(){
            //console.log("Update Angular "+$scope.alertinfo);
            if($scope.alertinfo==""){
		      $scope.alertshow = 'none';
            } else {
		      $scope.alertshow = 'block';
            }
        }
        data.databind('alertinfo', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.alertinfo = x;
          $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        $scope.unalert = function(){
            data.alertinfo = "";                    
            $scope.alertinfo = "";
            $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        }
        /*$scope.lol = 'bla';
        data.databind('messages', function(x){
          console.log("Data: "+JSON.stringify(x));
		  $scope.messages = x;
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });*/
   
	});

	pragmApp.controller('filesController', function($scope) {
		$scope.lan = 'cool';
        
        // Load Handler ----------------------------
		$scope.loadinginfo = "";
		$scope.loadshow = 'none';
        $scope.updateLoad = function(){
            if($scope.loadinginfo==""){
		      $scope.loadshow = 'none';
              document.getElementById('fileTabs').style.height = "50px";
              document.getElementById('fileTabs').style.top = "";
            } else {
		      $scope.loadshow = 'block';
              document.getElementById('fileTabs').style.height = "0px";
              document.getElementById('fileTabs').style.top = "-50px";
              document.getElementById('loadingslide').className = 'loadingslideIN';
            }
        }
        data.databind('loadinginfo', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.loadinginfo = x;
          $scope.updateLoad();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        // Alert handler   ---------------------------------------------------------
		$scope.alertinfo = "";
		$scope.alertshow = 'none';
        $scope.updateAlert = function(){
            //console.log("Update Angular "+$scope.alertinfo);
            if($scope.alertinfo==""){
		      $scope.alertshow = 'none';
              document.getElementById('fileTabs').style.height = "50px";
              document.getElementById('fileTabs').style.top = "";
            } else {
		      $scope.alertshow = 'block';
              document.getElementById('fileTabs').style.height = "0px";
              document.getElementById('fileTabs').style.top = "-50px";
            }
        }
        data.databind('alertinfo', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.alertinfo = x;
          $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        $scope.unalert = function(){
            data.alertinfo = "";
            $scope.alertinfo = "";
            $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        }
        
        // Something else -------------------------------------------
		$scope.dirObject = { };
        if(data.acutalDir != ""){
            $scope.actualDir = data.acutalDir;
        } else {
            $scope.actualDir = data.login.userID;
            data.acutalDir = data.login.userID;
        }
        $scope.mainDir = data.login.userID;
        $scope.dirShow = [ ];
        $scope.superFolder = [ ];
        $scope.activeObject = {};
        $scope.activeArray = [];
        $scope.actactive = "";
        $scope.inactivetimer;
        $scope.lastactivate;
        $scope.activenum = 0;
        
        addFile.AddFile = false;
        addFile.AddFileChoice = false;
        
        $scope.getactive = function(key){
            if($scope.activeArray[key]){
                return "fileListUlactive";
            } 
            return "fileListUlli";
        }
        
        $scope.setactive = function(key){
            if($scope.draganddropactive != true){
                if(!global.ctrl && !global.shift){
                    $scope.lastactivate = null;
                    $scope.lastactivate;
                    $scope.activeArray = null;
                    $scope.activeArray = [];
                }
                if($scope.activeArray != [] && global.shift){
                    if($scope.lastactivate){
                        var i = $scope.getPos(key);
                        var k = $scope.getPos($scope.lastactivate);
                        //console.log("von "+i+" nach "+k);
                        if(i>k){
                            var o = i;
                            i = k;
                            k = o;
                        }
                        while(i<=k){
                            //console.log("count"+i);
                            $scope.activeArray[$scope.dirShow[i]] = true;
                            i++;
                        }
                    } else {
                        $scope.activeArray[key] = true;
                        $scope.lastactivate = key;
                    }
                }
                if(!global.shift){
                    if($scope.activeArray[key]){
                        $scope.activeArray[key] = false;
                    } else {
                        $scope.activeArray[key] = true;
                        $scope.lastactivate = key;
                    }
                }
                var selectionarray = [];
                var activecount = 0;
                for(i in $scope.activeArray){
                    if($scope.activeArray[i] == true){
                        activecount++;
                        selectionarray.push(i);
                    }
                }
                data.selectionarray = selectionarray;
                selectionarray = null;
                $scope.activenum = activecount;
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        }
        
        $scope.getPos = function(key){
            var i = 0;
            while($scope.dirShow[i] != key && $scope.dirShow.length >= i){
                i++;
            }
            return i;   
        }
        
        $scope.setinactive = function(){
            if(!global.ctrl && !global.shift){
                $scope.forceinactiv();
            }
        }
        
        $scope.forceinactiv = function(){
            $scope.lastactivate = null;
            $scope.lastactivate;
            $scope.activeArray = null;
            $scope.activeArray = [];
            var selectionarray = [];
            var activecount = 0;
            for(i in $scope.activeArray){
                if($scope.activeArray[i] == true){
                    activecount++;
                    selectionarray.push(i);
                }
            }
            data.selectionarray = selectionarray;
            selectionarray = null;
            $scope.activenum = activecount;
        };
        
        // Drag and Drop -----------------------------------------------
        
        $scope.draganddrop = false;
        $scope.draganddropactive = false;
        $scope.elmdisplay  = "none";
        $scope.moveto  = "none";
        $scope.movetofile  = "";
        $scope.elmtop  = 300;
        $scope.elmleft  = 300;
        
        $scope.clog = function(){
            //console.log('mousemove cLOG');
        }
        
        $scope.mousedown = function(key, $event){
            if($scope.activeArray[key] == true){
                //$scope.elmtop   = $event.clientY-global.chY;
                //$scope.elmleft  = $event.clientX;
                $scope.draganddrop = true;  // INCOMMENT
                //$scope.elmdisplay = "block";
            }
        };
        
        $scope.mouseup = function(){
            if($scope.draganddrop == true && $scope.movetofile != "" && $scope.movetofile != $scope.actualDir){
                console.log("Move files "+JSON.stringify(data.selectionarray)+" to "+$scope.movetofile);
                L3.moveFileList(data.selectionarray, $scope.movetofile);
            }
            $scope.draganddrop = false;
            $scope.elmdisplay = "none";
            $scope.draganddropactive = false;
        };
        
        $scope.mousemove = function($event){
            if($scope.draganddrop == true){
                $scope.elmtop   = $event.clientY-global.chY;
                $scope.elmleft  = $event.clientX+5;
                $scope.elmdisplay = "block";
                $scope.draganddropactive = true;
            }
        };
        
        $scope.mouseover = function(key){
            if($scope.activeArray[key] == true || key.substr(0,1) == 3){
                $scope.moveto = "...";
                $scope.movetofile  = "";
            } else {
                if($scope.dirObject[key]){
                    $scope.moveto = $scope.dirObject[key].name;
                } else {
                    if(key == "4DELETED00"){
                        $scope.moveto = "DELETED";
                    } else {
                        $scope.moveto = "NO NAME FOUND";
                    }
                }
                $scope.movetofile  = key;
            }
        };
        
        $scope.mouseout = function(){
            $scope.moveto = "...";
            $scope.movetofile  = "";
        };
        
        
        // Move / Copy  ---------------------------------------------
        
        $scope.moveclipboard;
        $scope.cilpboardaction;
        
        globalEvent.ctrlbind('X', function(){
            if(uiControl.lastview == 'files'){
                console.log("CRTL+X");
                $scope.moveclipboard = data.selectionarray;
                $scope.cilpboardaction = 'move';
                //data.set('alertinfo', 'Saved to clipboard!');
            }
        });
        
        globalEvent.ctrlbind('C', function(){
            if(uiControl.lastview == 'files'){
                console.log("CRTL+C");
                $scope.moveclipboard = data.selectionarray;
                $scope.cilpboardaction = 'copy';
                //data.set('alertinfo', 'Saved to clipboard!');
            }
        });
        
        globalEvent.ctrlbind('V', function(){
            if(uiControl.lastview == 'files'){
                console.log("CRTL+V");
                if($scope.cilpboardaction == 'move'){
                    console.log("Move files "+JSON.stringify($scope.moveclipboard)+" to "+$scope.actualDir);
                    L3.moveFileList($scope.moveclipboard, $scope.actualDir);
                }
                if($scope.cilpboardaction == 'copy'){
                    console.log("Copy files "+JSON.stringify($scope.moveclipboard)+" to "+$scope.actualDir);
                    L3.copyFileList($scope.moveclipboard, $scope.actualDir);
                }
                $scope.cilpboardaction = '';
            }
        });
        
        globalEvent.ctrlbind('A', function(){
            console.log("CRTL+A");
            for(i in $scope.dirShow){
                $scope.activeArray[$scope.dirShow[i]] = true;
            }
            var selectionarray = [];
            var activecount = 0;
            for(i in $scope.activeArray){
                if($scope.activeArray[i] == true){
                    activecount++;
                    selectionarray.push(i);
                }
            }
            data.selectionarray = selectionarray;
            selectionarray = null;
            $scope.activenum = activecount;
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        
        // Filelist creation --------------------------------------------
        $scope.update = function () {
            var id = $scope.actualDir;
            var counter = 0;
            var tempdir = $scope.dirObject[id].content;
            if(tempdir[0]==""){
                tempdir = [];
            }
            $scope.dirShow = tempdir;
            //console.log($scope.dirShow);
            var temparray = [ ];
            temparray[counter] = id;
            while(id != $scope.mainDir){
                id = $scope.dirObject[id].parent;
                counter++;
                temparray[counter] = id;
            }
            temparray.reverse();
            $scope.superFolder = null;
            $scope.superFolder = temparray;
            temparray = null;
        };
        
        $scope.openFileAngu = function (id) {
            console.log("Openfile: "+id);
            switch(id.substr(0,1)){
                case "3":
                    //Datei Oeffnen
                    $scope.cilpboardaction = '';
                    uiControl.loadFile(id);
                    break;
                case "4":
                    $scope.forceinactiv();
                    $scope.actualDir = id;
                    data.acutalDir = id;
                    $scope.update();
                      $scope.update();
                        if(!$scope.$$phase) {
                            $scope.$apply();
                        }
                    
                    //this.showDir(id);
                    //this.generateFileSuperPath(id);
                    //this.lastDir = id;
                    break;
                case "5":
                    $scope.forceinactiv();
                    $scope.actualDir = id;
                    data.acutalDir = id;
                    $scope.update();
                      $scope.update();
                        if(!$scope.$$phase) {
                            $scope.$apply();
                        }
                    //this.showDir(id);
                    //this.generateFileSuperPath(id);
                    //this.lastDir = id;
                    break;
            }
        };
    
        
        
        data.databind('dirObject', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.dirObject = x;
          $scope.update();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        // Share Popup handler ------------------------------------------
        
        $scope.shareshow = 'none';
        data.databind('shareshow', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.shareshow = x;
          $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
	});

	pragmApp.controller('editorController', function($scope) {
		$scope.lan = 'cool';
		$scope.message = 'Contact us! JK. This is just a demo.';
        
        // Load -----------------------------------------------
		$scope.loadinginfo = "";
		$scope.loadshow = 'none';
        $scope.updateLoad = function(){
            if($scope.loadinginfo==""){
		      $scope.loadshow = 'none';
              document.getElementById('fileTabs').style.height = "";
              document.getElementById('fileTabs').style.top = "";
            } else {
		      $scope.loadshow = 'block';
              document.getElementById('fileTabs').style.height = "0px";
              document.getElementById('fileTabs').style.top = "-50px";
              document.getElementById('loadingslide').className = 'loadingslideIN';
            }
        }
        data.databind('loadinginfo', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.loadinginfo = x;
          $scope.updateLoad();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        // Alert handler   ---------------------------------------------------------
		$scope.alertinfo = "";
		$scope.alertshow = 'none';
        $scope.updateAlert = function(){
            //console.log("Update Angular "+$scope.alertinfo);
            if($scope.alertinfo==""){
		      $scope.alertshow = 'none';
              document.getElementById('fileTabs').style.height = "";
              document.getElementById('fileTabs').style.top = "";
            } else {
		      $scope.alertshow = 'block';
              document.getElementById('fileTabs').style.height = "0px";
              document.getElementById('fileTabs').style.top = "-50px";
            }
        }
        data.databind('alertinfo', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.alertinfo = x;
          $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        $scope.unalert = function(){
            data.alertinfo = "";
            $scope.alertinfo = "";
            $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        }
        
        // Something else -------------------------------------------
        uiControl.file = uiControl.takeFile;
        //console.log("ANGU => L3: "+L3.file);
        //console.log("ANGU => UI: "+uiControl.file);
        data.showCache();
	});

	pragmApp.controller('loadingController', function($scope) {
		$scope.lan = 'cool';
		$scope.message = 'Please wait us! JK. This is just a demo.';
	});

	pragmApp.controller('crashController', function($scope) {
		$scope.lan = 'cool';
		$scope.crashinfo = 'unknown crash';
        
        data.databind('crashinfo', function(x){
		  $scope.crashinfo = x;
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
	});

    pragmApp.factory('cont', function($rootScope){
        
    });

    pragmApp.directive('contenteditable', function() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return; // do nothing if no ng-model
 
        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };
 
        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$apply(read);
            //console.log("change"+read);
            //data.messages[element] = scope.message;
        });
        read(); // initialize
 
        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if( attrs.stripBr && html == '<br>' ) {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    }
    });

    var makeid = function (type){
	   var id = (Math.random()*100000000000000000);
	   id = id.toString();
	   id = id.substring(0,7);
	   return type+""+id;
	   };
