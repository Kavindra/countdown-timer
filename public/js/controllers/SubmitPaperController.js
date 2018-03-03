angular.module('SubmitPaperController', []).controller('SubmitPaperController', function($scope, $location, $http, countdownService) {

    /*
    * Save information about recently submitted paper.
    * */
    $scope.saveSubmission = function() {
        // Parse date into javascript Date
        var date = new Date($scope.submission.date);
        countdownService.createSubmission([{
            "name" : $scope.submission.name,
            "abbr" : $scope.submission.abbr,
            "date" : date
        }])
        .then(function(result) {
                $location.path("/");
            },
            function(error) {
                console.log("error");
                console.log(error);
            });
    }

});