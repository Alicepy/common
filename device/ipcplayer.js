/**
 * ipc player
 * @Author: zhangxuelian 
 * @Date: 2018-09-10 10:16:25 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-11-15 19:50:49
 **/
define(['common/utils/common_utils'], function(commonUtils){
    var ipcPlayer = {
        init: function(callback){
            var ws = new WebSocket("ws://127.0.0.1:8899/video");
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
        login: function(ws,option){
            var defaultOpt = {
                sIP:'',
                nPort:10002,
                sUserName:"sysadmin",
                sPassword:"90cfe39ede38a4deeb4f1750e8e01ba1",
                action: "login"
            };
            var theOpt = $.extend(defaultOpt,option);
            ws.send(JSON.stringify(theOpt));
        },
        sendRtmp: function(ws,option){
            var defaultOpt = {
                szNodeID: "",
                nVideoReqType: 101,
                action: "stream"
            };
            var theOpt = $.extend(defaultOpt,option);
            ws.send(JSON.stringify(theOpt));
        },
        //type:1(实时播放) 0(录像播放)
        initPlayer:function(videoEl,url,type){
            //videojs
            var options = {
                flash: {
                    swf: '/cmt/view/lib/videojs/video-js.swf',
                },
                techOrder: ['flash'],
                //autoplay : true,
                preload : true,
                //controls: type == 1 ? false : true,
                controls: false,
                seek: true,
                poster: "/cmt/view/images/common/loading.gif",
                sources: [{
                    src : url,
                    type: 'rtmp/flv',
                }]
            }
            var player = videojs(videoEl, options, function onPlayerReady() {
                videojs.log('Your player is ready!');
                if(type){
                    this.duration(0);
                }
                this.play();
            });
            return player;
        },
        close: function(ws){
            ws.close();
        }
    };
    return ipcPlayer;
});