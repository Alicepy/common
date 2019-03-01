/**
 * 身份证读卡器 ocx
 * @Author: zhangxuelian 
 * @Date: 2018-01-10 11:53:39 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-01-10 15:56:24
 * 
 * 页面插入object：<object id="IDCardOcx" classid="clsid:B0D616B7-E0D0-40BA-A379-B550A9C4E478"></object>
 **/
define(['jquery','common/utils/common_utils'], function ($,commonUtils) {
    var IDCard = {
        /**
         *  初始化
         */
        init:function(){
            if(!commonUtils.isIE()) return;
            var ocxObj = document.getElementById(ocxObjId).object;
            var jsonParam = {
                action : 'ReadIDCard',
                arguments : {}
            };
            var ret = {};
            ret.result = JSON.parse(ocxObj.GS_SAFileManageFunc(JSON.stringify(jsonParam)));
            ret.obj = ocxObj;
            return ret;
        }
    }
})