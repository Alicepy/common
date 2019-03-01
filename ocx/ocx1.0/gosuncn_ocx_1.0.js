/**
 * 全局ocx 初始化与释放
 * @Author: zhangxuelian 
 * @Date: 2017-11-01 10:18:42 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-01-09 22:36:19
 * 
 * 页面插入object：<object id="globalOcx" classid="clsid:B0D616B7-E0D0-40BA-A379-B550A9C4E478"></object>
 **/
define(['common/utils/common_utils'],function(commonUtils){
    var GosuncnOCX = {
        /**
         * ocx初始化
         * 
         * @param {any} ocxObjId object的dom节点ID
         * @param {any} ocxGlobalCallBack 初始化回调
         * @param {any} version 版本号
         */
        init:function(ocxObjId,ocxGlobalCallBack,version) {
            if(commonUtils.isIE()){
                var ocxObj = document.getElementById(ocxObjId);
                ocxObj.GS_SARegJsFunctionCallback(ocxGlobalCallBack);    //注册回调
                var jsonParam = {
                    action : 'Init',
                    arguments : {
                        platVersion : version || "4.0.0.0" //版本号
                    }
                };
                ocxObj.GS_SASysFunc(JSON.stringify(jsonParam));
                return ocxObj;
            }
        },
        /**
         * ocx释放
         */
        uninit:function(ocxObj) {
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : 'UnInit'
                };
                ocxObj.GS_SASysFunc(JSON.stringify(jsonParam));
            }
        }
    };
    return GosuncnOCX;
})
