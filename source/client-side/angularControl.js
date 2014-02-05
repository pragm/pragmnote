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
        
        // Wait handler  ------------------------------------------------------
		$scope.loadinginfo = "";
		$scope.loadshow = 'none';
        $scope.updateLoad = function(){
            console.log("Update Angular "+$scope.loadinginfo);
            if($scope.loadinginfo==""){
		      $scope.loadshow = 'none';
            } else {
		      $scope.loadshow = 'block';
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
            console.log("Update Angular "+$scope.alertinfo);
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
            console.log("Update Angular "+$scope.alertinfo);
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
        
        $scope.update = function () {
            var id = $scope.actualDir;
            var counter = 0;
            $scope.dirShow = $scope.dirObject[id].content.split(";");
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
                    uiControl.loadFile(id);
                    break;
                case "4":
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
            console.log("Update Angular "+$scope.alertinfo);
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
            $scope.alertinfo = "";
            $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        }
        
        // Something else -------------------------------------------
        uiControl.file = uiControl.takeFile;
        console.log("ANGU => L3: "+L3.file);
        console.log("ANGU => UI: "+uiControl.file);
        data.showCache();
	});

	pragmApp.controller('loadingController', function($scope) {
		$scope.lan = 'cool';
		$scope.message = 'Please wait us! JK. This is just a demo.';
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
