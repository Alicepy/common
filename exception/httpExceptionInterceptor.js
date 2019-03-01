define([], function () {
    angular.module('exception.httpInterceptor', [])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(function ($q, $injector) {
                var notificationChannel, $http;
                function error(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');
                    // don't send notification until all requests are complete
                    if(response.status === 400 || response.status === 500) {
                        console.log(response);
                        if(response.data.msg){
                            console.log(response.data.msg);
                            // Alertify.dialog.alert(response.data.msg);
                        }else{
                            console.log("unknown error !")
                            // Alertify.dialog.alert("unknown error！");
                        }

                    }
                    return $q.reject(response);
                }

                return {
                    // optional method
                    'responseError': function (rejection) {
                        return error(rejection);
                    }
                }
            });
        }])
});