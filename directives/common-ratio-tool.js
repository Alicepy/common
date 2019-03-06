/**
 * 比例进度条（可拖拽）
 * @Author: zhangxuelian 
 * @Date: 2018-01-25 20:24:08 
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-03-06 15:29:45
 **/
define(['common/directives/directives'],function(directives){
    directives.directive("commonRatioTool", function($compile,normalUtil,$timeout) {
        return {
            restrict : "E",
            replace : true,
            scope : {
                ratioConfig : '='
            },
            templateUrl : "bower_components/common/directives/common-ratio-tool.html",
            link:function(scope,ele,attrs){
                var defaultConfig = {
                    percentArray:[50,75,100,125,150,200,400],
                    percentage:100,
                    setRatio:function(){}
                };
                scope.ratioConfig = angular.extend(defaultConfig,scope.ratioConfig || {});
                scope.setRatio = function(type){
                    if(type == 0){//重置
                        scope.ratioConfig.percentage = 100;
                    }
                    if(type == -1){//缩小
                        var index = normalUtil.valInArr(scope.ratioConfig.percentArray,scope.ratioConfig.percentage);
                        if(index != -1 && index != 0){
                            scope.ratioConfig.percentage = scope.ratioConfig.percentArray[index-1];
                        }
                    }
                    if(type == 1){//放大
                        var index = normalUtil.valInArr(scope.ratioConfig.percentArray,scope.ratioConfig.percentage);
                        if(index != -1 && index != (scope.ratioConfig.percentArray.length-1)){
                            scope.ratioConfig.percentage = scope.ratioConfig.percentArray[index+1];
                        }
                    }
                    if(normalUtil.isFunction(scope.ratioConfig.setRatio)){
                        scope.ratioConfig.setRatio(scope.ratioConfig.percentage);
                    }
                }
            }
        }
    })
})