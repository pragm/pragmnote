pragmApp.controller('globalController', function ($scope) {
    $scope.showTabs = [];
    data.databindHard('showTabs', function (x) {
        console.log(x);
        var y = {};
        for (i in x) {
            if (x[i]) {
                y[i] = "TabActive";
            } else {
                y[i] = "";
            }
        }
        console.log(y);
        $scope.showTabs = y;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.getFileName = function (key) {
        if ('dirObject' in data && key in data.dirObject) {
            return data.dirObject[key].name;
        }
    };

    $scope.openFile = function (key) {
        uiControl.loadFile(key);
    };
});