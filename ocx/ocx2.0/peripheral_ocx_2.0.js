/**
 * 
 * @Author: zhangxuelian 
 * @Date: 2018-01-10 12:41:24 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-02-05 15:21:07
 * 页面插入object：<object id="yourOcx" classid="clsid:BE806C69-1CFB-4419-8D7D-BC63D580ACF6"></object>
 **/
define(['jquery','common/utils/common_utils'], function ($,commonUtils) {
    var peripheral = {
        /**
         * 初始化ocx
         */
        init:function(ocxObjId,ocxCallBack){
            if(!commonUtils.isIE()) return;
            var ocxObj = document.getElementById(ocxObjId);
            var jsonParam = {
                action : 'Init',
                arguments : {}
            };
            ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            ocxObj.GS_RegJsFunctionCallback(ocxCallBack);//注册回调
            return ocxObj;
        },
        /**
         * 获取版本号
         */
        getOcxVersion:function(ocxObj){
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'GetOcxVersion',
                arguments : {}
            };
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 释放ocx（实现不完整暂不用）
         */
        unInit:function(ocxObj){
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'UnInit',
                arguments : {}
            };
            var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        }
    }

    return peripheral;
})