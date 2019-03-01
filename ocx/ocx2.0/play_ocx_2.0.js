/**
 * 播放 ocx
 * @Author: zhangxuelian 
 * @Date: 2018-01-07 15:34:27 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-06-19 15:00:08
 * 
 * 依赖monitor_ocx_2.0.js初始化与释放ocx
 **/
define(['jquery','common/utils/common_utils','common/utils/date_util'], function ($,commonUtils,dateUtil) {

    var playOcx = {
        /**
         * ocx对象
         */
        ocxObj:null,
        /**
         * play ocx初始化
         */
        init:function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : 'InitPara',
                    arguments : {
                        ocxID:'realtime_player'
                    }
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 启动服务监听
         */
        startServer: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    szServerName : 'splitSever',
                    szIP: '',//客户点IP
                    nPort: 8181,
                    nTaskThreadNum: 1
                }
                var jsonParam = {
                    action : 'StartServer'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 停止服务监听
         */
        stopServer: function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : 'StopServer',
                    arguments: {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 唤醒第nScreenID屏的客户端（一机双屏）
         */
        awakenClient: function(ocxObj,params1,params2,params3){
            if(commonUtils.isIE()){
                var defaultParams = {
                    szExePath : '',//需要唤醒的exe目录
                    nScreenID: 2,//初始化唤醒的客户端的屏幕ID
                    szIP: '',//待连接的服务端IP
                    nPort: 8181,//待连接的服务端端口
                    szUsername: 'user',//主进程登录使用的用户名
                    szParam: {}//主进程需要通知子进程的自定义参数(UTF-8编码)
                }
                var defaultSzParam = {
                    ModuleType: 'RealLiveVideo',//RealLiveVideo（实时）
                    Command: 'Play',//Play（播放视频）Poll（执行轮巡）
                    Parameters: '',//不可过长，传空字符串后再推送
                    Theme: 'Black',//Black（黑色主题）Blue（蓝色主题）
                    Config: {}//配置信息
                }
                var defaultConfig = {
                    captureSavePath: '',//抓图路径
                    savePath: '',//录像路径
                    nContinueCaptureType: 0,//连续抓拍类型
                    isImmediateReplay: '',//是否开启即时回放
                    immediateBackSeconds: 0,//即时回放时间(s)
                    nContinueCaptureInterval: 0,//连续抓拍间隔(s)
                    nContinueCaptureStop: 0,//连续抓拍持续(s)
                    bIsStartMousePTZ: 0,//是否开启云台
                    nEnableCPUWatch: 0,//是否开启智能切换主辅码流
                    nMaxLocalRecordSize: 1000,//最大本地录像大小
                    nMaxLocalRecordTime: 1000//最大本地录像时间
                }
                var jsonParam = {
                    action : 'AwakenClient'
                };
                jsonParam.arguments = $.extend(defaultParams,params1 || {});
                jsonParam.arguments.szParam = $.extend(defaultSzParam,params2 || {});
                jsonParam.arguments.szParam.Config = JSON.stringify($.extend(defaultConfig,params3 || {}));
                jsonParam.arguments.szParam = JSON.stringify(jsonParam.arguments.szParam.Config);
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 用于主进程和子进程间私有的通信协议（一机双屏）
         */
        notifyMultiScreen: function(ocxObj,params1,params2,params3){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nScreenID : 2,//指定第N屏打开视频,-1表示所有屏幕
                    nLen : 0,//透传内容的长度
                    szMsg : {}//需要推送的透传内容
                }
                var defaultSzMsg = {
                    ModuleType: 'RealLiveVideo',//RealLiveVideo（实时）
                    Command: 'Play',//Play（播放视频）
                    Parameters: []//推送信息
                }
                var defaultParameters = {
                    ID: '',//节点id
                    Type: 'VIDEO_CHN',//节点类型（DOMAIN为非设备类型）  告警"INPUT_CHN"
                    ControlType: 1,//是否可控，0为不可控，1为可控
                    UsageType: 1,//用途类型
                    Name: '监控设备',//节点名字
                    Status: 'ONLINE',//设备状态ONLINE，OFFLINE
                    Ability: {chnAbility: null},//通道能力（AR用到）
                    DefaultStream: 1,//主辅码流类型（1-主码流，2-辅码流）
                    Facade: 2,//设备类型（1、球机 2、枪机）
                    nIndex: 1,//窗口索引
                    nTrackIndex: 0//追踪索引
                }
                var jsonParam = {
                    action : 'NotifyMultiScreen'
                };
                jsonParam.arguments = $.extend(defaultParams,params1 || {});
                
                jsonParam.arguments.szMsg = $.extend(defaultSzMsg,params2 || {});
                jsonParam.arguments.szMsg.Parameters = JSON.stringify(params3);
                //特殊处理
                jsonParam.arguments.nLen = JSON.stringify(jsonParam.arguments.szMsg || {}).length || 0;
                
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 设置切换实时监控页面时是否解码（播放之后调用） enable: 0:不解码 1:解码
         */
        enableVideoDecode:function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    enable : 1
                }
                var jsonParam = {
                    action : 'EnableVideoDecode'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 
         * 设置实时分屏数
         * @param {any} params.nDispSplit 分屏数
         * @param {any} params.nRow 行数
         * @param {any} params.nColumn 列数
         */
        initDispSplit:function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nDispSplit: 1000,
                    nRow : 2,
                    nColumn : 2
                }
                var jsonParam = {
                    action : 'ChangeLiveDispSplit'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                //alert(JSON.stringify(jsonParam));
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 
         * 实时视频-创建实时视图
         * 
         * @param {any} params.nDefaultSplit 当前视频窗口数
         * @param {any} params.nMaxSplit 设置最大窗口数
         */
        initMonitorWnd:function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nDefaultSplit : 1,
                    nMaxSplit : 1
                }
                var jsonParam = {
                    action : 'InitMonitorWnd'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-右键菜单配置
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.showmenu 1-显示菜单，0-不显示菜单,以下参数同理可得
         * @param {any} params.closevideo 关闭视频
         * @param {any} params.closeallvideo 关闭所有视频
         * @param {any} params.capture 抓图
         * @param {any} params.captureall 所有窗口抓图
         * @param {any} params.instantplay 即时回放
         * @param {any} params.localrecord 本地录像
         * @param {any} params.openalllocalrecord 打开所有本地录像
         * @param {any} params.closealllocalrecord 关闭所有本地录像
         * @param {any} params.sound 声音
         * @param {any} params.talk 对讲
         * @param {any} params.exitfullscreen 退出全屏
         * @param {any} params.manualalarm 手动告警
         * @param {any} params.videotrace 视频追踪
         * @param {any} params.gotorecordview 跳转至录像页面
         * @param {any} params.gotomatrixview 跳转至电视墙
         * @param {any} params.gotomapview 跳转至电子地图
         * @returns 
         */
        setLiveDispWndMenu: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    showmenu: 0,
                    closevideo: 0,
                    closeallvideo: 0,
                    capture: 0,
                    captureall: 0,
                    instantplay: 0,
                    localrecord: 0,
                    openalllocalrecord: 0,
                    closealllocalrecord: 0,
                    sound: 0,
                    talk: 0,
                    exitfullscreen: 0,
                    manualalarm: 0,
                    videotrace: 0,
                    gotorecordview: 0,
                    gotomatrixview: 0,
                    gotomapview: 0
                };
                var jsonParam = {
                    action: 'SetLiveDispWndMenu'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-设置实时视频窗口工具栏
         */
        setLiveDispWndTool:function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    showtool : 0,//是否显示工具栏
                    capture : 1,//是否支持抓拍
                    continuecapture : 1,//是否支持连续抓拍
                    localrecord : 1,//本地录像
                    streamtype : 1,//流类型  1：平台
                    srcrateplay : 1,
                    digitalzoom : 1,//放大缩小倍数
                    alarmsend : 1,//发送告警
                    matrixvideo : 1,
                    "3doper" : 1,
                    matrixlinkvideo : 0,
                    gotoliveview : 1,
                    gotorecordview : 1,
                    ar : 1,//ar标签
                    sound : 1,//声音
                    talk : 1,//对讲
                    replay : 1//回放
                };
                var jsonParam = {
                    action : 'SetLiveDispWndTool'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-播放实时视频
         */
        playRealVideo:function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    szNodeID : "",
                    nStreamType : 1,
                    nIndex : -1,
                    nVideoReqType : 0,
                    ability : {
                        chnAbility : null
                    },
                    nControlType : 1
                }
                var jsonParam = {
                    action : 'PlayRealVideo'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频/录像视频-销毁播放视图
         */
        deleteVideoView:function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : 'Delete'
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-创建录像视图
         */
        initReplayWnd:function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nDefaultSplit : 1,
                    nMaxSplit : 1
                }
                var jsonParam = {
                    action : 'InitReplayWnd'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-根据时间播放录像
         */
        replayByTime:function(ocxObj,params){
            if(commonUtils.isIE()){
                //统一业务处理(无特殊原因不得在底层封装里加入业务，切记)
                params.nPlatID = parseInt(params.szNodeID.split("_")[0]);
                params.szStartTime = dateUtil.getDatebyMinutes(params.szStartTime,0);
                params.szStartTime = $.trim(params.szStartTime).replace(" ","-").replace(/:/g,"-");
                params.szEndTime = $.trim(params.szEndTime).replace(" ","-").replace(/:/g,"-");
                params.szCurrentPlayTime = $.trim(params.szStartTime).replace(" ","-").replace(/:/g,"-");
                
                var defaultParams = {
                    szNodeID: "",//节点ID
                    nStorageType: 1,//录像存储类型:0 中心服务存储 1 前端设备存储 2 本地硬盘存储 3 设备所在级服务存储
                    nRecordType: -1,//录像类型: -1 所有录像 0 告警录像 1 计划录像 2 手动录像 3 下载录像
                    szStartTime: "",//开始时间
                    szEndTime: "",//结束时间
                    szCurrentPlayTime: "",//当前播放时间
                    nPlatID: -1,//平台ID
                    ability: {//属性
                        chnAbility: null
                    },
                    nIndex: 1 //窗口索引号，-1表示自动寻找空闲窗口播放
                }
                var jsonParam = {
                    action : 'ReplayByTime'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-根据文件播放录像
         */
        replayByFile:function(ocxObj,params){
            if(commonUtils.isIE()){
                //统一业务处理
                params.nPlatID = parseInt(params.szNodeID.split("_")[0]);

                var defaultParams = {
                    szFileID: null,//文件ID/本地文件路径
                    szNodeID: "",//节点ID
                    nStorageType: 0,//录像存储类型:0 中心服务存储 1 前端设备存储 2 本地硬盘存储 3 设备所在级服务存储
                    szStartTime: "",//开始时间
                    szEndTime: "",//结束时间
                    nRecordType: -1,//录像类型: -1 所有录像 0 告警录像 1 计划录像 2 手动录像 3 下载录像
                    nPlatID: -1,//平台ID
                    ability: {//属性
                        chnAbility: null
                    },
                    nIndex: 1 //窗口索引号，-1表示自动寻找空闲窗口播放
                }
                var jsonParam = {
                    action : 'ReplayByFile'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-关闭所有录像
         */
        closeAllReplayVideo:function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : 'CloseAllReplayVideo',
                    arguments : {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-设置窗口属性
         */
        setWndAtturite:function(ocxObj){
            if(commonUtils.isIE()){
                var defaultParams = {
                    channelName : "",
                    stream : 1,
                    controlType : 1,
                    nIndex : 1,
                    ability : {
                        chnAbility : null
                    }
                }
                var jsonParam = {
                    action : 'SetWndAtturite'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-录像播放控制工具条
         */
        setReplayCtrlTool:function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    showtool : 1,//1-显示工具条，0-不显示工具条
                    fastorslow : 1,//快进：1-启用，0-不启用
                    maxmultiple : 4,//快进慢进最大倍速，默认4倍速
                    maxmultiplereverse : 4,//倒放倍速，默认16倍速
                    step : 1,//帧进
                    bstep : 1,//帧退
                    reverse : 1,//倒放
                    sound : 1,//声音
                    download : 0,//下载
                    timefoward : 0,//前进N秒
                    timebfoward : 0,//后退N秒
                    zoom : 0,//数字缩放
                    capture : 0,//抓图
                    colorctr : 0//色彩调节
                }
                var jsonParam = {
                    action : 'SetReplayCtrlTool'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },

        /**
         * 关闭实时视频
         */
        closeRealVideo: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nIndex: -1
                }
                var jsonParam = {
                    action: 'CloseRealVideo'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        }
    }

    return playOcx;
});