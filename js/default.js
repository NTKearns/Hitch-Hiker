//Create the Angular Application and load each module
var angularApp = angular.module('angularApp', ['ngRoute', 'firebase'])
    //Create Auth Factory
angularApp.factory("Auth", ["$firebaseAuth",
  function ($firebaseAuth) {
        var ref = new Firebase("https://nathan-testing.firebaseio.com/");
        return $firebaseAuth(ref);
  }

]);

//Run at the start of the Angular Application
angularApp.run(function ($rootScope, $location, $window, $firebase, $firebaseAuth, $firebaseObject, Auth) {

    //Create the Firebase ref object "fb" that represents the Entire FireBase Database
    $rootScope.fb = new Firebase("https://nathan-testing.firebaseio.com/");
    $rootScope.fbUserRef = $rootScope.fb.child("users");

    //SECURITY HANDLERS --------------------- //

    //    Auth.$onAuth(function (currentAuth) {

    //    if (currentAuth) { //You are logged in so...

    //Set the UI to logged in mode

    //  } else { // You are logged out so...

    //Set the UI to logged in mode

    //}

    //});


    //ROUNTING HANDLERS--------------------//

    //Routing Handler for Client Side URI Routing
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        //populate the route data from the route
        if (next.routedata !== undefined) {
            $rootScope.routedata = next.routedata;
        };

    });
});