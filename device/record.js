/**
 * 刻录
 * @Author: zhangxuelian 
 * @Date: 2018-09-05 17:08:26 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-11-15 19:50:27
 **/
define(['common/utils/common_utils'], function(commonUtils) {
    var record = {
        init: function(callback){
            var ws = new WebSocket("ws://127.0.0.1:8899/recoder");
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
        start: function(ws,option){
            var defaultOpt = {
                action: 'start',
                personId: 0,
                copies: 1,
                fileList: [],
                playerPath: "C:\\gosun\\GSWebOCXPackageMKV\\VideoPlayer",
                downloadLink: "",
                fileName: ""
            };
            var theOpt = $.extend(defaultOpt,option);
            ws.send(JSON.stringify(theOpt));
        },
        cancel: function(ws,personId){
            ws.send(JSON.stringify({
                action: 'cancel',
                personId: personId
            }));
        },
        close: function(ws){
            ws.close();
        }
    };
    return record;
});