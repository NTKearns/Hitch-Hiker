angularApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

    //Routes for General Areas
        .when('/', {
        // the rest is the same for ui-router and ngRoute...
        controller: 'homeCtrl',
        templateUrl: 'html/home/home.html',
        routedata: {
            access: '0',
            title: 'Home'
        },
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
    })

    .when('/login/', {
        controller: 'loginCtrl',
        templateUrl: 'html/login/login.html',
        routedata: {
            access: '0',
            title: 'Login'
        },
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
    })

    .when('/profile/', {
        controller: 'profileCtrl',
        templateUrl: 'html/profile/profile.html',
        routedata: {
            access: '0',
            title: 'Settings'
        },
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
    })

    .when('/forum/', {
        controller: 'forumCtrl',
        templateUrl: 'html/forum/main.html',
        routedata: {
            access: '0',
            title: 'Forum'
        },
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
    })
    
    .when('/forum/:postID', {
        controller: 'forumPostController',
        templateUrl: 'html/forum/post.html',
        routedata: {
            access: '0',
            title: 'Forum'
        },
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
    })

    .when('/register/', {
        controller: 'registerCtrl',
        templateUrl: 'html/login/register.html',
        routedata: {
            access: '0',
            title: 'Register'
        },
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
    })


    .when('/info/', {
        // the rest is the same for ui-router and ngRoute...
        controller: 'infoCtrl',
        templateUrl: 'html/info/about.html',
        routedata: {
            access: '0',
            title: 'About'
        },
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
    })

    .when('/terms/', {
        // the rest is the same for ui-router and ngRoute...
        controller: 'termsCtrl',
        templateUrl: 'html/info/terms.html',
        routedata: {
            access: '0',
            title: 'Terms'
        },
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
    })

    //Route for Testing  
    .when('/test/', {
        // the rest is the same for ui-router and ngRoute...
        controller: 'testCtrl',
        templateUrl: 'html/test.html',
        routedata: {
            access: '0',
            title: 'Settings'
        },
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
    })

    //If the Route is not found
    .otherwise({
        redirectTo: '/'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(false);

}]);