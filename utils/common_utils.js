/**
 * 公共模块
 * @Author: zhangxuelian 
 * @Date: 2018-07-16 09:15:17 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-07-16 09:17:54
 **/
define(['jquery'],function($){
    var commonUtils = {
        /**
         * 判断是否为IE
         */
        isIE:function(){
            if (!!window.ActiveXObject || "ActiveXObject" in window)
                return true;
            else
                return false;
        },
        /**
         * 判断是否为IE8
         */
        isIE8:function(){
            var a = navigator.appVersion.split(";");
            var b = a[1].replace(/[ ]/g,"");
            if(navigator.appName =="Microsoft Internet Explorer" && b == "MSIE8.0")
                return true;
            else
                return false;
        }
    };
    return commonUtils;
})