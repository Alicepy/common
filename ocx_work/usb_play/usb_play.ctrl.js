/**
 * usb播放
 * @Author: zhangxuelian 
 * @Date: 2018-01-07 20:50:28 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-09-15 19:24:54
 **/
define(['app/common/app','common/ocx/ocx3.0/mkv_ocx_3.0','layer','common/device/usb_camera'], function (app,mkvOcx,layer,usbCamera) {
    app.registerController('usbPlayCtrl',
        function ($scope, $modalInstance, $modal, Models,$timeout,commonUtil,modalExt,content,constant_imagestore_url,constant_filestore_url,subject,normalUtil) {

            /**
             * 公共业务
             */
            var common = $scope.common = {
                content: content,
                imgprefix: constant_imagestore_url+'_332x250/',
                url: "",
                currentCamera: "",
                isIe: false,
                usbDicMap: [{
                    count: 0,
                    keyVal: 'VSKY',
                    name: '高拍仪'
                },{
                    count: 0,
                    keyVal: 'USB',
                    name: 'usb摄像头'
                },
                {
                    count: 0,
                    keyVal: 'Webcam',
                    name: '摄像头'
                },{
                    count: 0,
                    keyVal: 'Logitech',
                    name: '罗技摄像头'
                }],
                selectDevices:{
                    data: [],
                    filter: false,
                    panelHeight: 'auto',
                    onSelect: function(item){
                        if(!common.isIe){
                            newUsbPlay.changeDev(item);
                        }
                    }
                },
                translate: function(cameraListRet){
                    var tempArr = [];
                    //数据格式化及翻译
                    angular.forEach(cameraListRet,function(item,i){
                        var temp = {},flag = true,label = "",value = "";
                        if(common.isIe){
                            label = item;
                            value = item;
                        }else{
                            label = item.name;
                            value = item.id;
                        }
                        angular.forEach(common.usbDicMap,function(list,j){
                            if(label.indexOf(list.keyVal) != -1){
                                flag = false;
                                if(list.count){
                                    temp.label = list.name + list.count;
                                }else{
                                    temp.label = list.name;
                                }
                                list.count++;
                            }
                        });
                        if(flag){
                            temp.label = label;
                        }
                        temp.value = value;
                        tempArr.push(temp);
                    });
                    common.selectDevices.data = tempArr;
                    return tempArr;
                },
                getFirstCam: function(tempArr){
                    var szCameraName = "";
                    //同域本地存储上次使用usb摄像头类型,当前仅默认取高拍仪和USB接口摄像头
                    if(common.content.storageName){
                        var shotInstrument = localStorage.getItem(common.content.storageName);
                        if(shotInstrument && normalUtil.eleInArr(tempArr,'value',shotInstrument) != -1){
                            common.selectDevices.setValue = shotInstrument;
                            szCameraName = shotInstrument;
                        }else if(common.content.storageName.indexOf("USB") != -1){
                            var index = 0;
                            for(var i=0; i<tempArr.length; i++){
                                if(tempArr[i].value.indexOf("USB") != -1){
                                    index = i;
                                    break;
                                }
                            }
                            common.selectDevices.setValue = tempArr[index].value;
                            szCameraName = tempArr[index].value;
                            localStorage.setItem(common.content.storageName,tempArr[index].value);
                        }else if(common.content.storageName.indexOf("VSKY") != -1){
                            var index = 0;
                            for(var i=0; i<tempArr.length; i++){
                                if(tempArr[i].value.indexOf("VSKY") != -1){
                                    index = i;
                                    break;
                                }
                            }
                            common.selectDevices.setValue = tempArr[index].value;
                            szCameraName = tempArr[index].value;
                            localStorage.setItem(common.content.storageName,tempArr[index].value);
                        }else{
                            common.selectDevices.setValue = tempArr[0].value;
                            szCameraName = cameraListRet.cameralist[0];
                            localStorage.setItem(common.content.storageName,tempArr[0].value);
                        }
                    }else{
                        common.selectDevices.setValue = tempArr[0].value;
                        szCameraName = cameraListRet.cameralist[0];
                    }
                    return szCameraName;
                },
                cancel:function(){
                    $modalInstance.dismiss('cancel');
                },
                confirm:function(){
                    $modalInstance.close({
                        url:common.url,
                        description:usbPlay.description
                    })
                },
                load:function(){
                    if(normalUtil.isIE()){
                        common.isIe = true;
                        usbPlay.init();
                    }else{
                        newUsbPlay.init();
                    }
                },
                capture: function(){
                    if(common.isIe){
                        usbPlay.capture();
                    }else{
                        newUsbPlay.capture();
                    }
                }
            }

            /**
             * ocx usb
             */
            var usbPlay = $scope.usbPlay = {
                ocxObj: null,
                init: function(){
                    $timeout(function(){
                        //初始化ocx
                        try{
                            usbPlay.ocxObj = mkvOcx.init("mkvOcx",function(ret){
                                //console.log(ret);注册回调
                            }).ocxObj;
                            if(subject.ocxArray){
                                subject.ocxArray.push({
                                    name: 'mkvOcx',
                                    obj: usbPlay.ocxObj
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
                        var cameraListRet = mkvOcx.getUsbCamaraList(usbPlay.ocxObj);
                        mkvOcx.createView(usbPlay.ocxObj);
                        if(cameraListRet && cameraListRet.cameralist && cameraListRet.cameralist.length){
                            var cameralist = common.translate(cameraListRet.cameralist);
                            var szCameraName = common.getFirstCam(cameralist);
                            mkvOcx.startPlayVideo(usbPlay.ocxObj,{szCameraName:szCameraName});
                        }else{
                            modalExt.modalTip({content:"未识别到USB摄像头！",type:"warning",height:150});
                            return;
                        }
                    },500);
                },
                startPlayVideo:function(){
                    mkvOcx.stopPlayVideo(usbPlay.ocxObj);
                    mkvOcx.destroyView(usbPlay.ocxObj);
                    mkvOcx.createView(usbPlay.ocxObj);
                    mkvOcx.startPlayVideo(usbPlay.ocxObj,{szCameraName:common.currentCamera});
                    if(common.content.storageName){
                        localStorage.setItem(common.content.storageName,common.currentCamera);
                    }
                },
                capture:function(){
                    layer.load();
                    var ret = mkvOcx.capture(usbPlay.ocxObj);
                    if(ret.code == null || ret.code != 0){
                        modalExt.modalTip({content:"抓拍失败！",type:"warning",height:150});
                        return;
                    }
                    Models.File.all('upload').post({        
                        data:'data:image/jpeg;base64,'+ret.data.base64code
                    }).then(function(result){
                        layer.closeAll('loading');
                        if(commonUtil.checkCode(result.state)){
                            common.url = result.data;
                        }
                    },function(){
                        layer.closeAll('loading');
                    });
                }
            }

            /**
             * 新版usb（IE8+）
             */
            var newUsbPlay = $scope.newUsbPlay = {
                url: "",
                openWs: null,
                playWs: null,
                camList: [],
                resolution: "640x480",
                canvas: null,
                ctx: null,
                getCamList: function(ret){
                    $scope.$apply(function(){
                        var result = JSON.parse(ret);
                        if(result.code == 0){
                            var cameralist = common.translate(result.data);
                            var cameraId = common.getFirstCam(cameralist);
                            common.currentCamera = cameraId;
                            /* angular.forEach(result.data.size,function(item,i){}); */
                            newUsbPlay.play();
                        }else{
                            modalExt.modalTip({
                                content: "获取usb设备失败！",
                                type: "warning",
                                height: 150
                            });
                        }
                    })
                },
                getStream: function(type,data){
                    switch(type){
                        case "onopen": 
                            newUsbPlay.playWs = data;
                            break;
                        case "onmessage":
                            var img = new Image();
                            img.src = data;
                            img.onload = function () {
                                newUsbPlay.ctx.drawImage(img, 0, 0, newUsbPlay.canvas.width, newUsbPlay.canvas.height);
                            };
                            break;
                        case "onerror":
                            modalExt.modalTip({
                                content: "打开播放流连接失败！",
                                height: 150,
                                type: "warning"
                            });
                            break;
                    }
                },
                play: function(){
                    usbCamera.startStream(newUsbPlay.openWs,common.currentCamera,newUsbPlay.resolution);
                },
                stop: function(){
                    usbCamera.closeStream(newUsbPlay.openWs,newUsbPlay.playWs,common.currentCamera);
                },
                capture: function(){
                    usbCamera.capture(newUsbPlay.openWs,common.currentCamera);
                },
                captureCallback: function(ret){
                    var result = JSON.parse(ret);
                    if(result.code != 0) return;
                    layer.load();
                    Models.File.all('upload').post({        
                        data:'data:image/jpeg;base64,'+result.data
                    }).then(function(result){
                        layer.closeAll('loading');
                        if(commonUtil.checkCode(result.state)){
                            common.url = result.data;
                        }
                    },function(){
                        layer.closeAll('loading');
                    });
                },
                changeDev: function(item){
                    newUsbPlay.stop();
                    common.currentCamera = item.value;
                    newUsbPlay.play();
                    if(common.content.storageName){
                        localStorage.setItem(common.content.storageName,common.currentCamera);
                    }
                },
                init: function(){
                    var _this = this;
                    _this.openWs = usbCamera.init({
                        callback: function(type,ret){
                            switch(type){
                                case "onopen": 
                                    _this.canvas = document.getElementById("usb-camvas");
                                    _this.ctx = _this.canvas.getContext("2d");
                                    usbCamera.getCamList(_this.openWs);
                                    break;
                                case "onclose":
                                    /* modalExt.modalTip({
                                        content: "设备连接关闭！",
                                        type: "warning",
                                        height: 150
                                    }); */
                                    break;
                                case "onerror":
                                    modalExt.modalTip({
                                        content: "设备连接出错！",
                                        type: "warning",
                                        height: 150
                                    });
                                    break;
                            }
                        },
                        getCamList: _this.getCamList,
                        getStream: _this.getStream,
                        capture: _this.captureCallback
                    });
                }
            }
            
            /**
             * 销毁视图
             */
            $scope.$on("$destroy",function(){
                if(usbPlay.ocxObj){
                    $timeout(function(){
                        mkvOcx.stopPlayVideo(usbPlay.ocxObj);
                        mkvOcx.destroyView(usbPlay.ocxObj);
                        mkvOcx.unInit(usbPlay.ocxObj);
                        usbPlay.ocxObj = null;
                        if(subject.ocxArray){
                            var index = normalUtil.eleInArr(subject.ocxArray,'name','mkvOcx');
                            subject.ocxArray.splice(index,1);
                        }
                    },1000);
                }
                if(newUsbPlay.openWs){
                    usbCamera.closeStream(newUsbPlay.openWs,newUsbPlay.playWs,common.currentCamera);
                    usbCamera.close(newUsbPlay.openWs);
                }
            });
        })
})