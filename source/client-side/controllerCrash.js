pragmApp.controller('crashController', function($scope) {
		data.unbindCallbacks();
        $scope.lan = 'cool';
		$scope.crashinfo = 'unknown crash';
        uiControl.finishRoedel();
        
        data.databind('crashinfo', function(x){
		  $scope.crashinfo = x;
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
	});