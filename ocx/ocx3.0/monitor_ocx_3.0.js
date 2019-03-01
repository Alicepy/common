/**
 * 监控ocx
 * @Author: zhangxuelian 
 * @Date: 2018-05-04 11:18:47 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-07-25 10:24:32
 * 页面插入object：<object id="playerOcx" classid="clsid:8C85B9C1-6B4C-4ECB-9887-2428DA03F77C"></object>
 **/
define(['jquery','common/utils/common_utils','common/utils/date_util'],function($,commonUtils,dateUtil){
    var monitorOcx = {
        /**
         * 获取版本号
         * 
         * @param {any} ocxObjId object的dom节点ID
         * @returns 
         */
        getVersion: function(ocxObjId){
            if(commonUtils.isIE()){
                var ocxObj = document.getElementById(ocxObjId);
                var jsonParam = {
                    action: 'GetVersion'
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * ocx初始化
         * 
         * @param {any} ocxObjId object的dom节点ID
         * @param {any} ocxGlobalCallBack 初始化回调
         * @returns 
         */
        init: function(ocxObjId,ocxGlobalCallBack) {
            if(commonUtils.isIE()){
                var ocxObj = document.getElementById(ocxObjId);
                var callbackRet = ocxObj.RegJsFunctionCallback(ocxGlobalCallBack);//注册回调
                var jsonParam = {
                    action: 'InitPara',
                    arguments: {
                        ocxID: ocxObjId
                    }
                };
                var initRet = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return {
                    initRet: JSON.parse(initRet),
                    callbackRet: JSON.parse(callbackRet),
                    ocxObj: ocxObj
                };
            }
        }, 
        /**
         * 登录BMS
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.sIP 登录BMS的IP
         * @param {any} params.nPort 登录BMS的端口
         * @param {any} params.sUserName 登录BMS的用户名
         * @param {any} params.sPassword 登录BMS的密码
         * @returns 
         */
        login: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    sIP: '',
                    nPort: '',
                    sUserName: '',
                    sPassword: ''
                };
                var jsonParam = {
                    action: 'Login'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 设置配置参数
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nContinueCaptureType 抓拍类型：0表示按帧抓拍，1表示按秒抓拍
         * @param {any} params.nContinueCaptureStop 抓拍总时长：毫秒级别
         * @param {any} params.nContinueCaptureInterval 如果是按秒抓，抓图间隔：毫秒级别；如果是按帧抓，抓图间隔：1~25帧之间
         * @param {any} params.bIsStartMousePTZ 是否开启智能码流切换
         * @param {any} params.nEnableCPUWatch 是否关闭视频解锁云台
         * @param {any} params.nMaxLocalRecordSize 本地录像文件最大大小（单位：MB）
         * @param {any} params.nMaxLocalRecordTime （本地录像时长：小时级别）
         * @param {any} params.captureSavePath 图片保存目录
         * @param {any} params.isAccessKeyboard 是否启用监控键盘操作 1表示启用，0表示不启用
         * @param {any} params.savePath 录像保存目录
         * @param {any} params.maxDownLoadNum 最大下载数
         * @param {any} params.isImmediateReplay 是否启用即时回放 “on”表示启用，“off”表示不启用
         * @param {any} params.immediateBackSeconds 即时回放的文件时长(秒)
         * @returns 
         */
        setConfigParam: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nContinueCaptureType: 1,
                    nContinueCaptureStop: 3000,
                    nContinueCaptureInterval: 1000,
                    bIsStartMousePTZ: 1,
                    nEnableCPUWatch: 0,
                    nMaxLocalRecordSize: 1024,
                    nMaxLocalRecordTime: 8,
                    captureSavePath: "C:\GosunFiles\Image",
                    isAccessKeyboard: 0,
                    savePath: "C:\GosunFiles\VideoRecord",
                    maxDownLoadNum: 1,
                    isImmediateReplay: "off",
                    immediateBackSeconds: 15
                };
                var jsonParam = {
                    action: 'SetConfigParam'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 设置HTTP参数
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.strIP 服务IP
         * @param {any} params.nPort 端口
         * @param {any} params.strSite 退出系统的时候OCX控件访问该网址
         * @returns 
         */
        setHttpParam: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    strIP: '',
                    nPort: '',
                    strSite: ''
                };
                var jsonParam = {
                    action: 'SetHttpParam'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 关闭声音
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        stopSound: function(ocxObj) {
            if(commonUtils.isIE()){
                var jsonParam = {
                    action: 'StopAllSound',
                    arguments: {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频/录像视频-销毁播放视图
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        destoryView: function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action: 'Delete',
                    arguments: {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * ocx反初始化
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        logout: function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action: 'LogOut'
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 视频播放初始化
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        playInit: function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action: 'InitPara',
                    arguments: {
                        ocxID:'realtime_player'
                    }
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-创建实时视图
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        initMonitorWnd: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nDefaultSplit: 1,
                    nMaxSplit: 1
                }
                var jsonParam = {
                    action: 'InitMonitorWnd'
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
         * 实时视频-设置窗口工具条
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.showtool 1-显示菜单，0-不显示菜单
         * @param {any} params.capture 抓图，1-启用；0-不启用
         * @param {any} params.continuecapture 连续抓图
         * @param {any} params.localrecord 本地录像
         * @param {any} params.streamtype 码流类型
         * @param {any} params.srcrateplay 原始播放
         * @param {any} params.digitalzoom 数字缩放
         * @param {any} params.alarmsend 告警推送
         * @param {any} params.matrixvideo 视频上墙
         * @param {any} params.3doper 3d定位
         * @param {any} params.matrixlinkvideo 设备关联附近视频上墙
         * @param {any} params.gotoliveview 跳转至视频巡逻界面
         * @param {any} params.gotorecordview 跳转至录像回复模块界面
         * @param {any} params.ar 增强现实
         * @param {any} params.sound 增强现实
         * @param {any} params.talk 对讲
         * @param {any} params.replay 
         * @returns 
         */
        setLiveDispWndTool: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    showtool: 0,
                    capture: 1,
                    continuecapture: 1,
                    localrecord: 1,
                    streamtype: 1,
                    srcrateplay: 1,
                    digitalzoom: 1,
                    alarmsend: 1,
                    matrixvideo: 1,
                    "3doper": 1,
                    matrixlinkvideo: 0,
                    gotoliveview: 1,
                    gotorecordview: 1,
                    ar: 1,
                    sound: 1,
                    talk: 1,
                    replay: 1
                };
                var jsonParam = {
                    action: 'SetLiveDispWndTool'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-显示或隐藏窗口工具条
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nWindowStyle 1表示显示，0表示隐藏
         * @returns 
         */
        setLiveWndStyle: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nWindowStyle: 1
                }
                var jsonParam = {
                    action: 'SetLiveWndStyle'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-设置特殊的4分屏
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nFourSplitFlag 1表示采用四分屏的第二种模式，0表示不采用
         * @returns 
         */
        setSecondModeFourSplitFlag: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nFourSplitFlag: 1
                }
                var jsonParam = {
                    action: 'SetSecondModeFourSplitFlag'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-设置实时分屏数
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nDispSplit -1表示退出全屏 0表示全屏 1、4、6、8、9、13、16表示该数字的分屏 1000表示自定义分屏
         * @param {any} params.nRow 行数
         * @param {any} params.nColumn 行数
         * @returns 
         */
        changeLiveDispSplit: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nDispSplit: 1000,
                    nRow: 1,
                    nColumn: 1
                }
                var jsonParam = {
                    action: 'ChangeLiveDispSplit'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
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
         * 实时视频-播放实时视频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象 
         * @param {any} params.szNodeID 节点ID
         * @param {any} params.nStreamType 码流类型 第一码流 1 第二码流 2 第三码流 3
         * @param {any} params.nIndex 窗口索引号，-1表示自动寻找空闲窗口播放
         * @param {any} params.nVideoReqType 流请求类型 0:常用 1:告警 2:自动 3:轮巡 4:设备下线 5:录像 6:未知
         * @param {any} params.ability 属性
         * @param {any} params.ability.chnAbility 
         * @param {any} params.nControlType 是否可控 1表示可控，0表示不可控
         * @returns 
         */
        playRealVideo: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    szNodeID: "",
                    nStreamType: 1,
                    nIndex: -1,
                    nVideoReqType: 0,
                    ability: {
                        chnAbility: null
                    },
                    nControlType: 1
                }
                var jsonParam = {
                    action: 'PlayRealVideo'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-获取分屏信息
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        getVideoScreenInfo: function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action: 'GetVideoScreenInfo',
                    arguments: {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-获取当前视图窗口个数
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        getLiveDispWndNum: function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action: 'GetLiveDispWndNum'
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-实时视频全部抓图
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        liveCaptureAll: function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action: 'LiveCaptureAll',
                    arguments: {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 实时视频-关闭实时视频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
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
        },
        /**
         * 录像视频-创建录像视图
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nDefaultSplit 默认分屏数
         * @param {any} params.nMaxSplit 最大分屏数
         * @returns 
         */
        initReplayWnd: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nDefaultSplit: 1,
                    nMaxSplit: 1
                }
                var jsonParam = {
                    action: 'InitReplayWnd'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-设置窗口属性
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象 
         * @param {any} params.channelName 通道名
         * @param {any} params.stream 码流类型
         * @param {any} params.controlType 0可控，1不可控（云台）
         * @param {any} params.nIndex 窗口索引
         * @param {any} params.ability 属性
         * @param {any} params.ability.chnAbility 通道属性
         * @returns 
         */
        setWndAtturite: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    channelName: "",
                    stream: 1,
                    controlType: 1,
                    nIndex: 1,
                    ability: {
                        chnAbility: null
                    }
                }
                var jsonParam = {
                    action: 'SetWndAtturite'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频/本地视频-录像播放控制工具条
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象 
         * @param {any} params.showtool 1-显示工具条，0-不显示工具条
         * @param {any} params.fastorslow 快进：1-启用，0-不启用
         * @param {any} params.maxmultiple 快进慢进最大倍速，默认4倍速
         * @param {any} params.maxmultiplereverse 倒放倍速，默认16倍速
         * @param {any} params.step 帧进
         * @param {any} params.bstep 帧退
         * @param {any} params.reverse 倒放
         * @param {any} params.sound 声音
         * @param {any} params.download 下载
         * @param {any} params.timefoward 前进N秒
         * @param {any} params.timebfoward 后退N秒
         * @param {any} params.zoom 数字缩放
         * @param {any} params.capture 抓图
         * @param {any} params.capture 色彩调节
         * @returns 
         */
        setReplayCtrlTool: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    showtool: 1,
                    fastorslow: 1,
                    maxmultiple: 4,
                    maxmultiplereverse: 4,
                    step: 1,
                    bstep: 1,
                    reverse: 1,
                    sound: 1,
                    download: 0,
                    timefoward: 0,
                    timebfoward: 0,
                    zoom: 0,
                    capture: 0,
                    capture: 0
                }
                var jsonParam = {
                    action: 'SetReplayCtrlTool'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-设置窗口工具条
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.showtool 1-显示菜单，0-不显示菜单
         * @param {any} params.capture 抓图，1-启用；0-不启用
         * @param {any} params.continuecapture 连续抓图
         * @param {any} params.alarmsend 警情推送
         * @param {any} params.recordslice 录像切片
         * @param {any} params.srcrateplay 原始播放
         * @param {any} params.digitalzoom 数字缩放
         * @param {any} params.download 下载
         * @param {any} params.ar 增强现实
         * @param {any} params.sound 声音
         * @returns 
         */
        setReplayWndTool: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    showtool: 0,
                    capture: 0,
                    continuecapture: 0,
                    alarmsend: 0,
                    recordslice: 0,
                    srcrateplay: 0,
                    digitalzoom: 0,
                    download: 0,
                    ar: 0,
                    sound: 0
                }
                var jsonParam = {
                    action: 'SetReplayWndTool'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-根据时间播放录像
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.szNodeID 节点ID
         * @param {any} params.nStorageType 录像存储类型:0 中心服务存储 1 前端设备存储 2 本地硬盘存储 3 设备所在级服务存储
         * @param {any} params.nRecordType 录像类型: -1 所有录像 0 告警录像 1 计划录像 2 手动录像 3 下载录像
         * @param {any} params.szStartTime 开始时间
         * @param {any} params.szEndTime 结束时间
         * @param {any} params.szCurrentPlayTime 当前播放时间
         * @param {any} params.nPlatID 平台ID
         * @param {any} params.ability 属性
         * @param {any} params.nIndex 窗口索引号，-1表示自动寻找空闲窗口播放
         * @returns 
         */
        replayByTime: function(ocxObj,params){
            if(commonUtils.isIE()){
                //统一业务处理(无特殊原因不得在底层封装里加入业务，切记)
                params.nPlatID = parseInt(params.szNodeID.split("_")[0]);
                params.szStartTime = dateUtil.getDatebyMinutes(params.szStartTime,0);
                params.szStartTime = $.trim(params.szStartTime).replace(" ","-").replace(/:/g,"-");
                params.szEndTime = $.trim(params.szEndTime).replace(" ","-").replace(/:/g,"-");
                params.szCurrentPlayTime = $.trim(params.szStartTime).replace(" ","-").replace(/:/g,"-");
                
                var defaultParams = {
                    szNodeID: "",
                    nStorageType: 1,
                    nRecordType: -1,
                    szStartTime: "",
                    szEndTime: "",
                    szCurrentPlayTime: "",
                    nPlatID: -1,
                    ability: {
                        chnAbility: null
                    },
                    nIndex: 1
                }
                var jsonParam = {
                    action: 'ReplayByTime'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-根据文件播放录像
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.szFileID 文件ID/本地文件路径
         * @param {any} params.szNodeID 节点ID
         * @param {any} params.nStorageType 录像存储类型:0 中心服务存储 1 前端设备存储 2 本地硬盘存储 3 设备所在级服务存储
         * @param {any} params.szStartTime 开始时间
         * @param {any} params.szEndTime 结束时间
         * @param {any} params.nRecordType 录像类型: -1 所有录像 0 告警录像 1 计划录像 2 手动录像 3 下载录像
         * @param {any} params.nPlatID 平台ID
         * @param {any} params.ability 属性
         * @param {any} params.ability.chnAbility 
         * @param {any} params.nIndex 窗口索引号，-1表示自动寻找空闲窗口播放
         * @returns 
         */
        replayByFile: function(ocxObj,params){
            if(commonUtils.isIE()){
                //统一业务处理
                params.nPlatID = parseInt(params.szNodeID.split("_")[0]);

                var defaultParams = {
                    szFileID: null,
                    szNodeID: "",
                    nStorageType: 0,
                    szStartTime: "",
                    szEndTime: "",
                    nRecordType: -1,
                    nPlatID: -1,
                    ability: {
                        chnAbility: null
                    },
                    nIndex: 1 
                }
                var jsonParam = {
                    action: 'ReplayByFile'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 录像视频-关闭所有录像
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        closeAllReplayVideo: function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action: 'CloseAllReplayVideo',
                    arguments: {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 本地视频-播放本地视频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.szFileName 本地文件路径
         * @param {any} params.nIndexs 窗口索引号，-1表示自动寻找空闲窗口播放
         * @returns 
         */
        playLocalVideo: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    szFileName: "",
                    nIndex: -1
                }
                var jsonParam = {
                    action: 'ReplayByFile'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        }
    };
    return monitorOcx;
})