pragmApp.controller('loginController', function($scope, $location) {
        data.unbindCallbacks();
         if($location.search().login == "guest"){
             console.info("autologin guest"); 
             uiControl.autologinguest = true;
         }
		// create a message to display in our view
		$scope.clientversion = clientversion;
		$scope.lan = 'cool';
		//$scope.loadslide = '';
        
        $scope.serverAddress = "searching...";
        data.databind('serveraddress', function(x){
		  $scope.serverAddress = x;
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        global.onSchange(function(){
            $scope.$apply();
        });
        
		
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
                if(document.getElementById('loadingslide')){
                    document.getElementById('loadingslide').className = 'loadingslideIN';
                    setTimeout("document.getElementById('loadingslide').className = 'loadingslideOUT';", 100);
                } else {
                    console.error("Cannot find document.getElementById('loadingslide')!");
                }
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
        
        if(uiControl.autologinguest){
            setTimeout(uiControl.autologinGuest, 2000);
        } else {
            setTimeout(uiControl.finishRoedel, 100);
        }
	});