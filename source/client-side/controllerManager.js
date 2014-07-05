/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 23.06.2014
#       Filename......................: managerController.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

pragmApp.controller('managerController', function($scope, $location) {
    data.unbindCallbacks();

    $scope.hideKeys = true;
    $scope.hideUser = false;
    $scope.userinfo = false;
    $scope.userdata = {};
    $scope.userdata.name = "Nobody";
    $scope.userinfodata = "";


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
        uiControl.loadview = "manager";
        $location.path('/');
    } else {
        uiControl.finishRoedel();

        $scope.mainDir = data.login.userID;
        $scope.dirShow = [];
        $scope.deleteButton = '<input type="button" value="delete" ng-click="deleteInviteKey()">';

        // Load Handler ----------------------------
        $scope.loadinginfo = "";
        $scope.loadshow = 'none';
        $scope.updateLoad = function() {
            if ($scope.loadinginfo == "") {
                $scope.loadshow = 'none';
                tab.position("slide10In");
            } else {
                $scope.loadshow = 'block';
                tab.position("slideOut");
                document.getElementById('loadingslide').className = 'loadingslideIN';
            }
        }
        data.databind('loadinginfo', function(x) {
            //console.log("Data: "+JSON.stringify(x));
            $scope.loadinginfo = x;
            $scope.updateLoad();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        // Alert handler   ---------------------------------------------------------
        $scope.alertinfo = "";
        $scope.alertshow = 'none';
        $scope.updateAlert = function() {
            //console.log("Update Angular "+$scope.alertinfo);
            if ($scope.alertinfo == "") {
                $scope.alertshow = 'none';
                if (!$scope.shareshowbool) {
                    tab.position("slideOut");
                }
            } else {
                $scope.alertshow = 'block';
                tab.position("slideIn");
            }
        }
        data.databind('alertinfo', function(x) {
            //console.log("Data: "+JSON.stringify(x));
            $scope.alertinfo = x;
            $scope.updateAlert();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        $scope.unalert = function() {
            data.alertinfo = "";
            $scope.alertinfo = "";
            $scope.updateAlert();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        // BIND Dirobject ==============================================================

        data.databind('dirObject', function(x) {
            //console.log("Data: "+JSON.stringify(x));
            $scope.dirObject = x;

            $scope.dirShow = [];
            for (i in x) {
                if (i[0] == 5) {
                    $scope.dirShow.push(i);
                }
            }
            $scope.storageScore = Math.round($scope.dirObject.storageScore / 1000000000 * 100);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

        // Something else :D ========================================================

        $scope.toggleShow = function() {
            $scope.hideKeys = !$scope.hideKeys;
            $scope.hideUser = !$scope.hideUser;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.getServerAddress = function() {
            return global.config.serveraddress;
        };

        $scope.showDate = function(x) {
            return date.showDate(x);
        };

        $scope.showDateUsed = function(x) {
            if (x) {
                return date.showDate(x);
            } else {
                return "Never!";
            }
        };

        $scope.deleteInviteKey = function(key) {
            console.log("Delete Invite Key: " + key);
            L2.send(sID.deleteInviteKey, key);
        };

        $scope.setUserActive = function(userID, active) {
            //$scope.dirObject[key].active = active;
            console.log("Set User Active: " + userID + " " + active);
            L2.send(sID.setUserActive, JSON.stringify({
                "userID": userID,
                "active": active
            }));
        };

        $scope.toggleOnOff = function(key) {
            $scope.setUserActive(key, !$scope.dirObject[key].active);
        };

        $scope.createInviteKey = function() {
            console.log("Create Invite Key");
            L2.send(sID.createInviteKey, "");
        };
        
        $scope.userinfoid = "";

        $scope.showUserInfo = function(userID) {
            $scope.userinfoid = userID;
            $scope.userinfodata = $scope.dirObject[userID];
            $scope.userinfo = true;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.closeUserInfo = function() {
            $scope.userinfo = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        
        $scope.changeUserData = function(){
            var p = document.getElementsByClassName('USC');
            var obj = {};
            for(var i = 0; i<p.length; i++){
                var key = p[i].id.substr(4);
                obj[key] = p[i].value;
            }
            obj.userID = $scope.userinfoid;
            L2.send(sID.chUserConfig, JSON.stringify(obj));
            console.log(obj);
        };

    }

});