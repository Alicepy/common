/**
 * modal ext
 * @Author: zhangxuelian 
 * @Date: 2017-09-28 15:24:27 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-07-27 14:04:16
 **/
define(['services/services'],function(services){
    services.service('modalExt', function($modal,$timeout,$document,normalUtil) {
        /**
         * 基于modal的弹窗提示
         * 
         * @param {*} modalObj 
         */
        this.modalTip = function(modalObj){
            var defaultObj = {
                title : "提示",
                content : "",
                timeout : 1500,
                width : 300,
                height : 180,
                type : 'normal',
                finish : function(){}
            }
            var obj = angular.extend(defaultObj,modalObj);
            var modalInstance = $modal.open({
                /**
                 * IE8不支持
                 * template: '<modal-tip title="'+obj.title+'" type="'+obj.type+'" content="'+obj.content+'"></modal-tip>',
                 */
                template:   '<div class="modal-wrap">'+
                            '<div class="modal-header">'+
                                '<div class="modal-title">'+obj.title+'</div>'+
                            '</div>'+
                            '<div class="modal-body modal-tip">'+
                                '<div class="tip-icon '+obj.type+'"></div>'+
                                '<div class="tip-content">'+obj.content+'</div>'+
                            '</div>'+
                            '</div>',
                className: 'modal-sm-ext',
                width : obj.width || 300,
                height : obj.height || 180,
                backdrop:false
            });
            $timeout(function(){
                modalInstance.close();
                if(normalUtil.isFunction(obj.finish)){
                    obj.finish();
                }
            },obj.timeout);
        }

        /**
         * 基于modal的确认弹窗
         * 
         * @param {any} modalObj 
         */
        this.comfirm = function(modalObj){
            var defaultObj = {
                title : "标题",
                content : "",
                type : 'normal',
                width : 300,
                height : 180,
                okValue : '确认',
                cancelValue : '取消',
                comfirmCallback : function(){},
                cancelCallback : function(){}
            }
            var obj = angular.extend(defaultObj,modalObj);
            var modalInstance = $modal.open({
                template:   '<div class="modal-wrap">'+
                                '<div class="modal-header">'+
                                    '<div class="modal-title">'+obj.title+'</div>'+
                                '</div>'+
                                '<div class="modal-body modal-tip">'+
                                    '<div class="tip-icon '+obj.type+'"></div>'+
                                    '<div class="tip-content">'+obj.content+'</div>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                    '<button class="comfirm" ng-click="ok()">'+obj.okValue+'</button>'+
                                    '<button class="cancel" ng-click="cancel()">'+obj.cancelValue+'</button>'+
                                '</div>'+
                            '</div>',
                //size:'sm',
                className: 'modal-sm',
                height : obj.height || 150,
                width : obj.width || 300,
                backdrop:false,
                controller : ModalInstanceCtrl
            });

            function ModalInstanceCtrl($scope, $modalInstance){
                $scope.ok = function(comfirmCallback){
                    $modalInstance.close();
                    if(normalUtil.isFunction(obj.comfirmCallback)){
                        obj.comfirmCallback();
                    }
                }
                $scope.cancel = function(){
                    $modalInstance.close();
                    if(normalUtil.isFunction(obj.cancelCallback)){
                        obj.cancelCallback();
                    }
                }
            }
        }

        /**
         * 基于modal的loading弹窗
         * @param {*} modalObj 
         */
        this.loading = function(modalObj){
            var defaultObj = {
                type:1,
                height:70,
                width:240,
                content:"正在加载中，请稍等..."
            };
            var obj = angular.extend(defaultObj,modalObj || {});
            var modalInstance = $modal.open({
                template:   '<div class="modal-wrap">'+
                                '<div class="modal-body modal-tip">'+
                                    '<div class="tip-icon"><img src="images/common/loading_32x32.gif"/></div>'+
                                    '<div class="tip-content">'+obj.content+'</div>'+
                                '</div>'+
                            '</div>',
                className: 'modal-loading',
                height : obj.height || 70,
                width : obj.width || 240,
                backdrop:false
            });
            return modalInstance;
        }
        /**
         * 基于modal的内容显示弹窗
         * @param  {} modalObj
         */
        this.show = function(modalObj){
            var defaultObj = {
                title:'标题',
                timeout:null,
                height:100,
                width:240,
                content:"",
                finish:function(){},
                closeCallback:function(){}
            };
            var obj = angular.extend(defaultObj,modalObj || {});
            var modalInstance = $modal.open({
                template:   '<div class="modal-wrap">'+
                                '<div class="modal-header">'+
                                    '<div class="modal-title">'+obj.title+'</div>'+
                                    '<div class="modal-close" ng-click="close()" title="关闭弹窗"><i class="fa fa-times"></i></div>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                    '<div class="show-content">'+obj.content+'</div>'+
                                '</div>'+
                            '</div>',
                className:'modal-show',
                height:obj.height || 70,
                width:obj.width || 240,
                controller:ModalInstanceCtrl,
                backdrop:false
            });

            if(obj.timeout){
                $timeout(function(){
                    modalInstance.close();
                    if(normalUtil.isFunction(obj.finish)){
                        obj.finish();
                    }
                },obj.timeout);
            }

            function ModalInstanceCtrl($scope, $modalInstance){
                $scope.close = function(){
                    $modalInstance.close();
                    if(normalUtil.isFunction(obj.closeCallback)){
                        obj.closeCallback();
                    }
                }
            }
            
            return modalInstance;
        }
        
        
    })
})