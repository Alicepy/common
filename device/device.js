/**
 * 指纹仪/手写板/身份证
 * @Author: zhangxuelian 
 * @Date: 2018-08-31 11:04:31 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-11-28 20:06:54
 **/
define(['common/utils/common_utils'], function(commonUtils) {
    var Device = {
        fingerUrl: "ws://127.0.0.1:8899/finger",
        pensignUrl: "ws://127.0.0.1:8899/pensign",
        idcardUrl: "ws://127.0.0.1:8899/idcard",
        /**
         * 初始化
         * 
         * @param {any} type 0:指纹仪 1:手写板 2:身份证/rfid电子标签
         * @param {fun} callback websoket回调
         * @returns {any} WebSocket对象
         */
        init: function(type,callback){
            var url = "";
            switch(type){
                case 0: 
                    url = Device.fingerUrl;
                    break;
                case 1:
                    url = Device.pensignUrl;
                    break;
                case 2:
                    url = Device.idcardUrl;
                    break;
            }
            var ws = new WebSocket(url);
            ws.onopen = function(e){
                callback && callback("onopen",e);
            };
            ws.onmessage = function(ret){
                callback && callback("onmessage",ret);
            };
            ws.onclose = function(e){
                callback && callback("onclose",e);
            };
            ws.onerror = function(e){
                callback && callback("onerror",e);
                if(!commonUtils.isIE()){
                    window.location.href = 'GoSocket://';
                }
            };
            return ws;
        },
        open: function(ws){
            ws.send("open");
        },
        read: function(ws){
            ws.send("read");
        },
        stop: function(ws){
            ws.send("close");
        },
        close: function(ws){
            ws.close();
        }
    };
    return Device;
});