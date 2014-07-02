pragmApp.controller('crashController', function ($scope) {
    data.unbindCallbacks();
    $scope.lan = 'cool';
    if (data.crashinfo != "") {
        $scope.crashinfo = data.crashinfo;
    } else {
        $scope.crashinfo = 'unknown crash';
        setTimeout("uiControl.view('start');", 1000);
    }
    uiControl.finishRoedel();

    /*data.databind('crashinfo', function (x) {
        $scope.crashinfo = x;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });*/
});