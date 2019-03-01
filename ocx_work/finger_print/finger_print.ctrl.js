/**
 * 指纹仪
 * @Author: zhangxuelian 
 * @Date: 2018-01-03 11:49:51 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-11-06 19:44:42
 **/
define(['app/common/app','common/ocx/ocx3.0/mkv_ocx_3.0',"common/device/device"], function (app,mkvOcx,device) {
    app.registerController('fingerPrintCtrl',
        function ($scope, $modalInstance, Models, $timeout, commonUtil, modalExt, normalUtil, subject) {

            var ocxObj = null;
        
            var finger = $scope.finger = {
                isIE: false,
                openWs: null,
                //指纹仪变量
                fingerParms: {
                    reviewId:'#reviewId',
                    imgBase64:'',
                    imgUrl:'',
                    paTemplate:'',
                    iLen: ''
                },
                //等待dom加载完毕
                load: function(){
                    if(!normalUtil.isIE()){
                        try {
                            finger.openWs = device.init(0,function(type,ret){
                                switch(type){
                                    case "onopen":
                                        device.open(finger.openWs);
                                        break;
                                    case "onmessage":
                                        finger.wsCallback(ret);
                                        break;
                                    case "onerror":
                                        modalExt.modalTip({
                                            content: "连接指纹仪出错！",
                                            type: "error",
                                            height: 150
                                        });
                                        break;
                                }
                            });
                            return;
                        } catch (e) {
                            finger.openWs = null;
                        }
                    }
                    finger.isIE = true;
                    $timeout(function(){
                        //初始化ocx
                        try{
                            ocxObj = mkvOcx.init("fingerOcx",finger.fingerRegistCallback).ocxObj;
                            if(subject.ocxArray){
                                subject.ocxArray.push({
                                    name: 'mkvOcx',
                                    obj: ocxObj
                                });
                            }
                        }catch(ex){
                            modalExt.modalTip({
                                title: "系统提示",
                                content: "初始化ocx失败！",
                                type: 'warning',
                                height:150
                            });
                            return;
                        }
                        
                        mkvOcx.initSensor(ocxObj);//初始化指纹仪
                        mkvOcx.beginEnroll(ocxObj);//检测指纹仪
                        
                    },500);
                },
                //指纹仪回调
                fingerRegistCallback: function(data){
                    var ret = JSON.parse(data);
                    if(ret.code == 0){
                        finger.fingerParms.imgBase64 = "data:image/jpeg;base64,"+ret.paImage;//指纹仪图片base64
                        finger.fingerParms.paTemplate = ret.paTemplate;//特征值
                        finger.fingerParms.iLen = ret.iLen;//特征值长度
                        
                        //$(finger.fingerParms.reviewId).attr("src","data:image/bmp;base64,"+finger.fingerParms.imgBase64);
                        Models.File.all('upload').post({        
                            data:finger.fingerParms.imgBase64
                        }).then(function(ret){
                            if(commonUtil.checkCode(ret.state)){
                                finger.fingerParms.imgUrl = ret.data;
                            }
                        })
                        mkvOcx.beginEnroll(ocxObj);
                    }else{
                        finger.fingerParms.imgBase64 = '';
                    }
                },
                //指纹推送回调
                wsCallback: function(ret){
                    var result = JSON.parse(ret.data);
                    if(result.code != 0){
                        modalExt.modalTip({
                            title: "系统提示",
                            content: result.message,
                            type: 'warning',
                            height:150
                        });
                        return;
                    }
                    if(!result.data)return;
                    finger.fingerParms.imgBase64 = "data:image/jpeg;base64,"+result.data.paImage;
                    finger.fingerParms.paTemplate = result.data.paTemplate;//特征值
                        finger.fingerParms.iLen = result.data.iLen;//特征值长度
                    Models.File.all('upload').post({        
                        data:finger.fingerParms.imgBase64
                    }).then(function(ret){
                        if(commonUtil.checkCode(ret.state)){
                            finger.fingerParms.imgUrl = ret.data;
                        }
                    })
                },
                ok:function(){
                    $modalInstance.close({
                        imgUrl:finger.fingerParms.imgUrl,
                        paTemplate:finger.fingerParms.paTemplate,
                        iLen:finger.fingerParms.iLen
                    })
                },
                cancel: function () {
                    $modalInstance.dismiss();
                }
            }

            $scope.$on("$destroy", function() {
                if(ocxObj){
                    mkvOcx.uninitSensor(ocxObj);
                    mkvOcx.unInit(ocxObj);
                    ocxObj = null;
                    if(subject.ocxArray){
                        var index = normalUtil.eleInArr(subject.ocxArray,'name','mkvOcx');
                        subject.ocxArray.splice(index,1);
                    }
                }
                if(finger.openWs){
                    device.close(finger.openWs);
                }
            })

    })
})
