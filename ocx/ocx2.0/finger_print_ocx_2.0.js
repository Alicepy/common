/**
 * 指纹仪ocx
 * @Author: zhangxuelian 
 * @Date: 2017-11-01 10:46:35 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-01-10 17:23:19
 * 依赖peripheral_ocx_2.0.js初始化与释放
 **/
define(['common/utils/common_utils'],function(commonUtils){
    var fingerprint={
        /**
         * 初始化指纹仪ocx
         */
        init:function (ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : "InitSensor",
                    arguments : {}
                };
                return JSON.parse(ocxObj.GS_SysFunc(JSON.stringify(jsonParam)));
            }
        },
        /**
         * 检测指纹仪
         */
        beginEnroll:function (ocxObj){
            var jsonParam = {
                    action: "BeginEnroll",
                    arguments: {}
            };
            return JSON.parse(ocxObj.GS_SysFunc(JSON.stringify(jsonParam)));
        },
        /**
         * 释放指纹仪ocx
         */
        uninit:function (ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : "UninitSensor",
                    arguments : {}
                };
                return JSON.parse(ocxObj.GS_SysFunc(JSON.stringify(jsonParam)));
            }
        },
        /**
         * 比对指纹
         * 
         * @param {any} arg 
         * @returns 
         */
        compareFinger:function (ocxObj,arg){
            var jsonParam = {
                    "action": "CompareFinger",
                    "arguments": arg
            };
            return JSON.parse(ocxObj.GS_SysFunc(JSON.stringify(jsonParam)));
        }
    };
    return fingerprint;
})
