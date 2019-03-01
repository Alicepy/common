/**
 * DateUtil
 * @Author: zhangxuelian 
 * @Date: 2017-09-14 14:25:09 
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2018-11-30 17:06:57
 **/
define(['services/services'],function(services){
    services.service('dateUtil', function() {
        /**
		 * 返回距 1970 年 1 月 1 日之间的毫秒数(可用于比较时间先后)
		 * @param {} Date 格式为：yyyy-mm-dd
		 */
		this.formatTimesFromDate = function(Date){
			var arr = Date.split("-");
			var newDate = new Date(arr[0],arr[1],arr[2]);
			var resultDate = newDate.getTime();
			return resultDate;
		},
		/**
		 * 返回距 1970 年 1 月 1 日之间的毫秒数(可用于比较时间先后)
		 * @param {} Time 格式为：hh:mm:ss
		 */
		this.formatTimesFromTime = function(Time){
			var arr = Time.split(":");
			var newTime = new Date('','','',arr[0],arr[1],arr[2]);
			var resultDate = newTime.getTime();
			return resultDate;
		},
        /**
         * 返回 date 间隔days天数的时间 1则为date的下一天 -1则为date的上一天
         * @param {} DateTime 格式为：yyyy-mm-dd hh:mm:ss
         */
        this.addDate = function (date,days) {
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
        this.minusDate = function (date,days) {
            var date = new Date(date.replace(/\-/g,"\/"));
            date.setDate(date.getDate() - days);
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
		this.formatTimesFromDateTime = function(DateTime){
			var date = new Date(Date.parse(DateTime.replace(/-/g, "/")));
			var resultDate = date.getTime();
			return resultDate;
		},
		/**
		 * 将时间戳转成普通时间格式(此处会返回一个当前日期的时间的bug)
		 * @param ns 时间戳(距 1970 年 1 月 1 日之间的毫秒数)
		 * @return {String} 格式为：yyyy-mm-dd hh:mm:ss
		 */
		this.getDateTimeFromStamp = function(ns){
			var date = new Date(ns);
			return this.getFormatDate(date);
        }
		/**
		 * 将时间戳转成普通时间格式(上面有误，这是正确的方法) 
		 * @param ns 时间戳(距 1970 年 1 月 1 日之间的毫秒数)
		 * @return {String} 格式为：yyyy-mm-dd hh:mm:ss
		 */
		this.getDateTimeFromStampCurrect = function(ns){
			var date = new Date(ns);
			return this.formatDate(date);
        }
        /**
         * 格式化时间
         * @param {any} date /Mon Nov 20 2017 14:28:48 GMT+0800 (中国标准时间)/
         * @returns {String}/2016-01-01 23:59:59/
         */
        this.formatDate = function(date){
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
        this.getFormatDate = function () {
            var date = new Date();
            return this.formatDate(date);
        }
        /**
         * 获取差距date有n秒钟的时间
         * 
         * @param date {any} /2016-01-01 23:59:59/
         * @param seconds {int} 0为date当时，1为date的下一秒钟，-1为date的上一秒钟，以此类推
         * @returns {String} /2016-01-01 23:59:59/
         */
        this.getDatebySeconds = function (dateStr,seconds) {
            var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
            date.setSeconds(date.getSeconds() + seconds);
            return this.formatDate(date);
        }
        /**
         * 获取差距date有n分钟的时间
         * 
         * @param date {any} /2016-01-01 23:59:59/
         * @param minutes {int} 0为date当时，1为date的下一分钟，-1为date的上一分钟，以此类推
         * @returns {String} /2016-01-01 23:59:59/
         */
        this.getDatebyMinutes = function (dateStr,minutes) {
            var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
            date.setMinutes(date.getMinutes() + minutes);
            return this.formatDate(date);
        }
        /**
         * 获取差距date有n天的时间
         * 
         * @param date {any} /2016-01-01 23:59:59/
         * @param days {int} 0为date当天，1为date的下一天，-1为date的上一天，以此类推
         * @returns {String} /2016-01-01 23:59:59/
         */
        this.getDatebyDays = function (dateStr,days) {
            var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
            date.setDate(date.getDate() + days);
            return this.formatDate(date);
        }
        /**
         * 获取差距date有n月的时间
         * 
         * @param date {any} /2016-01-01 23:59:59/
         * @param months {int} 0为date当天，1为date的下一月，-1为date的上一月，以此类推
         * @returns {String} /2016-01-01 23:59:59/
         */
        this.getDatebyMonths = function (dateStr,months) {
            var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
            date.setMonth(date.getMonth() + months);
            return this.formatDate(date);
        }
        /**
         * 获取差距date有n年的时间
         * 
         * @param date {any} /2016-01-01 23:59:59/
         * @param years {int} 0为date当天，1为date的下一年，-1为date的上一年，以此类推
         * @returns {String} /2016-01-01 23:59:59/
         */
        this.getDatebyYears = function (dateStr,years) {
            var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
            date.setFullYear(date.getFullYear() + years);
            return this.formatDate(date);
        }
        /**
         * 获取当前时间 时分秒
         * @returns {String}/23:59:59/
         */
        this.getFormatTime = function(){
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
         * 计算时长
         * 
         * @param {any} duration 00时00分00秒
         * @param {any} n 单位：秒
         * 
         * @returns {String}/00时00分10秒/
         */
        this.calculateDuration = function(duration,n){
            try{
                var hours = parseInt(duration.split('时')[0], 10),
                    minutes = parseInt(duration.split('时')[1].split('分')[0], 10),
                    seconds = parseInt(duration.split('时')[1].split('分')[1].substring(0,2), 10);
                
                function formatter(hour,minute,second){
                    var hour1 = '00', minute1 = '00', second1 = '00';
                    if(hour>0){
                        hour1 = hour<10 ? '0'+hour : hour;
                    }
                    if(minute>0){
                        minute1 = minute<10 ? '0'+minute : minute;
                    }
                    if(second>0){
                        second1 = second<10 ? '0'+second : second;
                    }
                    return hour1+'时'+minute1+'分'+second1+'秒';
                }
                
                if(seconds+n>=60){
                    var seconds1 = (seconds+n)%60,
                        minutes1 = minutes+(seconds+n-seconds1)/60;
                    if(minutes1>60){
                        var minutes2 = minutes1%60,
                            hours1 = hours+(minutes1-minutes2)/60;
                        return formatter(hours1,minutes2,seconds1); 
                    }else{
                        return formatter(hours,minutes1,seconds1);
                    }
                }else{
                    return formatter(hours,minutes,seconds+n);
                }

            }catch(ex){
                return '00时00分00秒';
            }
        },   
        /**
         * 时长转秒数
         * 
         * @param {any} duration 00时01分00秒
         * @returns {any}/60/
         */
        this.durationToMinutes = function(duration){
            try{
                var hours = parseInt(duration.split('时')[0]) || 0,
                minutes = parseInt(duration.split('时')[1].split('分')[0]) || 0,
                seconds = parseInt(duration.split('时')[1].split('分')[1].substring(0,2)) || 0;
                return hours*60*60 + minutes*60 + seconds;
            }catch(ex){
                return 0;
            }
            
        },
        /**
         * 秒数转时长
         * 
         * @param {any} minutes 60
         * @returns {any}/00:01:00/
         */
        this.secondsToDuration = function(secondCounts){
            try{
                var seconds = secondCounts % 60;
                var theSeconds = seconds < 10 ? "0" + seconds : seconds;
                if(seconds != secondCounts){
                    var minuteCounts = (secondCounts - seconds)/60;
                    var minutes = minuteCounts > 60 ? minuteCounts % 60 : minuteCounts;
                    var theMinutes = minutes < 10 ? "0" + minutes : minutes;
                    if(minutes != minuteCounts){
                        var hours = (minuteCounts - minutes)/60;
                        var theHours = hours < 10 ? "0" + hours : hours;
                        return theHours + ":" + theMinutes + ":" + theSeconds;
                    }else{
                        return theMinutes + ":" + theSeconds;
                    }
                }else{
                    return "00:"+ theSeconds;
                }
            }catch(ex){
                return "";
            }
        },
        /**
         * 获取当前年月日(中文分割)
         * @returns {String}/2016年01月01日/
         */
        this.getFormatCAPDate= function () {
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
        this.getFormatLOWDate = function () {
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
        this.getFormatSLADate = function () {
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
        this.getFormatFullDate = function () {
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
        this.getFormatUSADate = function () {
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
        this.getFormatUKDate = function () {
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
        /**
         * 处理日期中带有中文
         */
        this.ZNToNum = function (text) {
            var arr = text.split('年')
            var arr2 = arr[1].split('月');
            var arr3 = arr2[1].split('日');
            return arr[0] + '-' + (arr2[0] < 9 ? '0' + arr2[0] : arr2[0]) + '-' + (arr3[0] < 9 ? '0' + arr3[0] : arr3[0]);
        }
        /**
         * 获取时间差
         * @param {String} 2018-05-07 23:18:54
         */
        this.timeInterval = function(start,end){
            var startTime = Date.parse(start.replace(/-/g,'/'));//开始时间
            var endTime = Date.parse(end.replace(/-/g,'/'));//结束时间
            // 从数学上来说，时间差应该是“结束时间 - 开始时间 + 1s”
            var usedTime = Math.abs(parseFloat(startTime) - parseFloat(endTime) + 1000);  //两个时间戳相差的毫秒数
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
        /**
        * 字符串日期转阿拉伯日期
        * @param {String} 2018年05月07日
        * @returns {String} 2018-05-07
        */
        this.dateStrToDate = function (dateStr) {
            try{
                return dateStr.replace('年','-').replace('月','-').replace('日','')
            }catch(e){
                return "";
            }
        }
        /**
         * 将日期转成没有自动补零的日期
         * @param {String} 2018年05月07日
         * @returns {String} 2018年5月7日
         */
        this.formatDateNoZero = function(date){
            var myDate = new Date(this.dateStrToDate(date));
            try{
                return myDate.getFullYear()+"年"+myDate.getMonth()+1+"月"+myDate.getDate();
            }catch(e){
                return "";
            }
        }
        /**
         * 日期转大写
         * @param {String} 2018年05月07日
         * @returns {String} 二〇一八年五月七日
         */
        this.dateToDATE= function(date){
            var sCN = '〇一二三四五六七八九十';
            if (date.slice(0, 10).match(/\d/g) === null) {
                return date;
            }
            try{
                var year = date.split("年")[0],
                    month = parseInt(date.split("年")[1].split("月")[0]);
                    day = parseInt(date.split("年")[1].split("月")[1].split("日")[0]);
                var newYear = sCN.charAt(parseInt(year.charAt(0))) 
                            + sCN.charAt(parseInt(year.charAt(1))) 
                            + sCN.charAt(parseInt(year.charAt(2))) 
                            + sCN.charAt(parseInt(year.charAt(3)));
                var newMonth = month <= 10 ? 
                                sCN.charAt(month) : 
                                '十' + sCN.charAt(parseInt(month.toString().charAt(1)));
                var newDay = day <= 10 ? 
                                sCN.charAt(day) : 
                                (day < 20 ? 
                                    '十'+sCN.charAt(parseInt(day.toString().charAt(1))) : 
                                    sCN.charAt(parseInt(day.toString().charAt(0)))+'十'+sCN.charAt(parseInt(day.toString().charAt(1))));
                if (day % 10 === 0 && day > 10) {
                    newDay = sCN[day / 10] + "十";
                }
                return newYear+"年"+newMonth+"月"+newDay+"日";
            }catch(e){
                return "";
            }
        };
    });
})
