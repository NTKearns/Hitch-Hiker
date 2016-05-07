//Controllers
angularApp.controller("homeCtrl", ["$scope", "$rootScope", "currentAuth", function ($scope, $rootScope, currentAuth) {
    console.log('Home');
}]);

angularApp.controller("infoCtrl", ["$scope", "$rootScope", "currentAuth", function ($scope, $rootScope, currentAuth) {
    console.log('Info');
}]);

angularApp.controller("termsCtrl", ["$scope", "$rootScope", "currentAuth", function ($scope, $rootScope, currentAuth) {
    console.log('Terms');
}]);

angularApp.controller("testCtrl", ["$scope", "$rootScope", "currentAuth", function ($scope, $rootScope, currentAuth) {
    console.log('Test');
}]);

angularApp.controller("forumCtrl", ["$scope", "$rootScope", "$firebaseArray", "currentAuth", function ($scope, $rootScope, $firebaseArray, currentAuth) {
    console.log('forum');

    var authData = $rootScope.fb.getAuth();
    var userRef = $rootScope.fb.child("forum");
    
    $scope.posts = $firebaseArray(userRef);
    $scope.origin = "";
    $scope.dest = "";
    $scope.message = "";
    
    $scope.searchOrigin = "";
    $scope.searchDest = "";
    
    $scope.showPostButton = true;
    $scope.showPostForm = false;
    $scope.showSearchButton = true;
    $scope.showSearchForm = false;
    
    $scope.showTripForm = function() {
        
        $scope.showPostButton = false;
        $scope.showPostForm = true;
    }
    
    $scope.hideTripForm = function() {
        
        $scope.showPostButton = true;
        $scope.showPostForm = false;
    }
    
    $scope.showSearchTripForm = function() {
        
        $scope.showSearchButton = false;
        $scope.showSearchForm = true;
    }
    
    $scope.hideSearchTripForm = function() {
        
        $scope.showSearchButton = true;
        $scope.showSearchForm = false;
    }
    
    $scope.searchTrips = function() {
        
        var searchRef = userRef;
        
        if ($scope.searchOrigin) {
            
            searchRef = searchRef.orderByChild("original/origin").equalTo($scope.searchOrigin);
        }
        
        if ($scope.searchDest) {
            
            searchRef = searchRef.orderByChild("original/dest").equalTo($scope.searchDest);
        }
        
        $scope.posts = $firebaseArray(searchRef);
    }
    
    $scope.newTrip = function() {
        
        var postDate = new Date().toString();
        
        $scope.posts.$add({
            original: {
                author: authData.uid,
                origin: $scope.origin,
                dest: $scope.dest,
                message: $scope.message,
                date: postDate
            }
        })
        
        $scope.hideTripForm();
    }
}]);

angularApp.controller("forumPostController", ["$scope", "$rootScope", "$firebaseArray", "$firebaseObject", "$routeParams", "currentAuth", function ($scope, $rootScope, $firebaseArray, $firebaseObject, $routeParams, currentAuth) {
    
    var postID = $routeParams.postID;
    var authData = $rootScope.fb.getAuth();
    var postRef = $rootScope.fb.child("forum").child(postID);
    
    $scope.originalPost = $firebaseObject(postRef.child("original"));
    $scope.replies = $firebaseArray(postRef.child("replies"));
    
    $scope.message = "";
    
    $scope.postReply = function() {
        
        var postDate = new Date().toString();
        
        $scope.replies.$add({
            author: authData.uid,
            message: $scope.message,
            date: postDate
        });
        
        $scope.message = "";
    };
}]);

angularApp.controller("profileCtrl", ["$scope", "$rootScope", "currentAuth", function ($scope, $rootScope, currentAuth) {
    console.log('Profile');

    var ref = $rootScope.fb;
    var authData = ref.getAuth();
    $scope.isLogin = function () {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            return true;
        } else {
            console.log("User is logged out");
            return false;
        }
    }

    $scope.changeEmail = function () {
        ref.changeEmail({
            oldEmail: $scope.oldEmail,
            newEmail: $scope.newEmail,
            password: $scope.emailPassword
        }, function (error) {
            if (error === null) {
                console.log("Email changed successfully");
            } else {
                console.log("Error changing email:", error);
            }
        });
    }

    $scope.changePassword = function () {
        ref.changePassword({
            email: $scope.passwordEmail,
            oldPassword: $scope.oldPassword,
            newPassword: $scope.newPassword
        }, function (error) {
            if (error === null) {
                console.log("Password changed successfully");
            } else {
                console.log("Error changing password:", error);
            }
        });
    }

    $scope.deleteAccount = function () {
        ref.removeUser({
            email: $scope.email,
            password: $scope.password
        }, function (error) {
            if (error === null) {
                console.log("User removed successfully");
            } else {
                console.log("Error removing user:", error);
            }
        });
    }
}]);

angularApp.controller("navCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
    console.log('nav');

    var ref = $rootScope.fb;
    var authData = ref.getAuth();

    $scope.isLogin = function () {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            return true;
        } else {
            console.log("User is logged out");
            return false;
        }
    }

    $scope.logout = function () {
        ref.unauth();
        //Reloads the page to the home page
        window.location.href = '/';
    }
}]);

angularApp.controller("loginCtrl", ["$scope", "$rootScope", "currentAuth", function ($scope, $rootScope, currentAuth) {
    console.log('Login');
    var ref = $rootScope.fb;

    $scope.forgotPassword = false;

    $scope.message = function () {
        var shide = "Forgot Password";
        if ($scope.forgotPassword) {
            shide = "Cancel";
        }
        return shide;
    };

    $scope.resetPassword = function () {
        ref.resetPassword({
            email: $scope.email
        }, function (error) {
            if (error === null) {
                console.log("Password reset email sent successfully");
            } else {
                console.log("Error sending password reset email:", error);
            }
        });
    };

    $scope.loginUser = function () {
        ref.authWithPassword({
            email: $scope.email,
            password: $scope.password
        }, function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                window.location.href = '/'
            }
        });
    };

    $scope.isVisible = function () {
        $scope.forgotPassword = $scope.forgotPassword ? false : true;
    }

}]);

angularApp.controller("registerCtrl", ["$scope", "$rootScope", "currentAuth", function ($scope, $rootScope, currentAuth) {
    console.log('Register');

    var ref = $rootScope.fb;

    $scope.createUser = function () {
        ref.createUser({
            email: $scope.email,
            password: $scope.password
        }, function (error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                ref.authWithPassword({
                    email: $scope.email,
                    password: $scope.password
                }, function (error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                    } else {
                        console.log("Authenticated successfully with payload:", authData);
                        window.location.href = '/'
                    }
                });
            }
        });
    };
}]);