pragmApp.controller('loginController', function($scope) {
		// create a message to display in our view
		$scope.clientversion = clientversion;
		$scope.lan = 'cool';
		//$scope.loadslide = '';
        
        $scope.getServerAddress = function(){
            return global.config.serveraddress;
        };
        
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