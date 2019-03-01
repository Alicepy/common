/**
 * 播放录像
 * @Author: zhangxuelian 
 * @Date: 2018-01-11 20:08:43 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-10-19 15:02:28
 **/
define(['app/common/app','common/ocx/ocx3.0/monitor_ocx_3.0','common/device/ipcplayer'], function (app,monitorOcx,ipcplayer) {
    app.registerController('replayCtrl',
        function ($scope, $modalInstance, $modal, Models,$timeout,commonUtil,modalExt,content,constant_filestore_url,subject,normalUtil,dateUtil,$interval) {

            $scope.content = content;

            var replayCtrl = $scope.replayCtrl = {
                isIE: false,
                sIP: "",
                load: function(){
                    Models.Dictionary.one('SYSTEM_CONFIG', 'BMS_LOGIN_URL').get().then(function (ret) {
                        if(ret.state.code == 200 && ret.data.fieldValue){
                            replayCtrl.sIP = ret.data.fieldValue;
                            //replayCtrl.sIP = "192.168.36.30";
                            if(!normalUtil.isIE()){
                                replayCtrl.wsObj.load();
                            }else{
                                replayCtrl.isIE = true;
                                replayCtrl.ocxObj.load();
                            }
                        }else{
                            modalExt.modalTip({
                                content: "请配置SIP！",
                                type: "warning",
                                height: 150
                            });
                        }
                    },function(){
                        modalExt.modalTip({
                            content: "获取SIP失败！",
                            type: "warning",
                            height: 150
                        });
                    })
                    
                },
                wsObj: {
                    ws: null,
                    load: function(){
                        replayCtrl.wsObj.ws = ipcplayer.init(function(type,ret){
                            switch(type){
                                case "onopen": 
                                    ipcplayer.login(replayCtrl.wsObj.ws,{
                                        sIP: replayCtrl.sIP 
                                    });
                                    break;
                                case "onmessage": 
                                    replayCtrl.wsObj.callback(ret);
                                    break;
                                case "onerror": 
                                    modalExt.modalTip({
                                        content: "连接IPC失败！",
                                        type: "error",
                                        height: 150
                                    });
                                    break;
                            }
                        });
                        return;
                    },
                    callback: function(ret){
                        var result = JSON.parse(ret.data);
                        if(result.code != 0) {
                            modalExt.modalTip({
                                height: 150,
                                type: "error",
                                content: result.message
                            })
                            return;
                        };
                        if(result.action == "login"){
                            ipcplayer.sendRtmp(replayCtrl.wsObj.ws,{
                                action: "record",
                                szNodeID: $scope.content.palyParam.szNodeID,
                                nRecordType: 0,
                                nStorageType: 1,
                                szStartTime: $.trim($scope.content.palyParam.szStartTime).replace(" ","-").replace(/:/g,"-"),
                                szEndTime: $.trim($scope.content.palyParam.szEndTime).replace(" ","-").replace(/:/g,"-"),
                                szCurrentPlayTime: $.trim($scope.content.palyParam.szCurrentPlayTime).replace(" ","-").replace(/:/g,"-")
                            });
                        }
                        if(result.action == "record"){
                            xlVideo.init(result.data);
                        }
                    }
                },
                ocxObj: {
                    ocxInstance: null,
                    load: function(){
                        $timeout(function(){
                            //初始化ocx
                            try{
                                replayCtrl.ocxObj.ocxInstance = monitorOcx.init("playerOcx",function(ret){
                                    //console.log(ret);注册回调
                                }).ocxObj;
                                if(subject.ocxArray){
                                    subject.ocxArray.push({
                                        name: 'monitorOcx',
                                        obj: replayCtrl.ocxObj.ocxInstance
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
                            //登录BMS
                            monitorOcx.login(replayCtrl.ocxObj.ocxInstance,{
                                sIP: replayCtrl.sIP,
                                nPort: 10002,
                                sUserName: "sysadmin",
                                sPassword: "90cfe39ede38a4deeb4f1750e8e01ba1"
                            });

                            //创建录像视图
                            monitorOcx.initReplayWnd(replayCtrl.ocxObj.ocxInstance);
                            //播放控制工具条
                            monitorOcx.setReplayCtrlTool(replayCtrl.ocxObj.ocxInstance);
                            //根据时间播放录像
                            monitorOcx.replayByTime(replayCtrl.ocxObj.ocxInstance,$scope.content.palyParam);
                            
                        },500);
                    }
                }
            }
            
            /**
             * 自定义播放器
             */
            var xlVideo = $scope.xlVideo = {
                player: null,
                isPlayed: false,
                duration: 0,
                formatDuration: "00:00",
                currentDuration: 0,
                currentTime: "00:00",
                isPause: true,
                timer: null,
                hoverTip: "00:00",
                tipLeftRatio: 0,
                lineLeftRatio: 0,
                isFullscreen: false,
                init: function(url){
                    var _this = xlVideo;
                    _this.player = ipcplayer.initPlayer("playContainer",url,0);
                    _this.player.on('seeking', function() {
                        
                    });
                    _this.player.on('seeked', function() {
                        
                    });
                    _this.player.on('playing',function(){
                        if(!_this.isPlayed){
                            _this.isPlayed = true;
                            _this.duration = _this.player.duration() || 0;
                            _this.formatDuration = dateUtil.secondsToDuration(_this.duration);
                            _this.setTimer();
                        }
                    });
                    _this.player.on('pause',function(){
                        _this.isPause = true;
                    });
                    _this.player.on('play',function(){
                        _this.isPause = false;
                    });
                },
                setTimer: function(){
                    var _this = this;
                    if(_this.timer){
                        $interval.cancel(_this.timer);
                    }
                    _this.timer = $interval(function(){
                        try{
                            _this.currentDuration = parseInt(_this.player.currentTime());
                            _this.currentTime = dateUtil.secondsToDuration(_this.currentDuration);
                            if(_this.currentDuration >= _this.duration){
                                _this.isPlayed = false;
                                $interval.cancel(_this.timer);
                                _this.setSchedule(1);
                            }
                        }catch(e){}
                    },1000);
                },
                mousemove: function(event){
                    if((event.eventPhase == 3 && event.offsetX != 0) || event.eventPhase == 2){
                        var _this = this;
                        var left = event.offsetX;
                        var width = event.currentTarget.clientWidth;
                        _this.lineLeftRatio = width == 0 ? 0 : left/width;
                        var hoverDuration = parseInt(_this.duration *_this.lineLeftRatio);
                        _this.hoverTip = dateUtil.secondsToDuration(hoverDuration);
                        var tipWidth = hoverDuration >= 3600 ? 60 : 43;
                        if(left < tipWidth/2){
                            _this.tipLeftRatio = 0
                        }else if(left > width - tipWidth/2){
                            _this.tipLeftRatio = (width - tipWidth)/width;
                        }else{
                            _this.tipLeftRatio = (left - tipWidth/2)/width;
                        }
                    }
                },
                mousedown: function(event){
                    var _this = this;
                    if(_this.lineLeftRatio == 0){
                        return;
                    }
                    if(_this.timer){
                        $interval.cancel(_this.timer);
                    }
                    _this.isPlayed = false;
                    _this.currentDuration = parseInt(_this.duration * _this.lineLeftRatio);
                    _this.setSchedule(_this.currentDuration);
                },
                pause: function(){
                    xlVideo.player.pause();
                },
                play: function(){
                    xlVideo.player.play();
                },
                setSchedule: function(currentDuration){
                    xlVideo.player.currentTime(currentDuration);
                },
                fullscreen: function(){
                    xlVideo.player.requestFullscreen();
                },
                exitFullscreen: function(){
                    xlVideo.player.exitFullscreen();
                }
            }

            /**
             * 关闭
             */
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.$on("$destroy",function(){
                if(replayCtrl.ocxObj.ocxInstance){
                        $timeout(function(){
                        monitorOcx.destoryView(replayCtrl.ocxObj.ocxInstance);
                        replayCtrl.ocxObj.ocxInstance = null;
                    },1000);
                }
                if(replayCtrl.wsObj.ws){
                    if(xlVideo.player){
                        xlVideo.player.dispose();
                    }
                    ipcplayer.close(replayCtrl.wsObj.ws);
                }
                if(xlVideo.timer){
                    $interval.cancel(this.timer);
                }
            });
    })
})