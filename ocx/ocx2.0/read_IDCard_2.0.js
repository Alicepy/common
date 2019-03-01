/**
 * 身份证读卡器 ocx
 * @Author: zhangxuelian 
 * @Date: 2018-01-10 12:07:09 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-01-11 09:40:52
 * 
 * 依赖peripheral_ocx_2.0.js初始化与释放
 **/
define(['jquery','common/utils/common_utils'], function ($,commonUtils) {
    var IDCard = {
        /**
         * 读取身份证信息，同步返回
         * 
         * return:
         * id 身份证
         * born 生日：1999年1月1日
         * name 名字
         * nation 民族
         * sex 性别
         * address 住址
         * userlifebegin 有效开始时间
         * userlifeend 有效结束时间
         * grantdept 签发机关
         * 
         */
        init:function(ocxObj){
            if(commonUtils.isIE()){
                var jsonParam = {
                    action : "ReadIDCard",
                    arguments : {}
                };
                return JSON.parse(ocxObj.GS_SysFunc(JSON.stringify(jsonParam)));
            }
        }
    }
    return IDCard;
})