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