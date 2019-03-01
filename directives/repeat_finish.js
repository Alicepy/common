/*
 * @Author: liangchaoping 
 * @Date: 2018-01-23 17:22:50 
 * @Last Modified by: liangchaoping
 * @Last Modified time: 2018-01-23 17:25:04
 */
define(['common/directives/directives'],function(directives){
    directives.directive("repeatFinish", function($compile,normalUtil,$timeout,modalExt) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    })
})