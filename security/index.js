define(['common/security/security','common/security/authorization','common/security/interceptor'], function () {
    angular.module('security', [
      'security.service',
      'security.interceptor',
      'security.login',
      'security.authorization']);
});