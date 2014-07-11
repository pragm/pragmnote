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
    $scope.notiObj = {"l1": "fa-group", "l2":"fa-file-text", "t1": "NO DATA", "t2": "NO DATA"};
    $scope.notiData = {};
    $scope.showNotiHeight = "0px";
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
    $scope.lastNotiNumber = 0;

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

    $scope.showNewNoti = function () {
        $scope.newNotiPad = "1";
        $scope.newNotiMax = "60px";
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.hideNewNoti = function () {
        $scope.newNotiPad = "0";
        $scope.newNotiMax = "-46px";
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.resolveName = function (id) {
        return data.getUserName(id);
    };
    
    $scope.rightinfo = ['readonly', 'write', 'admin'];

    $scope.showNotiInfo = function (noti) {
        var id = noti.id;
        var type = noti.type;
        var who = noti.who;
        var text = $scope.resolveName(who) + " invited you to " + $scope.dirObject[id].name + "!";
        switch (type) {
        case "shareadd":
            $scope.notiObj.l1 = "fa-group";
            if(id[0]=="3"){
                $scope.notiObj.l2 = "fa-file-text";
            } else {
                $scope.notiObj.l2 = "fa-folder";
            }
            $scope.notiObj.t1 = $scope.resolveName(who) + " invited you to:";
            var right = $scope.rightinfo[$scope.dirObject[id].share[data.login.userID].r];
            $scope.notiObj.t2 = "'"+$scope.dirObject[id].name + "' - Right: "+right.toUpperCase();
            $scope.notiData = noti;
            break;
        default:

            break;
        }
        $scope.showNotiHeight = "";
    };

    $scope.hideNotiInfo = function () {
        $scope.showNotiHeight = "0px";
    };
    
    $scope.notiAccept = function(){
        $scope.hideNotiInfo();
        $scope.notiData.accept = true;
        L2.send(sID.deleteNotification, JSON.stringify($scope.notiData));
    };
    
    $scope.notiDecline = function(){
        $scope.hideNotiInfo();
        $scope.notiData.accept = false;
        L2.send(sID.deleteNotification, JSON.stringify($scope.notiData));
    };

    $scope.dirObject = {};

    $scope.refreshNoti = function () {
        var n = $scope.dirObject[data.login.userID].notifications;
        console.log(JSON.stringify(n));
        var y = [];
        var text = "";
        var id = "";
        var type = "";
        var who = "";
        for (i in n) {
            id = n[i].id;
            type = n[i].type;
            who = n[i].who;
            text = $scope.resolveName(who) + " invited you to " + $scope.dirObject[id].name + "!";
            switch (type) {
            case "shareadd":
                y.push({
                    "icon": "fa-group",
                    "label": "NEW",
                    "text": text,
                    "data": n[i]
                });
                break;
            default:

                break;
            }
        }
        $scope.notifications = y;
    };

    data.databindHard('nameCache', function (x) {
        if (data.login) {
            $scope.refreshNoti();
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    data.databindHard('dirObject', function (x) {
        $scope.dirObject = x;
        if (data.login) {
            $scope.refreshNoti();
            if ($scope.notifications.length > $scope.lastNotiNumber) {
                $scope.showNewNoti();
            }
            $scope.lastNotiNumber = $scope.notifications.length;
        }

        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
});