/**
 * common util
 * @Author: zhangxuelian
 * @Date: 2017-10-20 14:25:27
 * @Last Modified by: liangchaoping
 * @Last Modified time: 2018-08-29 17:33:17
 **/
define(['services/services'], function(services) {
    services.service('commonUtil', function (modalExt, normalUtil, Models, security) {
        /**
         * 接口错误代码检测
         *
         * @param {any} state
         */
        this.checkCode = function(state) {
            if(state.code == 200){
                return true;
            }else{
                modalExt.modalTip({
                    timeout : 3000,
                    content : '【'+state.code+'】'+state.msg,
                    type : 'error'
                });
                return false;
            }
        };
        /**
         * 下载路径
         * 
         * @param {any} obj {url:any,params:any}
         */
        this.downloadFile = function(obj){
            var str = '';
            for(i in obj.params){
                str += i+'=' + obj.params[i];
            }
            window.location.href = obj.url +'?'+str; 
        },
        /**
         * 指纹仪
         * @param  {func} callback 回调
         */
        this.fingerPrint = function(callback){
            var modalInstance = $modal.open({
                templateUrl:'common/ocx_work/finger_print/finger_print.tpl.html',
                controller: 'fingerPrintCtrl',
                width: '200',
                height: '285',
                resolve:{
                    dummy: $couchPotato.resolveDependencies(['common/ocx_work/finger_print/finger_print.ctrl.js'])
                }
            })
            modalInstance.result.then(function(result){
                if(result.paTemplate.length){
                    if(normalUtil.isFunction(callback)){
                        callback(result);//result.imgUrl:指纹图片 result.paTemplate:指纹特征值 result.iLen:指纹特征长度
                    }
                }else{
                    modalExt.modalTip({content:'请录入完整指纹！',type:'warning',height:150});
                }
            });
        },
        /**签名版
         * @param  {func} callback 回调
         */
        this.signature = function(callback){
            var modalInstance = $modal.open({
                templateUrl:'common/ocx_work/signature/signature.tpl.html',
                controller:'signatureCtrl',
                width:450,
                height:320,
                resolve:{
                    dummy: $couchPotato.resolveDependencies(['common/ocx_work/signature/signature.ctrl.js'])
                }
            });
            modalInstance.result.then(function(ret) {  
                if(normalUtil.isFunction(callback)){
                    callback(ret);//ret:签名的图片地址
                }
            });
        },
        /**
         * 根据时间播放录像
         * @param  {string} ipcMagicId
         * @param  {string} startTime
         * @param  {string} endTime
         * @param  {obj} palyParam 视频播放参数，详见play_ocx_2.play的replayByTime函数
         */
        this.replayByTime = function(ipcMagicId,startTime,endTime,palyParam){
            if(!(ipcMagicId && startTime && endTime)){
                modalExt.modalTip({content:'参数不完整！',type:'warning',height:150});
                return;
            }
            Models.Ipc.one("info/"+ipcMagicId).get().then(function(ret){
                var szStartTime = $.trim(startTime).replace(" ","-").replace(/:/g,"-");
                var szEndTime = $.trim(endTime).replace(" ","-").replace(/:/g,"-");
                if(ret.state.code == 200){
                    var defaultParams = {
                        szNodeID:ret.data.ipcStreamParam,
                        szStartTime:szStartTime,
                        szEndTime:szEndTime,
                        szCurrentPlayTime:szStartTime
                    };
                    var theParams = angular.extend(defaultParams,palyParam);
                    var modalInstance = $modal.open({
                        templateUrl:'common/ocx_work/replay/replay.tpl.html',
                        controller:'replayCtrl',
                        width:540,
                        height:460,
                        resolve:{
                            content:function () {
                                var item = {
                                    title:ret.data.ipcName || '播放录像',
                                    palyParam:theParams
                                };
                                return item;
                            },
                            dummy: $couchPotato.resolveDependencies(['common/ocx_work/replay/replay.ctrl.js'])
                        }
                    });
                }else{
                    modalExt.modalTip({content:ret.state.msg,type:'warning'});
                }
            });
        },
        /**
         * 播放实时视频
         */
        /**
         * @param  {string} ipcMagicId
         * @param  {obj} palyParam 视频播放参数，play_ocx_2.playRealVideo函数
         * @param  {obj} toolParam 视频播放窗口工具栏参数自定义，详见play_ocx_2.0的setLiveDispWndTool函数
         */
        this.playRealVideo = function(ipcMagicId,palyParam,toolParam){
            if(!ipcMagicId ){
                modalExt.modalTip({content:'参数不完整！',type:'warning',height:150});
                return;
            }
            Models.Ipc.one("info/"+ipcMagicId).get().then(function(ret){
                if(ret.state.code == 200){
                    var defaultPalyParam = {
                        szNodeID:ret.data.ipcStreamParam
                    };
                    var thePalyParam = angular.extend(defaultPalyParam,palyParam);
                    var defaultToolParam = {};
                    var theToolParam = angular.extend(defaultToolParam,toolParam);
                    var modalInstance = $modal.open({
                        templateUrl:'common/ocx_work/play/play.tpl.html',
                        controller:'playCtrl',
                        width:540,
                        height:460,
                        resolve:{
                            content:function () {
                                var item = {
                                    title:ret.data.ipcName || '播放视频',
                                    toolParam:theToolParam,
                                    palyParam:thePalyParam
                                };
                                return item;
                            },
                            dummy: $couchPotato.resolveDependencies(['common/ocx_work/play/play.ctrl.js'])
                        }
                    });
                }else{
                    modalExt.modalTip({content:ret.state.msg,type:'warning'});
                }
            })
        },
        /**
         * 加载USB摄像头
         * @param  {obj} params params.title 弹窗名称 params.showDescript 是否显示抓拍图片的描述框
         * @param  {func} callback 回调
         */
        this.usbPlay = function(params,callback){
            var defaultParams = {
                title:"USB拍照",
                showDescript:true
            };
            var theParams = angular.extend(defaultParams,params || {});
            var modalInstance = $modal.open({
                templateUrl: 'common/ocx_work/usb_play/usb_play.tpl.html',
                controller: 'usbPlayCtrl',
                width: 730,
                height: 500,
                resolve: {
                    content:function(){
                        return theParams;
                    },
                    dummy: $couchPotato.resolveDependencies(['common/ocx_work/usb_play/common/ocx_work/usb_play/usb_play.ctrl.js'])
                }
            });
            modalInstance.result.then(function (ret){
                if(normalUtil.isFunction(callback)){
                    callback(ret);//ret.url 抓拍图片地址 ret.description 抓拍图片描述
                }
            });
        },
        /**
         * 活体采集向导
         * 
         * @param {any} xml 
         * @param {any} callback 
         */
        this.liveScan = function(xml,callback){
            // 第一步:建立连接
            var webSocket = new WebSocket("ws://localhost:9000");
            // 第二步:连接成功之后去发送数据
            webSocket.onopen = function() { // 连接成功后的回调函数
                webSocket.send('livescan&' + xml);
            };
            // 第三步:接收到返回的数据后的操作
            webSocket.onmessage = function(msg) {
                var receiveData = msg.data; // 0 或者 1
                callback(receiveData,webSocket.readyState);
            };
        }
        /**
         * 案件编号校验
         * @param string type
         * @param string txt
         * @return boolean
         */
        this.caseCodeReg = function (type, txt) {
            var regObj = {
                'case': {
                    '44': /^A\d{22}$/
                },
                'alert': {
                    '44': /^J\d{24}$/
                }
            };
            if (!security.currentUser.user.organizeCode) {
                if (regObj[type]['44'].test(txt)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                var reg = regObj[type][security.currentUser.user.organizeCode.substring(0, 2)];
                if (!reg) {
                    if (regObj[type]['44'].test(txt)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (reg.test(txt)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        };
        /**
         * 自动校验搜索
         * @param number keyCode
         * @param string val
         * @return function callBack
         */
        this.autoCodeFn = function (keyCode, val, callBack) {
            // 48-57 数字键 65-90英文键盘 94-105 数字键盘 13 108回车键
            if ((47 < keyCode && keyCode < 58) || (64 < keyCode && keyCode < 91) || (95 < keyCode && keyCode < 106)) {
                if (this.caseCodeReg('case', val) || this.caseCodeReg('alert', val)) {
                    if (callBack) return callBack();
                }
            }
        };
    });
});