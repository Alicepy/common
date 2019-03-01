define([], function () {
        angular.module('app')
        .registerController('SSOLoginController',function ($scope, security, $location) {        	
        	
        	$scope.ssoLoginUrl = '../ssoclient/login?openid.ex.ui_mode=popup';
        	
        	window.sso_callback = function(){
        		security.successLogin();
        	}
        	
        });
});
