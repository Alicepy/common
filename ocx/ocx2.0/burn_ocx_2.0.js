/**
 * 刻录 ocx
 * @Author: zhangxuelian 
 * @Date: 2018-01-08 12:11:51 
 * @Last Modified by: zhuohuanjie
 * @Last Modified time: 2018-05-25 12:38:18
 * 
 * 页面插入object：<object id="burnOcx" name="burnOcx" classid="clsid:720515BD-4F59-451D-9F3A-4374CC849F2C"></object>
 **/
define(['jquery','common/utils/common_utils'], function ($,commonUtils) {
    var burn = {
        //播放器路径。审讯一体机本地磁盘路径，刻录OCX已固定安装目录，一般不修改该项
        playerPath: 'C:\\gosun\\GSWebOCXPackageCD\\GoSun.MultiWindowPlayer\\',
        /**
         * 初始化刻录
         * @returns {*}
         */
        init: function (ocxObjId,burnCallBack) {
            if(!commonUtils.isIE())return;
            var burnOcx = document.getElementById(ocxObjId);
            var jsonParam = {
                action : 'Init'
            };
            var ret = burnOcx.BurnManager(JSON.stringify(jsonParam));
            burnOcx.JSCallBack(burnCallBack);
            return burnOcx;
        },
        /**
         * 获取版本号
         */
        getOcxVersion: function (burnOcx) {
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'GetOcxVersion'
            };
            var ret = burnOcx.BurnManager(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 获取盘符信息
         */
        burnGetAvailableDisks:function(burnOcx){
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'BurnGetAvailableDisks'
            };
            var ret = burnOcx.BurnManager(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 释放控件
         * @returns {*}
         */
        uninit: function (burnOcx) {
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'Unit'
            };
            var ret = burnOcx.BurnManager(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        },
        /**
         * 开始刻录
         * @param param 参数
         *
         * eg: param = {
         * title: 'Test1',
         * 
         * filePath:[
         *      'E:/work/src/CDRecord/bin/mux3.mkv',
         *      'E:/work/src/CDRecord/bin/智能审讯系统播放器.exe',
         *      'E:/work/src/CDRecord/bin/智能审讯系统播放器'
         * ],
         * downloadLink:[
         *      'http://172.16.11.201/cmt/service/records/case/download?recordMagicId=a123213213213213213213',
         *      'http://172.16.11.201/cmt/service/records/base/download?magicId=a123213213213213213213',
         *      'http://172.16.11.201/cmt/service/records/person/download?recordMagicId=a123213213213213213213',
         *      'http://172.16.11.201/cmt/service/records/content/download?recordMagicId=a123213213213213213213'
         *  ]
         * }
         */
        start: function (burnOcx,param) {
            if(!commonUtils.isIE()) return;
            var defaultParams = {
                title : '',
                filePath : [],
                downloadLink : []
            } 
            var jsonParam = {
                action : 'BurnFile',
                nConnectTimeout : 5,// 0表示一直等待，大于0表示等待的秒数
                nDownloadTimeout : 10,//0表示一直等待，大于0表示等待的秒数
                param : []
            };
            var theParam = $.extend(defaultParams,param);
            jsonParam.param.push(theParam);
            var ret = burnOcx.BurnManager(JSON.stringify(jsonParam)); 
            return JSON.parse(ret);

        },
        /**
         * 获取进度
         * @returns {*}
         */
        getProcess: function (burnOcx) {
            if(!commonUtils.isIE()) return;
            var jsonParam = {
                action : 'BurnGetProgress',
            };
            var ret = burnOcx.BurnManager(JSON.stringify(jsonParam));
            return JSON.parse(ret);
        }
    }

    return burn;
});