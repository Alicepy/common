/**
 * 右击下拉菜单
 * created by lyx on 2017/12/29
 **/
define(['common/directives/directives'],function(directives){
    directives.directive("commonList", function ($compile) {

        return {
            restrict : "E",
            replace : true,
            scope : {
                listConfig : '='
            },
            templateUrl: "common/directives/common_list.html",
            link:function(scope,ele,attrs){
                var listConfig = {
                    //是否显示
                    show: false,
                    list: [],
                    axios:{
                        x : null,
                        y : null
                    }
                }

                scope.listConfig = angluar.extend(listConfig,scope.listConfig)
                
                //销毁
                scope.$on("$destroy", function() {
                    $(ele).remove();    
                })
            }
        };
    });
})