/**
 * 指纹仪ocx
 * @Author: zhangxuelian 
 * @Date: 2017-11-01 10:46:35 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-01-09 23:37:29
 **/
define(['common/utils/common_utils'],function(commonUtils){
    var fingerprint={
        /**
         * ocx对象
         */
        ocxObj:null,
        /**
         * 初始化指纹仪ocx
         * 
         * @param {any} ocxObject 全局ocx对象
         * @returns 
         */
        init:function(ocxObject) {
            if(commonUtils.isIE()){
                this.ocxObj = ocxObject;
                var jsonParam = {
                        action : "InitSensor",
                        arguments : {}
                };
                return JSON.parse(this.ocxObj.GS_SAFileManageFunc(JSON.stringify(jsonParam)));
            }
        },
        /**
         * 释放指纹仪ocx
         */
        uninit:function (){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : "UninitSensor",
                    arguments : {}
                };
                return JSON.parse(this.ocxObj.GS_SAFileManageFunc(JSON.stringify(jsonParam)));
            }
        },
        /**
         * 注册
         */
        regFinger:function (){
            var jsonParam = {
                    "action": "BeginEnroll",
                    "arguments": {}
            };
            return JSON.parse(this.ocxObj.GS_SAFileManageFunc(JSON.stringify(jsonParam)));
        },
        /**
         * 注册回调
         * 
         * @param {any} fun 
         */
        registCallback:function (fun){
            this.ocxObj.GS_SARegJsFunctionCallback(fun);
        },
        /**
         * compare finger
         * 
         * @param {any} arg 
         * @returns 
         */
        compareFinger:function (arg){
            var jsonParam = {
                    "action": "CompareFinger",
                    "arguments": arg
            };
            return JSON.parse(this.ocxObj.GS_SAFileManageFunc(JSON.stringify(jsonParam)));
        }
    };
    return fingerprint;
})
