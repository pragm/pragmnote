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

    // Notifications

    $scope.notiPad = "0";
    $scope.notiMax = "30px";
    $scope.notiColor = "";
    $scope.notiColorActive = "#00F53B";
    $scope.notiColorInActive = "";
    $scope.notiHeight = "0px";
    $scope.lastTab = "slide10In";
    $scope.notifications = [{
        "icon": "fa-group",
        "label": "NEWI",
        "text": "Johannes has kicked you!"
    }, {
        "icon": "fa-exclamation-triangle",
        "label": "NEWS",
        "text": "Johannes has not kicked you!"
    }];
    $scope.notifications = [];

    $scope.notiout = function () {
        console.log("out");
    };

    $scope.showNotifications = function () {
        $scope.hideNewNoti();
        $scope.notiHeight = $scope.notiMax;
        $scope.notiPad = "";
        $scope.notiColor = $scope.notiColorActive;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        $scope.lastTab = tab.lastTab;
        tab.position("slideOut");
        document.getElementById('unfocus').focus();
    };

    $scope.hideNotifications = function () {
        tab.position($scope.lastTab);  
        $scope.notiPad = "0";
        $scope.notiColor = $scope.notiColorInActive;
        $scope.notiHeight = "0px";
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    
    $scope.newNotiPad = "0";
    $scope.newNotiMax = "-46px";
    
    $scope.showNewNoti = function(){
        $scope.newNotiPad = "1";
        $scope.newNotiMax = "60px";
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    
    $scope.hideNewNoti = function(){
        $scope.newNotiPad = "0";
        $scope.newNotiMax = "-46px";
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
});