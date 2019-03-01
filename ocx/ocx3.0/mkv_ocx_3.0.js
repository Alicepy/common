/*
 * @Author: zhangxuelian 
 * @Date: 2018-01-07 22:53:08 
 * @Last Modified by: caihao
 * @Last Modified time: 2018-11-30 15:22:45
 * 页面插入object：<object id="yourOcx" classid="clsid:BE806C69-1CFB-4419-8D7D-BC63D580ACF6"></object>
 **/
define(['jquery','common/utils/common_utils'], function ($,commonUtils) {
    
    var mkvOcx = {
        /**
         * ocx路径
         */
        ocxPath: {
            //播放器文件夹路径
            playerPath: 'C:\\gosun\\GSWebOcxPackageMkv\\VideoPlayer\\',
            //下载笔录文件接口
            downloadRecordPath: 'http://' + document.location.host + '/cmt/service/records/',
            //示证程序路径
            showEvidencePath: 'C:\\gosun\\GSWebOcxPackageMkv\\ShowMaterial\\GoSunTrialMechine_ShowMaterial.exe',
            //示证程序配置
            showEvidenceConf: 'C:\\gosun\\GSWebOcxPackageMkv\\ShowMaterial\\ShowMaterialConfig.ini',
            //关闭示证程序的请求接口
            closeEvidenceApi: 'http://localhost:8080/HttpService/HelloService/KillMediaProcess.Action'
        },
        /**
         * 获取版本信息
         * 
         * @param {any} ocxObjId ocx对象id
         * @returns 
         */
        getOcxVersion: function(ocxObjId){
            if(!commonUtils.isIE()) return;
            var ocxObj = document.getElementById(ocxObjId);
            var jsonParam = {
                action: 'GetOcxVersion',
                arguments: {}
            };
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 启动服务
         * 
         * @param {any} ocxObjId ocx对象id
         * @returns 
         */
        startServer: function(ocxObjId){
            if(!commonUtils.isIE()) return;
            var ocxObj = document.getElementById(ocxObjId);
            var jsonParam = {
                action: 'StartServer',
                arguments: {}
            };
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 获取文件信息
         * 
         * @param {any} ocxObjId ocx对象id
         * @returns 
         */
        getDriverVersion: function(ocxObjId){
            if(!commonUtils.isIE()) return;
            var ocxObj = document.getElementById(ocxObjId);
            var jsonParam = {
                action: 'GetDriverVersion',
                arguments: {}
            };
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return ret;
        },
        /**
         * ocx初始化
         * 
         * @param {any} ocxObjId object的dom节点ID
         * @param {any} ocxCallBack 初始化回调
         */
        init: function(ocxObjId,ocxCallBack) {
            if(!commonUtils.isIE()) return;
            var ocxObj = document.getElementById(ocxObjId);
            var jsonParam = {
                action : 'Init',
                arguments : {}
            };
            var initRet = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            var callbackRet = ocxObj.GS_RegJsFunctionCallback(ocxCallBack);//注册回调
            return {
                initRet: JSON.parse(initRet),
                callbackRet: JSON.parse(callbackRet),
                ocxObj: ocxObj
            };
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
         * mkv 登出BMS
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        logout: function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action: 'LogOut',
                    arguments: {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 反初始化
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        unInit: function(ocxObj) {
            if (!commonUtils.isIE()) return;
            var jsonParam = {
                action: 'UnInit',
                arguments: {}
            };
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 获取摄像头列表
         * 
         * @param {any} ocxObj ocx对象
         * @returns 
         */
        getUsbCamaraList: function(ocxObj){
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action: 'GetUsbCamaraList',
                arguments : {}
            };
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 创建视图
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nViewNo 视图号，由外部传入，外部需保证唯一
         * @param {any} params.nWndCount 视图中窗口个数
         * @param {any} params.stPlayWndPos 视图中窗口的位置信息
         * @param {any} params.stPlayWndPos.nWndNo 窗口号，由外部传入，外部需保证唯一
         * @param {any} params.stPlayWndPos.nX 窗口在视图中的x坐标与视图宽度的千分比，值（0~1000）
         * @param {any} params.stPlayWndPos.nY 窗口在视图中的y坐标与视图高度度的千分比，值（0~1000）
         * @param {any} params.stPlayWndPos.nWidth 窗口在视图中的宽度与视图宽度的千分比，值（0~1000）
         * @param {any} params.stPlayWndPos.nHeight 窗口在视图中的高度与视图高度的千分比，值（0~1000）
         * @param {any} params.stPlayWndPos.bShow 是否初始化显示
         * @returns 
         */
        createView: function(ocxObj,params){
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                nViewNo: 1,
                nWndCount: 1,
                stPlayWndPos: [{
                    nWndNo: 1,
                    nX: 0,
                    nY: 0,
                    nWidth: 1000,
                    nHeight: 1000,
                    bShow: 0
                }]
            };
            var jsonParam = {
                action: 'CreateView'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 开始播放视频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nViewNo 视图号
         * @param {any} params.nWndNo 视频播放的窗口号（当播放了外部源时，此值需填写负值）
         * @param {any} params.bRend 是否初始化渲染显示，默认为1
         * @param {any} params.ePlaySourceType 播放源类型（1-usb摄像头；2-mkv文件；3-外部源）
         * @param {any} params.szCameraName 摄像头名称，ePlaySourceType为1时必填
         * @param {any} params.nFrameRate Usb摄像头视频帧率，ePlaySourceType为1时必填
         * @param {any} params.nScale 编码缩放，ePlaySourceType为1时必填
         * @param {any} params.eFileType 文件类型（0-未知，1-mkv），ePlaySourceType为2时必填
         * @param {any} params.szFilePath 文件路径，ePlaySourceType为2时必填
         * @param {any} params.eOutSideType 外部源类型（0-未知，1-视频监控平台）, ePlaySourceType为3时必填
         * @param {any} params.szSSRC 外部源唯一标志, ePlaySourceType为3时必填,当外部源为视频监控时，此值为播放窗口句柄
         * @param {any} params.szNodeID 节点ID
         * @returns 
         */
        startPlayVideo: function(ocxObj,params){
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                nViewNo: 1,
                nWndNo: 1,
                bRend: 1,
                ePlaySourceType: 1,
                szCameraName: 'HD USB Camera',
                nFrameRate: 10,
                nScale: 1,
                eFileType: 1,
                szFilePath: 'D:/MyMkvFile.mkv',
                eOutSideType: 0,
                szSSRC: "",
                szNodeID: ""
            };
            var jsonParam = {
                action: 'StartPlayVideo'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * mkv-播放实时视频(用于录制)
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象 
         * @param {any} params.szNodeID 节点ID
         * @param {any} params.nStreamType 码流类型 第一码流 1 第二码流 2 第三码流 3
         * @param {any} params.nVideoReqType 流请求类型 0:常用 1:告警 2:自动 3:轮巡 4:设备下线 5:录像 6:未知
         * @param {any} params.nControlType 是否可控 1表示可控，0表示不可控
         * @returns 
         */
        playRealVideo: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    szNodeID: "",
                    nStreamType: 1,
                    nVideoReqType: 0,
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
         * mkv-关闭实时视频(用于录制)
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        closeRealVideo: function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    szNodeID: ""
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
         * 关闭视频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nViewNo 视图号
         * @param {any} params.nWndNo 要关闭正在播放的视频窗口号
         * @param {any} params.bRend 是否渲染，填0
         * @param {any} params.ePlaySourceType 播放源类型（1-usb摄像头；2-mkv文件；3-外部源）
         * @param {any} params.eOutSideType 外部源类型（0-未知，1-视频监控平台）, ePlaySourceType为3时必填
         * @param {any} params.szSSRC ePlaySourceType是3时必填
         * @returns 
         */
        stopPlayVideo: function(ocxObj,params){
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                nViewNo: 1,
                nWndNo: 1,
                bRend: 0,
                ePlaySourceType: 1
            };
            var jsonParam = {
                action: 'StopPlayVideo'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 销毁视图
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nViewNo 视图号，与创建时一致
         * @returns 
         */
        destroyView: function(ocxObj,params){
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                nViewNo: 1
            };
            var jsonParam = {
                action: 'DestroyView'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 开始录制视频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nFileID 文件ID，外部传入唯一值
         * @param {any} params.nViewNo 录制视图号
         * @param {any} params.nWndCount 录制窗口个数，表示使用nWndNoList中有效的窗口号
         * @param {any} params.nWndNoList 录制窗口号列表，窗口号大于0表示该窗口从USB摄像头取流，等于0表示该窗口从声音采集器取流，小于0表示该窗口从监控系统取流
         * @param {any} params.szFilePath 录制文件存放路径
         * @param {any} params.nSize 录制文件最大大小，单位MB，超过这个大小生成新的文件，1分钟大概有10M，建议将设置为1024M
         * @returns 
         */
        openMkvFile: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                nFileID: 2,
                nViewNo: 1,
                nWndCount: 3,
                nWndNoList: [1, 0, -1, -2],
                szFilePath: 'C:/MyMkvFile/2017114211225.mkv',
                nSize: 3000
            };
            var jsonParam = {
                action: 'OpenMkvFile'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 暂停录制视频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nFileID 文件ID，外部传入唯一值
         * @returns 
         */
        pauseMkvFile: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                nFileID: 1//文件ID，外部传入唯一值
            };
            var jsonParam = {
                action: 'PauseMkvFile'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 终止录制视频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nFileID 文件ID，外部传入唯一值
         * @returns 
         */
        closeMkvFile: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                nFileID: 2//文件ID，外部传入唯一值
            };
            var jsonParam = {
                action: 'CloseMkvFile'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 开始录制音频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.szFilePath 录制文件存放路径
         * @param {any} params.nSize 录制文件最大大小，单位MB，超过这个这个大小生成新的文件,1分钟大概60KB，建议设置1024M
         * @returns 
         */
        startRecordAudio: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                szFilePath: 'C:/MyMkvFile/201711795217.mp3',
                nSize: 500
            };
            var jsonParam = {
                action: 'StartRecordAudio'//录制文件最大大小，单位MB;超过这个这个大小生成新的文件，1分钟大概有10M，建议将设置为1024M
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 暂停录制音频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        pauseRecordAudio: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'PauseRecordAudio'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 终止录制音频
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        stopRecordAudio: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'StopRecordAudio'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 本地播放器标签信息设置
         * 
         * @param {any} ocxObj 
         * @param {any} params 
         * @param {any} params.szFilePath 如果录制的文件名为：test.mkv, 则该文件名为test.data
         * @param {array} params.dataList 标签信息列表 
         * @param {any} params.dataList[i].szTitle 录像标签标题
         * @param {any} params.dataList[i].szContent 录像标签内容
         * @param {any} params.dataList[i].nTimestamp 录像标签时间(秒)
         * @returns
         */
        setMkvLableInfo: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                szFilePath: '',
                dataList: []
            };
            var jsonParam = {
                action: 'SetMkvLableInfo',
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 设置录像播放进度
         * 
         * @param {any} ocxObj 
         * @param {any} params 
         * @param {any} params.nViewNo 视图号 (需要与播放视频时对应)
         * @param {any} params.nWndNo 视频播放的窗口号（需要与播放视频对应）
         * @param {any} params.ePlaySourceType 2-mkv文件（必须是2,录像文件才能跳转）
         * @param {any} params.nTimestamp 需要跳转的时间（秒）
         * @returns
         */
        setPlayProgress: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                nViewNo: 1,
                nWndNo: 1,
                ePlaySourceType: 2,
                nTimestamp: 0
            };
            var jsonParam = {
                action: 'SetPlayProgress',
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 抓图
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.nViewNo 视图号，由外部传入，外部需保证唯一
         * @param {any} params.nWndNo 要关闭正在播放的视频窗口号
         * @param {any} params.szImageDir 抓拍图片保存目录, 不传该字段或该字段值为空则默认保存目录为"C:\\MkvImage"
         * @param {any} params.bNeedBase64 是否需要返回base64编码
         * @returns 
         */
        capture: function(ocxObj,params){
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                nViewNo: 1,
                nWndNo: 1,
                szImageDir: 'C:\\MyMkvFile',
                bNeedBase64: 1
            };
            var jsonParam = {
                action: 'Capture'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 初始化指纹识别
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        initSensor: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'InitSensor'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 反初始化指纹识别
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        uninitSensor: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'UninitSensor'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 检测指纹
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        beginEnroll: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'BeginEnroll'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 读身份证
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        readIDCard: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'ReadIDCard'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 启动exe
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.szExePath 本地程序绝对路径
         * @param {any} params.szParam 启动参数，默认填""（暂未实现）
         * @param {any} params.bShow 新进程是否显示，1表示显示，0表示隐藏，默认填1（暂未实现）
         * @returns 
         */
        runExe: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                szExePath: 'C:\\Program Files (x86)\\Internet Explorer\\iexplore.exe',
                szParam: '',
                bShow: 1
            };
            var jsonParam = {
                action: 'RunExe'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 透传cmd命令
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} szCmd Cmd命令，本地文件路径注意要加双引号
         * @returns 
         */
        shellCmd: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                szCmd: 'C:\\Program Files (x86)\\Internet Explorer\\iexplore.exe'//Cmd命令，本地文件路径注意要加双引号
            };
            var jsonParam = {
                action: 'ShellCmd'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 检查本地文件是否存在
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @param {any} params.szFilePath 本地绝对路径
         * @returns 
         */
        isFileExist: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                szFilePath: 'C:\\Program Files (x86)\\Microsoft Office\\root\\Office16\\WINWORD.EXE'
            };
            var jsonParam = {
                action: 'IsFileExist'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 检查是否有可用于刻录的盘符
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        burnGetAvailableDisks: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'BurnGetAvailableDisks'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 刻录文件
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} arguments 参数组
         * @param {any} arguments[i].title 标题
         * @param {any} arguments[i].filePath 要刻录的本地文件路径
         * @param {any} arguments[i].downloadLink 要下载的文件URL
         * @returns 
         */
        burnFile:function(ocxObj,arguments){
            if (!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'BurnFile',
                nConnectTimeout : 5,// 0表示一直等待，大于0表示等待的秒数
                nDownloadTimeout : 10,//0表示一直等待，大于0表示等待的秒数
                arguments : []
            };
            jsonParam.arguments = arguments || [];
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 获取刻录进度
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        burnGetProgress: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'BurnGetProgress'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 初始化读卡器（雄帝科技）
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        initEMPReadIDCard: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'InitEMPReadIDCard'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 反初始化读卡器（雄帝科技）
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        uninitEMPReadIDCard: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'UninitEMPReadIDCard'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 准备检测证件（雄帝科技）
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        EMPReadIDCard: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'EMPReadIDCard'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 启动ocx与虹膜仪之间的通信服务
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        startNetSDKServer: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                szServerName: "IrisServer",
                szIP: "",
                nPort: 8185,
                nTaskThreadNum: 1
            };
            var jsonParam = {
                action: 'StartNetSDKServer'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return ret;
        },
        /**
         * 关闭ocx与虹膜仪之间的通信服务
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        stopNetSDKServer: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {};
            var jsonParam = {
                action: 'StopNetSDKServer'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 唤醒虹膜客户端
         * 
         * @param {any} ocxObj ocx对象
         * @param {any} params 参数对象
         * @returns 
         */
        AwakenIrisClient: function(ocxObj,params){
            if (!commonUtils.isIE()) return;
            var defaultParams = {
                szExePath: "C:\\gosun\\GSWebOcxPackageMkv\\GSMKVClientOcx\\GSIrisCamera\\GSIrisCamera.exe",
                //szExePath: "D:\\code\\cmt\\ocx\\GSMKVClient\\test\\GSIrisCamera\\GSIrisCamera.exe",
                szIP: "",
                nPort: 8185,
                szParam: ""
            };
            var jsonParam = {
                action: 'AwakenIrisClient'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        }
    }

    return mkvOcx;
});