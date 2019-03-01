/**
 * 签名板
 * @Author: zhangxuelian 
 * @Date: 2018-01-02 21:32:21 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-05-09 09:57:02
 **/
//手写版签名回调
var universalSign = null;
var universalModels = null;
var universalScope = null;
var universalCommonUtil = null;
var universalModalExt = null;
var signComplete = function() {
    var base64Str = universalSign.getBase64Stream();
    if(!base64Str){
        //universalModalExt.modalTip({content:'请签名！',type:'warning',height:150});
        alert("请签名！");
        return;
    }
	universalSign.clear();
	universalModels.File.all('upload').post({        
        data:'data:image/jpeg;base64,'+base64Str
    }).then(function(ret){
        if(ret.state.code == 200){
            universalScope.imgUrl = ret.data;
            universalScope.confirm();
        }else{
            alert(ret.state.msg);
        }
        /* if(universalCommonUtil.checkCode(ret.state)){
            
        } */
    })
}
define(['app/common/app','common/ocx/signature_ocx'], function (app,signature) {
    universalSign = signature;
    app.registerController('signatureCtrl',
        function ($scope, $modalInstance, $modal, Models,$timeout,commonUtil,modalExt) {
            $scope.load = function(){
                $timeout(function(){
                    universalSign.init();
                },500)
            }

            $scope.ok = function(){
                signComplete();
            }

            $scope.cancel = function () {
                universalSign.finish();
                $modalInstance.dismiss('cancel');
            };

            $scope.confirm = function(){
                universalSign.finish();
                $modalInstance.close(universalScope.imgUrl);
            }
            
            $scope.$on("$destroy", function() {
                universalSign.finish();
            })

            universalScope = $scope;
            universalModels = Models;
            universalCommonUtil = commonUtil;
            universalModalExt = modalExt;
    })
})