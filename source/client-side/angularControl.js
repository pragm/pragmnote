var pragmApp = angular.module('pragmApp', []);

	// configure our routes
	pragmApp.config(function($routeProvider) {
        //console.info($route.current);
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'templates/login.html',
				controller  : 'loginController'
			})

			// route for the about page
			.when('/editor/:id/', {
				templateUrl : 'templates/noteEditor.html',
				controller  : 'editorController',
                resolve: {
                load: function ($route, dataService) {
                    return dataService.load($route.current.params.id);
                }
                }
			})

			// route for the contact page
			.when('/files', {
				templateUrl : 'templates/fileExplorer.html',
				controller  : 'filesController'
			})
			.when('/crash', {
				templateUrl : 'templates/crash.html',
				controller  : 'crashController'
			})
			.when('/loading', {
				templateUrl : 'templates/loading.html',
				controller  : 'loadingController'
			});
	});


	// create the controller and inject Angular's $scope
	
pragmApp.factory('dataService', function ($q, $timeout) {
    return { 
        data : {},
        load : function(id) {
            var defer = $q.defer();
            var data = this.data;
            $timeout(function () {
                data.id = id;
                defer.resolve(data);
            }, 0);
            return defer.promise;
        }
    };
});
	

	

	

	

    pragmApp.factory('cont', function($rootScope){
        
    });
/*
    pragmApp.directive('contenteditable', function() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return; // do nothing if no ng-model
 
        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };
 
        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$apply(read);
            //console.log("change"+read);
            //data.messages[element] = scope.message;
        });
        read(); // initialize
 
        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if( attrs.stripBr && html == '<br>' ) {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    }
    });*/

    var makeid = function (type){
	   var id = (Math.random()*100000000000000000);
	   id = id.toString();
	   id = id.substring(0,7);
	   return type+""+id;
	   };
