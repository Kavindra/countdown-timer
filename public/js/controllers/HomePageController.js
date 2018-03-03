angular.module('HomePageController', []).controller('HomePageController', function($scope, $location, $interval, $http, countdownService, $route) {

    $scope.conferences = [];
    $scope.countdownList = [];
    $scope.lastSubmission = {};

    /*
    * Get the conference data from the database.
    * Calling the get() function in countdown service to send the request to backend.
    * */
	$scope.getData = function () {
	    countdownService.get()
			.then(function(result) {
                // Check if any conference is already there. If not, redirects to the conference entry page.
			    if(result.data.response.length > 0){
                        $scope.conferences = result.data.response;
					} else {
                        console.log("No data");
                        $location.path("entry");
					}
				},
				function(error) {
                    console.log("error", error);
				}
			)
	};

	/*
	* Get the most recently submitted paper's submission date and the conference
	* */
    $scope.getLastSubmission = function () {
         countdownService.getSubmission()
            .then(function(result) {
                    if(result.data.response.length > 0){
                        $scope.lastSubmission = result.data.response[0];
                        $scope.lastSubmission.date = new Date($scope.lastSubmission.date);
                        // Find the number of days since last submission.
                        $scope.lastSubmission.duration = parseInt((new Date().getTime() - $scope.lastSubmission.date.getTime()) / 86400000);
                    } else {
                        console.log("No last submission data");
                    }
                },
                function(error) {
                    console.log("error", error);
                }
            )
    };

    /*
    * Calculate the countdown for each conference.
    * */
    var calculateCountdown = function () {

        $scope.countdownList = [];
    	var today = new Date();
        var todayInMs = today.getTime();

        for(var j = 0; j < $scope.conferences.length; j++) {
			var conf = {};
            conf.name = $scope.conferences[j].conf_name;
            conf.abbr = $scope.conferences[j].abbr;
            var deadlineInMs = new Date($scope.conferences[j].date).getTime();

            var differenceInMs = deadlineInMs - todayInMs;
            differenceInMs = differenceInMs/1000;

            conf.seconds = Math.floor(differenceInMs % 60);
            differenceInMs = differenceInMs/60;

            conf.minutes = Math.floor(differenceInMs % 60);
            differenceInMs = differenceInMs/60;

            conf.hours = Math.floor(differenceInMs % 24);
            conf.days = Math.floor(differenceInMs/24);

            $scope.countdownList.push(conf);
		}


    };

	calculateCountdown();

    //$scope.getData();
    $scope.getLastSubmission();

    $interval(calculateCountdown, 1000);

    $scope.editConference = function (conference) {
        $location.path('/entry/').search({param: conference});
    };


});