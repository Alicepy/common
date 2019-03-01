/**
 * 全局ocx
 * @Author: zhangxuelian 
 * @Date: 2017-11-01 10:18:42 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-06-15 20:14:46
 * 
 * 页面插入object：<object id="playerOcx" classid="clsid:8C85B9C1-6B4C-4ECB-9887-2428DA03F77C"></object>
 **/
define(['jquery','common/utils/common_utils'],function($,commonUtils){
    
    var GosuncnOCX = {
        /**
         * ocx初始化
         * 
         * @param {any} ocxObjId object的dom节点ID
         * @param {any} ocxGlobalCallBack 初始化回调
         */
        init:function(ocxObjId,ocxGlobalCallBack) {
            if(commonUtils.isIE()){
                var ocxObj = document.getElementById(ocxObjId);
                ocxObj.RegJsFunctionCallback(ocxGlobalCallBack);//注册回调
                var jsonParam = {
                    action : 'InitPara',
                    arguments : {
                        ocxID: ocxObjId
                    }
                };
                ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return ocxObj;
            }
        }, 
        /**
         * 获取版本号
         */
        getVersion:function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : 'GetVersion'
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 登录BMS
         * 
         * @param {any} params.sIP 登录BMS的IP
         * @param {any} params.nPort 登录BMS的端口
         * @param {any} params.sUserName 登录BMS的用户名
         * @param {any} params.sPassword 登录BMS的密码
         */
        login:function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    sIP : '',
                    nPort : '',
                    sUserName : '',
                    sPassword : ''
                };
                var jsonParam = {
                    action : 'Login'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 设置配置参数
         */
        setConfig:function(ocxObj,params){
            if(commonUtils.isIE()){
                var defaultParams = {
                    nContinueCaptureType : 1,
                    nContinueCaptureStop : 3000,
                    nContinueCaptureInterval : 1000,
                    bIsStartMousePTZ : 1,
                    nEnableCPUWatch : 0,
                    nMaxLocalRecordSize : 1024,
                    nMaxLocalRecordTime : 8,
                    captureSavePath : "C:\GosunFiles\Image",
                    isAccessKeyboard : 0,
                    savePath : "C:\GosunFiles\VideoRecord",
                    isImmediateReplay : "off",
                    immediateBackSeconds : 15
                };
                var jsonParam = {
                    action : 'SetConfigParam'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 设置HTTP参数
         */
        setHttp:function(ocxObj,szIP){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : 'SetHttpParam',
                    arguments : {
                        szIP : szIP || "10.10.1.14"
                    }
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * 登出BMS
         */
        logout:function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : 'LogOut'
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        },
        /**
         * ocx释放
         */
        uninit:function(ocxObj) {
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : 'Delete',
                    arguments : {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        }
    };
    return GosuncnOCX;
})
