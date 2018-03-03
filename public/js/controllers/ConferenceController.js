angular.module('ConferenceEntryController', []).controller('ConferenceEntryController', function($scope, $location, $http, countdownService, $routeParams) {

	/*
	* Save conference entry.
	* */
    $scope.saveEntry = function() {
    	// Convert conference date into javascript date format before saving.
        var date = new Date($scope.conference.date);

		countdownService.create([{
			"name" : $scope.conference.name,
			"abbr" : $scope.conference.abbr,
			"date" : date
		}])
		.then(function(result) {
				$location.path("/");
			},
			function(error) {
				console.log("error", error);
			});
	}

});