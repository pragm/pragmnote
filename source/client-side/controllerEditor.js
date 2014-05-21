pragmApp.controller('editorController', function($scope, $location, dataService) {
        data.unbindCallbacks();
        $scope.fileID = dataService.data.id;
        var run = true;
        if('login' in data){
            if('userRight' in data.login){
                if(data.login.userRight > 4){
                    run = false;
                }
            } else {
            run = false;
            }
        } else {
            run = false;
        }
        
        if(!run){
             if($location.search().login == "guest"){
                 console.info("autologin guest"); 
                 uiControl.autologinguest = true;
             }
            uiControl.loadview = "editor/"+$scope.fileID;
            $location.path('/');
        } else {
            if(uiControl.autologinguest){
                setTimeout(uiControl.finishRoedel, 100);
            }

            
            tab.fileOpened($scope.fileID);
            L3.loadFileCallback($scope.fileID, function(){
                console.log("Callback => LOADED");
                //data.set('loadinginfo', "");
                uiControl.loadHandlerFin();
            });
            $scope.lan = 'cool';
            $scope.message = 'Contact us! JK. This is just a demo.';

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
                    tab.position("slide10In");
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
            
            // userlist
            
            data.databind('fileUserList', function(x){
              $scope.fileUserList = x;
              $scope.updateAlert();
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            });
            
            $scope.resolveName = function(id){
                return data.getUserName(id);
            };
            
            $scope.getEnd = function(id, cid){
                for(i in $scope.fileUserList){
                    if($scope.fileUserList[i][1] == id && $scope.fileUserList[i][0] != cid){
                        return ":"+cid;
                    }
                }
                return "";
            };
            
            data.updatebind('nameCache', function(){
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            });
            
            // readonly control -----------------------------------------
            
            $scope.fileRights = "fileRights";
            $scope.setbackfileRights = function(){
                $scope.fileRights = "fileRights";
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            
            data.readonlyinfo(function(){
              $scope.fileRights = "fileRightsYellow";
                var scope = $scope;
                setTimeout(function(){$scope.setbackfileRights();},500);
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            });
            
            $scope.readonly = true;
            data.databind('fileRights', function(x){
              $scope.readonly = !x.write;
              $scope.updateAlert();
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            });

            // Something else -------------------------------------------
            uiControl.file = $scope.fileID;
            tab.position("slide10In");
            
            try{
                document.title = data.dirObject[$scope.fileID].name;
            } catch(e){
                //uiControl.crash("ERROR: Maybe you have no rights for this file?");
            }
            //console.log("ANGU => L3: "+L3.file);
            //console.log("ANGU => UI: "+uiControl.file);
            data.showCache();
            tab.position("slide10In");
        }
	});