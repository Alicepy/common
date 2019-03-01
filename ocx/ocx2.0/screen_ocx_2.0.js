/**
 * 共享屏幕 ocx
 * @Author: zhangxuelian 
 * @Date: 2018-01-08 12:11:51 
 * @Last Modified by: caihao
 * @Last Modified time: 2018-05-11 14:22:14
 * 
 * 页面插入object：<object id="regOcxDivRemoteCtrlOcx" classid="clsid:1F320A02-D4E6-4938-A222-1FEB87E93446" width="400" height="500"></object>
 **/
define(['jquery','common/utils/common_utils'], function ($,commonUtils) {
    var screenOcx = {
        /**
         * 初始化ocx
         * 
         * @param {any} ocxObjId object的节点id
         * @param {any} screenCallBack 回调函数
         * @returns 
         */
        init: function (ocxObjId, screenCallBack) {
            if(!commonUtils.isIE()) return;
            var screenOcxObj = document.getElementById(ocxObjId);
            var jsonParam = {
                action : 'Init',
                arguments: {}
            };
            screenOcxObj.GS_RegJsFunctionCallback(screenCallBack);    //注册回调
            var ret = screenOcxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return screenOcxObj;
        },
        /**
         * 反初始化
         * 
         * @param {any} screenOcxObj object节点
         * @returns 
         */
        uninit: function (screenOcxObj) {
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'UnInit',
                arguments: {}
            };
            var ret = screenOcxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 获取版本号
         * 
         * @param {any} screenOcxObj object节点
         * @returns 
         */
        getOcxVersion: function (screenOcxObj) {
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'GetOcxVersion',
                arguments: {}
            };
            var ret = screenOcxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 创建视图
         * 
         * @param {any} screenOcxObj object节点
         * @param {any} params 
         * @param {any} params.nWndCount 窗口数量
         * @returns 
         */
        createView: function (screenOcxObj, params) {
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                nWndCount : 1,
            }
            var jsonParam = {
                action : 'CreateView'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = screenOcxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 获取ocxid
         * 
         * @param {any} screenOcxObj object节点
         * @param {any} params 
         * @param {any} params.szOcxID 
         * @returns 
         */
        setOcxID: function (screenOcxObj, params) {
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                szOcxID : "OcxID_1",
            }
            var jsonParam = {
                action : 'SetOcxID'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = screenOcxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 销毁视图
         * 
         * @param {any} screenOcxObj object节点
         * @returns 
         */
        destroyView: function (screenOcxObj) {
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'DestroyView',
                arguments: {}
            };
            var ret = screenOcxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 打开远程桌面
         * 
         * @param {any} screenOcxObj object节点
         * @param {any} params 
         * @param {any} params.nWndCount 窗口数量
         * @param {any} params.szSession 会话ip
         * @param {any} params.nTimeOut 超时时间
         * @returns 
         */
        openRemoteDesktop: function (screenOcxObj, params) {
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                nWndNo: 1,
                szSession: "http://192.168.30.188:9595",
                nTimeOut: 2000
            };
            var jsonParam = {
                action : 'OpenRemoteDesktop'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = screenOcxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 关闭远程桌面
         * 
         * @param {any} screenOcxObj object节点
         * @param {any} params 
         * @param {any} params.nWndNo 窗口编号
         * @returns 
         */
        closeRemoteDesktop: function (screenOcxObj, params) {
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                nWndNo: 1
            };
            var jsonParam = {
                action : 'CloseRemoteDesktop'
            };
            jsonParam.arguments = $.extend(defaultParams,params || {});
            var ret = screenOcxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        }
    }

    return screenOcx;
});