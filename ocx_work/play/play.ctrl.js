/**
 * 播放
 * @Author: zhangxuelian 
 * @Date: 2018-01-07 20:50:28 
 * @Last Modified by: caihao
 * @Last Modified time: 2018-10-10 16:04:54
 **/
define(['app/common/app','common/ocx/ocx3.0/monitor_ocx_3.0','common/device/ipcplayer'], function (app,monitorOcx,ipcplayer) {
    app.registerController('playCtrl',
        function ($scope, $modalInstance, $modal, Models,$timeout,commonUtil,modalExt,content,constant_filestore_url,subject,normalUtil) {

            $scope.content = content;

            var playCtrl = $scope.playCtrl = {
                isIE: false,
                sIP: "",
                playerObj: null,
                load: function(){
                    Models.Dictionary.one('SYSTEM_CONFIG', 'BMS_LOGIN_URL').get().then(function (ret) {
                        if(ret.state.code == 200 && ret.data.fieldValue){
                            playCtrl.sIP = ret.data.fieldValue;
                            //playCtrl.sIP = "192.168.36.30";
                            if(!normalUtil.isIE()){
                                playCtrl.wsObj.load();
                            }else{
                                playCtrl.isIE = true;
                                playCtrl.ocxObj.load();
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
                        playCtrl.wsObj.ws = ipcplayer.init(function(type,ret){
                            switch(type){
                                case "onopen": 
                                    ipcplayer.login(playCtrl.wsObj.ws,{
                                        sIP: playCtrl.sIP 
                                    });
                                    break;
                                case "onmessage": 
                                    playCtrl.wsObj.callback(ret);
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
                        // console.log(result);
                        if(result.code != 0) {
                            modalExt.modalTip({
                                height: 150,
                                type: "error",
                                content: result.message
                            })
                            return;
                        };
                        if(result.action == "login"){
                            //"52_#_51000010_1_101"
                            ipcplayer.sendRtmp(playCtrl.wsObj.ws,{
                                szNodeID: $scope.content.palyParam.szNodeID,
                                nStreamType: 1
                            });
                        }
                        if(result.action == "stream"){
                            playCtrl.playerObj = ipcplayer.initPlayer("playContainer",result.data,1);
                        }
                    }
                },
                ocxObj: {
                    ocxInstance: null,
                    load: function(){
                        $timeout(function(){
                            //初始化ocx
                            try{
                                playCtrl.ocxObj.ocxInstance = monitorOcx.init("playerOcx",function(ret){
                                    //console.log(ret);注册回调
                                }).ocxObj;
                                if(subject.ocxArray){
                                    subject.ocxArray.push({
                                        name: 'monitorOcx',
                                        obj: playCtrl.ocxObj.ocxInstance
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
                            monitorOcx.login(playCtrl.ocxObj.ocxInstance,{
                                sIP: playCtrl.sIP,
                                nPort: 10002,
                                sUserName: "sysadmin",
                                sPassword: "90cfe39ede38a4deeb4f1750e8e01ba1"
                            });
                            //视频播放初始化
                            //monitorOcx.playInit(ocxObj);
                            //创建实时视图
                            monitorOcx.initMonitorWnd(playCtrl.ocxObj.ocxInstance);
                            //设置工具栏
                            monitorOcx.setLiveDispWndTool(playCtrl.ocxObj.ocxInstance,$scope.content.toolParam);
                            //播放视频
                            monitorOcx.playRealVideo(playCtrl.ocxObj.ocxInstance,$scope.content.palyParam);
                            
                        },500);
                    }
                }
            }
            
            /**
             * 关闭
             */
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            /**
             * 销毁视图
             */
            $scope.$on("$destroy",function(){
                if(playCtrl.ocxObj.ocxInstance){
                    $timeout(function(){
                        monitorOcx.destoryView(playCtrl.ocxObj.ocxInstance);
                        playCtrl.ocxObj.ocxInstance = null;
                        /* if(subject.ocxArray){
                            var index = normalUtil.eleInArr(subject.ocxArray,'name','monitorOcx');
                            subject.ocxArray.splice(index,1);
                        } */
                    },1000);
                }
                if(playCtrl.wsObj.ws){
                    if(playCtrl.playerObj){
                        playCtrl.playerObj.dispose();
                    }
                    ipcplayer.close(playCtrl.wsObj.ws);
                }
            });
            
        })
})