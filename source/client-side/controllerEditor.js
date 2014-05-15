pragmApp.controller('editorController', function($scope, $location, dataService) {
		$scope.lan = 'cool';
		$scope.message = 'Contact us! JK. This is just a demo.';
        $scope.fileID = dataService.data;
        
        // Load -----------------------------------------------
		$scope.loadinginfo = "";
		$scope.loadshow = 'none';
        $scope.updateLoad = function(){
            if($scope.loadinginfo==""){
		      $scope.loadshow = 'none';
                tab.position("slide10In");
            } else {
		      $scope.loadshow = 'block';
                tab.position("fastIn");
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
                tab.position("slideOut");
            } else {
		      $scope.alertshow = 'block';
                tab.position("slideIn");
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
        tab.position("slide10In");
	});