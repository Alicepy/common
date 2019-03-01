/**
 * usb carame
 * @Author: zhangxuelian 
 * @Date: 2018-08-28 11:42:17 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-11-15 19:50:37
 **/
define(['common/utils/common_utils'], function(commonUtils) {
    var usbCamera = {
        /**
         * websoket接口地址
          */
        wsUrl: "ws://127.0.0.1:8899/webcam",
        /**
         * 初始化
         * 
         * @param {any} param 参数对象
         * @param {fun} param.callback websoket回调
         * @param {fun} param.getCamList 获取camera列表回调
         * @param {fun} param.getStream 获取播放流回调
         * @param {fun} param.getResolution 获取分辨率回调
         * @param {fun} param.capture 抓拍回调
         * @param {fun} param.closeStream 关闭设备回调
         * @returns {any} WebSocket对象
         */
        init: function(param){
            var ws = new WebSocket(this.wsUrl);
            ws.onopen = function(e){
                param.callback && param.callback("onopen",e);
            };
            ws.onmessage = function(ret){
                var result = JSON.parse(ret.data);
                if(result.code != 0) return;
                switch(result.action){
                    case "open" : 
                        param.getCamList && param.getCamList(ret.data || []); 
                        break;
                    case "preview" : 
                        usbCamera.getStream(ret.data||'', param.getStream || null); 
                        break;
                    case "sizes" : 
                        param.getResolution && param.getResolution(ret.data || []); 
                        break;
                    case "capture" : 
                        param.capture && param.capture(ret.data || []); 
                        break;
                    case "close" :  
                        param.closeStream && param.closeStream(ret); 
                        break;
                }
            };
            ws.onclose = function (e){
                param.callback && param.callback("onclose",e);
            };
            ws.onerror = function (e){
                param.callback && param.callback("onerror",e);
                if(!commonUtils.isIE()){
                    window.location.href = 'GoSocket://';
                }
            };
            return ws;
        },
        /**
         * 获取camera列表
         * 
         * @param {any} ws WebSocket对象
         */
        getCamList: function(ws){
            ws.send(JSON.stringify({action: "open"}));
        },
        /**
         * 播放流
         * 
         * @param {any} ws WebSocket对象
         * @param {any} cammera 当前要播放的usb设备名
         * @param {any} resolution 分辨率
         */
        startStream: function(ws,cammera,resolution){
            ws.send(JSON.stringify({action: "preview", id: cammera, resolution: resolution}));
        },
        /**
         * 获取流（base64）
         * 
         * @param {any} streamUrl 播放流websoket地址
         * @param {any} callback 获取流回调
         */
        getStream: function(data,callback){
            var streamUrl = JSON.parse(data).data;
            var ws = new WebSocket(streamUrl);
            ws.onopen = function (e){
                callback && callback("onopen",ws);
            };
            ws.onmessage = function (ret) {
                var src = "data:image/png;base64," + ret.data;
                callback && callback("onmessage",src);
            };
            ws.onclose = function (e){
                callback && callback("onclose",e);
            };
            ws.onerror = function (e){
                callback && callback("onerror",e);
            };
        },
        /**
         * 获取设备所支持的分辨率
         * 
         * @param {any} ws WebSocket对象
         * @param {any} cammera 当前要播放的usb设备名
         */
        getResolution: function(ws,cammera){
            ws.send(JSON.stringify({action: "sizes", id: cammera}));
        },
        /**
         * 抓拍
         * 
         * @param {any} ws WebSocket对象
         * @param {any} cammera 当前要播放的usb设备名
         */
        capture: function(ws,cammera){
            ws.send(JSON.stringify({action: "capture", id: cammera}));
        },
        /**
         * 停止播放流
         * 
         * @param {any} playWs 打开usb设备ws对象
         * @param {any} openWs playWs 播放流ws对象
         * @param {any} cammera 当前要播放的usb设备名
         */
        closeStream: function(openWs,playWs,cammera){
            if(playWs){
                playWs.close();
            }
            openWs.send(JSON.stringify({action: "close", id: cammera}));
        },
        /**
         * 关闭连接
         * 
         * @param {any} ws WebSocket对象
         */
        close: function(ws){
            ws.close();
        }
    };
    return usbCamera;
});