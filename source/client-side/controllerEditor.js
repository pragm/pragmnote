pragmApp.controller('editorController', function ($scope, $location, dataService) {
    data.unbindCallbacks();
    $scope.fileID = dataService.data.id;
    var run = true;
    if ('login' in data) {
        if ('userRight' in data.login) {
            if (data.login.userRight > 4) {
                run = false;
            }
        } else {
            run = false;
        }
    } else {
        run = false;
    }

    if (!run) {
        if ($location.search().login == "guest") {
            console.info("autologin guest");
            uiControl.autologinguest = true;
        }
        uiControl.loadview = "editor/" + $scope.fileID;
        $location.path('/');
    } else {
        if (uiControl.autologinguest && data.login.userID == "5GUESTUSER" && data.login.userRight < 5) {
            setTimeout(uiControl.finishRoedel, 100);
        }


        tab.fileOpened($scope.fileID);
        L3.loadFileCallback($scope.fileID, function () {
           //console.log("Callback => LOADED");
            //data.set('loadinginfo', "");
            uiControl.loadHandlerFin();
        });
        $scope.lan = 'cool';
        $scope.message = 'Contact us! JK. This is just a demo.';

        // Load -----------------------------------------------
        $scope.loadinginfo = "";
        $scope.loadshow = 'none';
        $scope.updateLoad = function () {
            if ($scope.loadinginfo == "") {
                $scope.loadshow = 'none';
                tab.position("slide10In");
            } else {
                $scope.loadshow = 'block';
                tab.position("fastIn");
                document.getElementById('loadingslide').className = 'loadingslideIN';
            }
        }
        data.databind('loadinginfo', function (x) {
            //console.log("Data: "+JSON.stringify(x));
            $scope.loadinginfo = x;
            $scope.updateLoad();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        // Print -------------------------------------------------------------------

        globalEvent.ctrlbind('P', function () {
           //console.log("CRTL+P");
            rich.print();
        });

        // Alert handler   ---------------------------------------------------------
        $scope.alertinfo = "";
        $scope.alertshow = 'none';
        $scope.updateAlert = function () {
            //console.log("Update Angular "+$scope.alertinfo);
            if ($scope.alertinfo == "") {
                $scope.alertshow = 'none';
                tab.position("slide10In");
            } else {
                $scope.alertshow = 'block';
                tab.position("slideIn");
            }
        }
        data.databind('alertinfo', function (x) {
            //console.log("Data: "+JSON.stringify(x));
            $scope.alertinfo = x;
            $scope.updateAlert();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        $scope.unalert = function () {
            data.alertinfo = "";
            $scope.alertinfo = "";
            $scope.updateAlert();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

        // userlist - ----------------------------------------------------

        $scope.userClients = {};
        $scope.freeColors = JSON.parse(JSON.stringify(global.userColors));
        $scope.usedColors = [];
        $scope.oldBList = [];
        $scope.ecomode = false;

        $scope.getFreeColor = function () {
            if ($scope.freeColors.length > 0) {
                var out = $scope.freeColors.pop();
                $scope.usedColors.push(out);
                return out;
            } else {
                return "#000000";
            }
        };

        $scope.setFreeColor = function (color) {
            var i = $scope.usedColors.indexOf(color);
            if (i >= 0) {
                var temp = $scope.usedColors.splice(i, 1)[0];
                $scope.freeColors.push(temp);
            }
        };

        $scope.getClientColor = function (clientID) {
            if (!(clientID in $scope.userClients)) {
                $scope.userClients[clientID] = $scope.getFreeColor();
            }
            return $scope.userClients[clientID];
        };

        $scope.setClientColorFree = function (clientID) {
            if (clientID in $scope.userClients) {
                $scope.setFreeColor($scope.userClients[clientID]);
                delete $scope.userClients[clientID];
            }
        };

        $scope.bgcolor = function (color) {
            return tools.hexToRgb(color, 0.1);
        };


        data.databind('fileUserList', function (x) {
            //GET FileUserList
            var cList = [];
            for (i in x) {
                cList.push(x[i][0].toString());
            }
            for (i in $scope.userClients) {
                if (cList.indexOf(i) < 0) {
                    $scope.setClientColorFree(i);
                }
            }
            for (i in x) {
                x[i][3] = $scope.getClientColor(x[i][0]);
            }
            var bList = [];
            for (i in x) {
                if (x[i][2] != "" && x[i][0] != data.ownclientID) {
                    bList.push(x[i][2].toString());
                    //console.log("BLOCK=" + x[i][2]);
                    if ($scope.oldBList.indexOf(x[i][2].toString()) < 0) {
                        //console.log("BLOCKTRUE=" + x[i][2]);
                        if (!textbox.setBlocked(x[i][2], x[i][3])) {
                            bList.pop();
                        }
                    }
                }
            }
            //console.log("BLIST");
            //console.log(bList);
            for (i in $scope.oldBList) {
                if (bList.indexOf($scope.oldBList[i].toString()) < 0) {
                   //console.log("UNBLOCK=" + $scope.oldBList[i]);
                    textbox.setUnBlocked($scope.oldBList[i]);
                }
            }
            $scope.oldBList = null;
            $scope.oldBList = bList;
            if (x.length <= 1) {
                $scope.ecomode = true;
                data.ecoMode = true;
                textbox.ecoMode(true);
            } else {
                if ($scope.ecoMode == true || data.ecoMode == true) {
                    $scope.ecomode = false;
                    data.ecoMode = false;
                    textbox.ecoMode(false);
                    //textbox.deactivateEcoMode();
                }
            }
            $scope.fileUserList = x;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        $scope.resolveName = function (id) {
            return data.getUserName(id);
        };

        $scope.getEnd = function (id, cid) {
            var me = "";
            if (cid == data.ownclientID) {
                me = " (me)";
            }
            for (i in $scope.fileUserList) {
                if ($scope.fileUserList[i][1] == id && $scope.fileUserList[i][0] != cid) {
                    return ":" + cid + me;
                }
            }

            return me;
        };

        data.updatebind('nameCache', function () {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        // readonly control -----------------------------------------

        $scope.fileRights = "fileRights";
        $scope.setbackfileRights = function () {
            $scope.fileRights = "fileRights";
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        data.readonlyinfo(function () {
            $scope.fileRights = "fileRightsYellow";
            var scope = $scope;
            setTimeout(function () {
                $scope.setbackfileRights();
            }, 500);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        $scope.readonly = true;
        data.databind('fileRights', function (x) {
            $scope.readonly = !x.write;
            $scope.updateAlert();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        /*$scope.readonly = true;
        $scope.dirObject = {};
        data.databind('dirObject', function (x) {
            $scope.dirObject = x;
            //$scope.readonly = !fRights.isUserAllowedTo($scope.fileID, 'write');
            //$scope.updateAlert();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });*/

        // TAB catcher indent outdent -------------------------------

        globalEvent.ctrlbind('indent', function () {
            if (uiControl.lastview == 'editor') {
               //console.log("TAB");
                rich.fontEdit('indent');
            }
        });

        globalEvent.ctrlbind('outdent', function () {
            if (uiControl.lastview == 'editor') {
               //console.log("SHIFT+TAB");
                rich.fontEdit('outdent');
            }
        });

        // Something else -------------------------------------------
        uiControl.file = $scope.fileID;
        tab.position("slide10In");

        try {
            document.title = data.dirObject[$scope.fileID].name;
        } catch (e) {
            //uiControl.crash("ERROR: Maybe you have no rights for this file?");
        }
        //console.log("ANGU => L3: "+L3.file);
        //console.log("ANGU => UI: "+uiControl.file);
        data.showCache();
        tab.openFile($scope.fileID);
        tab.position("slide10In");
    }
});