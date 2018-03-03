angular.module('CountdownService', []).factory('countdownService', ['$http', function($http) {

    return {
        /*
        * send request to get the list of upcoming conference deadlines.
        * */
        get : function() {
            console.log("CountdownService.get");
            return $http.get('/api/countdown');
        },
        /*
        * send request to get the information about last submitted paper.
        * */
        getSubmission : function() {
            console.log("CountdownService.getSubmission");
            return $http.get('/api/submission');
        },
        /*
        * send request to save upcoming conference data.
        * */
        create : function(countdownData) {
            console.log(countdownData);
            return $http.post('/api/countdown', countdownData);
        },
        /*
        * send request to save the information about last submitted paper.
        * */
        createSubmission : function(countdownData) {
            console.log(countdownData);
            return $http.post('/api/submission', countdownData);
        }
        // TODO: Delete and Edit conference
    }       

}]);