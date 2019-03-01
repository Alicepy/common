/**
 * simple panigation
 * @Author: zhangxuelian 
 * @Date: 2017-11-09 15:21:18 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2017-11-23 10:17:38
 **/
define(['common/directives/directives'],function(directives){
    directives.directive("simplePanigation", function($compile,normalUtil,$timeout,modalExt) {
        return {
            restrict : "E",
            replace : true,
            scope : {
                panigationConfig : '='
            },
            templateUrl:"common/directives/simple_panigation.html",
            link:function(scope,ele,attrs){
                //panigation config
                var panigationConfig = {
                    page:1,//当前页
                    total:0,//页总数
                    input:true,//是否可输入page并回车进行调转
                    prevPage:function(){},//上一页
                    nextPage:function(){},//下一页
                    gotoPage:function(){}//跳转至
                }

                //extend
                scope.panigationConfig = angular.extend(panigationConfig,scope.panigationConfig);

                //上一页
                scope.prevPage = function(){
                    if(scope.panigationConfig.page > 1){
                        scope.panigationConfig.page--;
                        if(normalUtil.isFunction(scope.panigationConfig.prevPage)){
                            scope.panigationConfig.prevPage(scope.panigationConfig.page,scope.panigationConfig.total);
                        }
                    }else{
                        modalExt.modalTip({
                            content : '已经是第一页了！',
                            type : 'warning'
                        });
                    }
                }

                //下一页
                scope.nextPage = function(){
                    if(scope.panigationConfig.page < scope.panigationConfig.total){
                        scope.panigationConfig.page++;
                        if(normalUtil.isFunction(scope.panigationConfig.nextPage)){
                            scope.panigationConfig.nextPage(scope.panigationConfig.page,scope.panigationConfig.total);
                        }
                    }else{
                        modalExt.modalTip({
                            content : '已经是最后一页了！',
                            type : 'warning'
                        });
                    }
                }

                //跳转至
                $("body").keydown(function(event) {
                    if (event.keyCode == 13) {
                        var theInput = $(".simple-panigation-container").find("input")[0];
                        if(theInput == document.activeElement && scope.panigationConfig.input){
                            if(scope.panigationConfig.page > 0 && scope.panigationConfig.page <= scope.panigationConfig.total){
                                if(normalUtil.isFunction(scope.panigationConfig.gotoPage)){
                                    scope.panigationConfig.gotoPage(scope.panigationConfig.page,scope.panigationConfig.total);
                                }
                            }else{
                                modalExt.modalTip({
                                    content : '请输入0~'+scope.panigationConfig.total+'范围内的页码',
                                    type : 'warning'
                                });
                            }
                        }
                    }
                });

            }
        }
    })
})