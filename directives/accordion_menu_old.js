/**
 * 左侧菜单栏
 * @Author: zhangxuelian 
 * @Date: 2018-03-20 14:50:50 
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-03-06 15:30:46
 **/
define(['common/directives/directives'],function(directives){
    directives.directive("accordionMenu", function($compile,normalUtil,$timeout,modalExt,$state) {
        return {
            restrict : "E",
            replace : true,
            scope : {
                accordionConfig : '='
            },
            templateUrl : "bower_components/common/directives/accordion_menu.html",
            link:function(scope,ele,attrs){
                var defaultConfig = {
                    autoShrink: false,//是否自动收缩
                    setFirst: true,//默认选中第一个

                    data: [],//源数据,一维数组或二维数组
                    dimension: 1,//0:一维数组（一级菜单，注：这里一维会被转成二维处理，设置请设二维属性，一维属性作废） 1:二维数组（二级菜单）2：一二维数组均有
                    
                    clickOneDimen: function(){},//一级菜单点击回调
                    oneDimenName: '',//一级菜单标题字段名
                    oneDimenIcon: '',//一级菜单图标字段名
                    
                    childrenName: '',//二维数组对象名
                    twoDimenName: '',//二级菜单标题字段名
                    twoDimenIcon: '',//二级菜单图标字段名
                    clickTwoDimen: function(){},//二级菜单点击回调
                    twoDimenId: 'id',//二级菜单ID字段名
                    selectId: null,//选中二级菜单ID
                    isRouter: true,//导航是否为路由跳转
                    routeName: '',//路由名称
                    routerPrefix: '',//路由前缀
                    imagePrefix: 'imagestore/' //图片前缀
                };
                scope.accordionConfig = angular.extend(defaultConfig,scope.accordionConfig || {});

                //设置数据一二维属性
                var resetDimension = function(){
                    if(scope.accordionConfig.dimension == 0){
                        var data = scope.accordionConfig.data;
                        scope.accordionConfig.data = [];
                        var temp = {};
                        temp[scope.accordionConfig.childrenName] = data;
                        scope.accordionConfig.data.push(temp);
                    }
                }

                //默认选中第一个
                var setFirst = function(){
                    if(scope.accordionConfig.setFirst){
                        angular.forEach(scope.accordionConfig.data,function(item,i){
                            if(i == 0){
                                scope.clickOneDimen(item);
                                item.open = true;
                                if(item[scope.accordionConfig.childrenName]){
                                    scope.clickTwoDimen(item[scope.accordionConfig.childrenName][0]);
                                }
                            }
                        });
                    }
                }

                //设置数据
                var unbindWatch1 = scope.$watch("accordionConfig.data",function(newVal,oldVal,scope){
                    if(newVal){
                        setFirst();
                    }
                })
                //设置数据一二维属性
                var unbindWatch2 = scope.$watch("accordionConfig.dimension",function(newVal,oldVal,scope){
                    if(newVal){
                        resetDimension();
                    }
                })

                //一级菜单点击回调
                scope.clickOneDimen = function(item){
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
                    if(normalUtil.isFunction(scope.accordionConfig.clickOneDimen)){
                        scope.accordionConfig.clickOneDimen(item);
                    }
                }
                
                //二级菜单点击回调
                scope.clickTwoDimen = function(item){
                    scope.accordionConfig.selectId = item[scope.accordionConfig.twoDimenId];
                    if(scope.accordionConfig.isRouter){
                        $state.go(scope.accordionConfig.routerPrefix + item[scope.accordionConfig.routeName]);
                    }
                    if(normalUtil.isFunction(scope.accordionConfig.clickTwoDimen)){
                        scope.accordionConfig.clickTwoDimen(item);
                    }
                }
                
                

                scope.$on("$destroy",function(){
                    unbindWatch1();
                    unbindWatch2();
                })

            }
        }
    })
})