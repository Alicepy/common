/**
 * 左侧菜单栏
 * @Author: zhangxuelian 
 * @Date: 2018-03-20 14:50:50 
 * @Last Modified by: caihao
 * @Last Modified time: 2018-10-16 14:01:08
 **/
define(['common/directives/directives'],function(directives){
    directives.directive("accordionMenu", function($compile,normalUtil,$timeout,modalExt,$state) {
        return {
            restrict : "E",
            replace : true,
            scope : {
                accordionConfig : '='
            },
            templateUrl : "common/directives/accordion_menu.html",
            link:function(scope,ele,attrs){
                var defaultConfig = {
                    autoShrink: false,//是否自动收缩
                    setFirst: true,//是否选中第一个

                    data: [],//源数据,一维数组或二维数组
                    
                    oneDimenName: '',//一级菜单标题字段名
                    oneDimenIcon: '',//一级菜单图标字段名
                    
                    childrenName: '',//二维数组对象名
                    twoDimenName: '',//二级菜单标题字段名
                    twoDimenIcon: '',//二级菜单图标字段名

                    clickRouter: function(){},//导航菜单点击回调
                    routerId: 'id',//导航菜单ID字段名
                    selectId: null,//选中导航菜单ID
                    imagePrefix: 'imagestore/', //图片前缀
                    imageSuffix: '.jpg', //图片后缀
                };
                scope.accordionConfig = angular.extend(defaultConfig,scope.accordionConfig || {});

                //导航菜单点击回调
                scope.clickRouter = function(item){
                    if(!item[scope.accordionConfig.childrenName]){
                        scope.accordionConfig.selectId = item[scope.accordionConfig.routerId];
                        if(normalUtil.isFunction(scope.accordionConfig.clickRouter)){
                            scope.accordionConfig.clickRouter(item);
                        }
                    }else{
                        if(scope.accordionConfig.autoShrink){
                            angular.forEach(scope.accordionConfig.data,function(obj,i){
                                obj.open = false;
                            });
                        }
                        if(!!item.open){
                            item.open = false;
                        }else{
                            item.open = true;
                        }
                    }
                }

                //设置数据
                var unbindWatch = scope.$watch("accordionConfig.data",function(newVal,oldVal,scope){
                    if(newVal){
                        if(scope.accordionConfig.setFirst && scope.accordionConfig.data.length){
                            var item  = scope.accordionConfig.data[0];
                            scope.clickRouter(item);
                            if(item[scope.accordionConfig.childrenName] && item[scope.accordionConfig.childrenName].length){
                                scope.accordionConfig.clickRouter(item[scope.accordionConfig.childrenName][0]);
                                scope.accordionConfig.selectId = item[scope.accordionConfig.childrenName][0][scope.accordionConfig.routerId];
                                item.open = true;
                            }
                            
                        }
                    }
                })
                
                scope.$on("$destroy",function(){
                    unbindWatch();
                })

            }
        }
    })
})