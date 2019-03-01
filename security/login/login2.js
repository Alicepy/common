define([], function () {
    angular.module('security.login',[])
        .directive('loginToolbar', ['security', function (security) {
            var directive = {
                templateUrl: 'security/login/toolbar.tpl.html',
                restrict: 'E',
                replace: true,
                scope: true,
                link: function ($scope, $element, $attrs, $controller) {
                    $scope.isAuthenticated = security.isAuthenticated;
                    $scope.login = security.showLogin;
                    $scope.logout = security.logout;
                    $scope.$watch(function () {
                        return security.currentUser;
                    }, function (currentUser) {
                        $scope.currentUser = currentUser;
                    });
                }
            };
            return directive;
        }]);
})