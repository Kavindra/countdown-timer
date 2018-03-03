angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomePageController'
        })
        .when('/entry', {
            templateUrl: 'views/entry.html',
            controller: 'ConferenceEntryController'
        })
        .when('/submission', {
            templateUrl: 'views/submitPaper.html',
            controller: 'SubmitPaperController'
        })
        .when('/entry/:id', {
            templateUrl: 'views/entry.html',
            controller: 'ConferenceEntryController'
        });

    $locationProvider.html5Mode(true);

}]);