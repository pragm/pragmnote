pragmApp.controller('accountController', function($scope, $location) {
		data.unbindCallbacks();
        $scope.lan = 'cool';
		$scope.crashinfo = 'unknown crash';
        uiControl.finishRoedel();
        $scope.form = {};
        tab.position("slideIn");
        if($location.search().invitekey && $location.search().invitekey.length >1){
            document.getElementById('forminvitekey').value = $location.search().invitekey;
        }
        
        $scope.sendform = function(){
            var y = {};
            y.username = document.getElementById('formusername').value;
            y.firstname = document.getElementById('formfirstname').value;
            y.lastname = document.getElementById('formlastname').value;
            y.emailA = document.getElementById('formemailA').value;
            y.emailB = document.getElementById('formemailB').value;
            y.passwordA = document.getElementById('formpasswordA').value;
            y.passwordB = document.getElementById('formpasswordB').value;
            y.invitekey = document.getElementById('forminvitekey').value;
            if(y.emailA != y.emailB){
                alert("E-Mails are not equal!");
                return;
            }
            if(y.passwordA != y.passwordB){
                uiControl.alert("Passwords are not equal!");
                return;
            }
            if(!('username' in y && y.username.length >= 3 && y.username.length <= 20)){
                uiControl.alert("Username needs to have 3-20 chars!");
                return;
            }
            if(!('firstname' in y && y.firstname.length >= 2 && y.firstname.length <= 32)){
                uiControl.alert("Firstname needs to have 2-32 chars! ");
                return;
            }
            if(!('lastname' in y && y.lastname.length >= 2 && y.lastname.length <= 32)){
                uiControl.alert("Lastname needs to have 2-32 chars!");
                return;
            }
            if(!('passwordA' in y && y.passwordA.length >= 8 && y.passwordA.length <= 20)){
                uiControl.alert("Passwords needs to have 8-20 chars!");
                return;
            }
            if(!(y.invitekey.length == 32)){
                uiControl.alert("The Invite-Key needs to have exact 32 chars!");
                return;
            }
            var x = {};
            x.email = y.emailA; 
            x.password = y.passwordA;
            x.username = y.username;
            x.firstname = y.firstname;
            x.lastname = y.lastname;
            x.invitekey = y.invitekey;
            console.log("Good: "+JSON.stringify(x));
            L3.createUser(x);
        }
        
        data.databind('crashinfo', function(x){
		  $scope.crashinfo = x;
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        // ALERTCONTROL ====================================================
        $scope.alertinfo = "";
		$scope.alertshow = 'none';
        $scope.updateAlert = function(){
            //console.log("Update Angular "+$scope.alertinfo);
            if($scope.alertinfo==""){
		      $scope.alertshow = 'none';
                if(!$scope.shareshowbool){
                    tab.position("slideIn");
                }
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
	});