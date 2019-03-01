/**
 * DateUtil
 * @Author: zhangxuelian 
 * @Date: 2017-09-14 14:25:09 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-11-22 11:02:51
 **/
define(['jquery'],function($){
    var dateUtil = {};
    /**
     * 返回距 1970 年 1 月 1 日之间的毫秒数(可用于比较时间先后)
     * @param {} Date 格式为：yyyy-mm-dd
     */
    dateUtil.formatTimesFromDate = function(Date){
        var arr = Date.split("-");
        var newDate = new Date(arr[0],arr[1],arr[2]);
        var resultDate = newDate.getTime();
        return resultDate;
    },
    /**
     * 返回距 1970 年 1 月 1 日之间的毫秒数(可用于比较时间先后)
     * @param {} Time 格式为：hh:mm:ss
     */
    dateUtil.formatTimesFromTime = function(Time){
        var arr = Time.split(":");
        var newTime = new Date('','','',arr[0],arr[1],arr[2]);
        var resultDate = newTime.getTime();
        return resultDate;
    },
    /**
     * 返回 date 间隔days天数的时间
     * @param {} DateTime 格式为：yyyy-mm-dd hh:mm:ss
     */
    dateUtil.addDate = function (date,days) {
        var date = new Date(date.replace(/\-/g,"\/"));
        date.setDate(date.getDate() + days);
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var strHours=date.getHours();
        var strMins=date.getMinutes();
        var strSeconds=date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (strHours >= 0 && strHours <= 9) {
            strHours = "0" + strHours;
        }
        if (strMins >= 0 && strMins <= 9) {
            strMins = "0" + strMins;
        }
        if (strSeconds >= 0 && strSeconds <= 9) {
            strSeconds = "0" + strSeconds;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + strHours + seperator2 + strMins
            + seperator2 + strSeconds;
        return currentdate;
    },
    /**
     * 返回距 1970 年 1 月 1 日之间的毫秒数(可用于比较时间先后)
     * @param {} DateTime 格式为：yyyy-mm-dd hh:mm:ss
     */
    dateUtil.formatTimesFromDateTime = function(DateTime){
        var date = new Date(Date.parse(DateTime.replace(/-/g, "/")));
        var resultDate = date.getTime();
        return resultDate;
    },
    /**
     * 将时间戳转成普通时间格式
     * @param ns 时间戳(距 1970 年 1 月 1 日之间的毫秒数)
     * @return {String} 格式为：yyyy-mm-dd hh:mm:ss
     */
    dateUtil.getDateTimeFromStamp = function(ns){
        var date = new Date(ns);
        return dateUtil.getFormatDate(date);
    }
     /**
     * 将时间戳转成普通时间格式
     * @param ns 时间戳(距 1970 年 1 月 1 日之间的毫秒数)
     * @return {String} 格式为：yyyy-mm-dd hh:mm:ss
     */
    dateUtil.getDateTimeFromStampCurrect = function(ns){
        var date = new Date(ns);
        return dateUtil.formatDate(date);
    }
    /**
     * 格式化时间
     * @param {any} date /Mon Nov 20 2017 14:28:48 GMT+0800 (中国标准时间)/
     * @returns {String}/2016-01-01 23:59:59/
     */
    dateUtil.formatDate = function(date){
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var strHours=date.getHours();
        var strMins=date.getMinutes();
        var strSeconds=date.getSeconds();		    
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (strHours >= 0 && strHours <= 9) {
            strHours = "0" + strHours;
        }
        if (strMins >= 0 && strMins <= 9) {
            strMins = "0" + strMins;
        }
        if (strSeconds >= 0 && strSeconds <= 9) {
            strSeconds = "0" + strSeconds;
        }
        var theDate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + strHours + seperator2 + strMins
        + seperator2 + strSeconds;
        return theDate;
    }
    /**
     * 获取当前时间
     * @returns {String}/2016-01-01 23:59:59/
     */
    dateUtil.getFormatDate = function () {
        var date = new Date();
        return dateUtil.formatDate(date);
    }
    /**
     * 获取差距date有n秒钟的时间
     * 
     * @param date {any} /2016-01-01 23:59:59/
     * @param seconds {int} 0为date当时，1为date的下一秒钟，-1为date的上一秒钟，以此类推
     * @returns {String} /2016-01-01 23:59:59/
     */
    dateUtil.getDatebySeconds = function (dateStr,seconds) {
        var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        date.setSeconds(date.getSeconds() + seconds);
        return dateUtil.formatDate(date);
    }
    /**
     * 获取差距date有n分钟的时间
     * 
     * @param date {any} /2016-01-01 23:59:59/
     * @param minutes {int} 0为date当时，1为date的下一分钟，-1为date的上一分钟，以此类推
     * @returns {String} /2016-01-01 23:59:59/
     */
    dateUtil.getDatebyMinutes = function (dateStr,minutes) {
        var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        date.setMinutes(date.getMinutes() + minutes);
        return dateUtil.formatDate(date);
    }
    /**
     * 获取差距date有n天的时间
     * 
     * @param date {any} /2016-01-01 23:59:59/
     * @param days {int} 0为date当天，1为date的下一天，-1为date的上一天，以此类推
     * @returns {String} /2016-01-01 23:59:59/
     */
    dateUtil.getDatebyDays = function (dateStr,days) {
        var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        date.setDate(date.getDate() + days);
        return dateUtil.formatDate(date);
    }
    /**
     * 获取差距date有n月的时间
     * 
     * @param date {any} /2016-01-01 23:59:59/
     * @param months {int} 0为date当天，1为date的下一月，-1为date的上一月，以此类推
     * @returns {String} /2016-01-01 23:59:59/
     */
    dateUtil.getDatebyMonths = function (dateStr,months) {
        var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        date.setMonth(date.getMonth() + months);
        return dateUtil.formatDate(date);
    }
    /**
     * 获取差距date有n年的时间
     * 
     * @param date {any} /2016-01-01 23:59:59/
     * @param years {int} 0为date当天，1为date的下一年，-1为date的上一年，以此类推
     * @returns {String} /2016-01-01 23:59:59/
     */
    dateUtil.getDatebyYears = function (dateStr,years) {
        var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        date.setFullYear(date.getFullYear() + years);
        return dateUtil.formatDate(date);
    }
    /**
     * 获取当前时间 时分秒
     * @returns {String}/23:59:59/
     */
    dateUtil.getFormatTime = function(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var strHours=date.getHours();
        var strMins=date.getMinutes();
        var strSeconds=date.getSeconds();	
                
        if (strHours >= 0 && strHours <= 9) {
            strHours = "0" + strHours;
        }
        if (strMins >= 0 && strMins <= 9) {
            strMins = "0" + strMins;
        }
        if (strSeconds >= 0 && strSeconds <= 9) {
            strSeconds = "0" + strSeconds;
        }
        var currentdate = strHours + seperator2 + strMins
        + seperator2 + strSeconds;
        return currentdate;
    }
    /**
     * 获取当前年月日(中文分割)
     * @returns {String}/2016年01月01日/
     */
    dateUtil.getFormatCAPDate= function () {
        var date = new Date();
        var seperator1 = "年";
        var seperator2 = "月";
        var seperator3 = "日";
        var Year=date.getFullYear();
        var Month = date.getMonth() + 1;
        var Day = date.getDate();
        if (Month >= 1 && Month <= 9) {
            Month = "0" + Month;
        }
        if (Day >= 0 && Day <= 9) {
            Day = "0" + Day;
        }
        var currentdate = Year + seperator1 + Month + seperator2 + Day + seperator3;
        return currentdate;
    }
    /**
     * 获取当前年月日(‘-’分割)
     * @returns {String}/2016-01-01/
     */
    dateUtil.getFormatLOWDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var Year=date.getFullYear();
        var Month = date.getMonth() + 1;
        var Day = date.getDate();
        if (Month >= 1 && Month <= 9) {
            Month = "0" + Month;
        }
        if (Day >= 0 && Day <= 9) {
            Day = "0" + Day;
        }
        var currentdate = Year + seperator1 + Month + seperator1 + Day ;
        return currentdate;
    }
    /**
     * 获取当前年月日(‘/’分割)
     * @returns {String}/21/01/2016/
     */
    dateUtil.getFormatSLADate = function () {
        var date = new Date();
        var seperator1 = "/";
        var Year=date.getFullYear();
        var Month = date.getMonth() + 1;
        var Day = date.getDate();
        if (Month >= 1 && Month <= 9) {
            Month = "0" + Month;
        }
        if (Day >= 0 && Day <= 9) {
            Day = "0" + Day;
        }
        var currentdate = Day+ seperator1 + Month + seperator1 +Year   ;
        return currentdate;
    }
    /**
     * 获取当前年月日 时分秒
     * @returns {String}/2016年01月01日 23时59分59秒/
     */
    dateUtil.getFormatFullDate = function () {
        var date = new Date();
        var seperator1 = "年";
        var seperator2 = "月";
        var seperator3 = "日";
        var seperator4 = "时";
        var seperator5 = "分";
        var seperator6 = "秒";
        var Year=date.getFullYear();
        var Month = date.getMonth() + 1;
        var Day = date.getDate();
        var Hours=date.getHours();
        var Minutes=date.getMinutes();
        var Seconds=date.getSeconds();
        if (Month >= 1 && Month <= 9) {
            Month = "0" + Month;
        }
        if (Day >= 0 && Day <= 9) {
            Day = "0" + Day;
        }
        if (Hours >= 0 && Hours <= 9) {
            Hours = "0" + Hours;
        }
        if (Minutes >= 0 && Minutes <= 9) {
            Minutes = "0" + Minutes;
        }
        if (Seconds >= 0 && Seconds <= 9) {
            Seconds = "0" + Seconds;
        }
        var currentdate = Year+seperator1+Month+seperator2
            +Day+seperator3+ " " + Hours+seperator4+Minutes+seperator5+Seconds+seperator6;
        return currentdate;
    }
    /**
     * 获取当前年月日(美式写法)
     * @returns {String}/June 15,2016/
     */
    dateUtil.getFormatUSADate = function () {
        var date = new Date();
        var seperator1 = ",";
        var Year=date.getFullYear();
        var MM = date.getMonth() ;
        var Day = date.getDate();
        var MonthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var Month=MonthArr[MM];
        if (Day >= 0 && Day <= 9) {
            Day = "0" + Day;
        }
        var currentdate = Month +" " +Day+seperator1+Year ;
        return currentdate;
    }
    /**
     * 获取当前年月日(英式写法)
     * @returns {String}/15 June,2016/
     */
    dateUtil.getFormatUKDate = function () {
        var date = new Date();
        var seperator1 = ",";
        var Year=date.getFullYear();
        var MM = date.getMonth() ;
        var Day = date.getDate();
        var MonthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var Month=MonthArr[MM];
        if (Day >= 0 && Day <= 9) {
            Day = "0" + Day;
        }
        var currentdate = Day +" " +Month+seperator1+Year ;
        return currentdate;
    }
    /*
    * 设置某日期的格式化
    * @returns {String} yy-MM-dd
    */
    dateUtil.Format = function (date,fmt) {
        if(arguments.length ==0) return false;
        fmt?fmt = fmt: fmt='yy-MM-dd';
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    /**
     * 处理日期中带有中文
     */
    dateUtil.ZNToNum = function (text) {
        var arr = text.split('年')
        var arr2 = arr[1].split('月');
        var arr3 = arr2[1].split('日');
        return arr[0] + '-' + (arr2[0] < 9 ? '0' + arr2[0] : arr2[0]) + '-' + (arr3[0] < 9 ? '0' + arr3[0] : arr3[0]);
    };
    dateUtil.timeInterval = function(start,end){
        var startTime = Date.parse(start.replace(/-/g,'/'));//开始时间
        var endTime = Date.parse(end.replace(/-/g,'/'));//结束时间
        var usedTime = Math.abs(parseFloat(startTime) - parseFloat(endTime));  //两个时间戳相差的毫秒数
        var flag = ((startTime - endTime)>0)?'-':'+';
        var days = Math.floor(usedTime/(24*3600*1000));
        //计算出小时数
        var leave1 = usedTime%(24*3600*1000);    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2 = leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2/(60*1000));
        var seconds = Math.floor((usedTime - days*24*60*60*1000 - hours*60*60*1000 - minutes*60*1000)/1000);//取得算出分后剩余的秒数

        var timeIntervalObj = {
            days:days,
            hours:hours,
            minutes:minutes,
            seconds:seconds,
            usedTime:usedTime,
            flag:flag
        };
        return timeIntervalObj;
    };
    return dateUtil;
})
