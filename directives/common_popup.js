/**
 * 弹窗组件
 * @Author: zhangxuelian 
 * @Date: 2018-04-26 10:14:26 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-04-26 11:10:55
 **/
define(['common/directives/directives'],function(directives){
    directives.directive("commonPopup", function($compile,normalUtil,$timeout,modalExt) {
        return {
            restrict : "E",
            replace : true,
            scope : {
                popupConfig : '='
            },
            templateUrl : "common/directives/common_popup.html",
            link:function(scope,ele,attrs){

                var popupConfig = {
                    top: '0px',
                    left: '0px',
                    bottom: 'auto',
                    right: 'auto',
                    width: 'auto',
                    height: 'auto',
                    autoLocate: true,//是否启用自动定位，启用后position参数才起效，不启用则使用以上参数来自定义定位 
                    position: 'center center',// left/right/top/bottom
                    content: '',//内容
                    contentClick: function(){},//内容点击回调
                    isHeader: true,//是否显示头部
                    title: '',//标题内容
                    closeClick: function(){},//关闭回调
                    isFooter: true,//是否显示底部
                    buttons: [{//自定义底部按钮组
                        name: '确定',
                        callback: function(){
                            
                        },
                        style: {
                            background: '#12A0FF'
                        }
                    },{
                        name: '取消',
                        callback: function(){
                            
                        },
                        style: {
                            background: '#12A0FF'
                        }
                    }]
                }
                scope.popupConfig = angular.extend(popupConfig,scope.popupConfig);
                
                scope.closeClick = function(){
                    
                }

            }
        }
    })
})