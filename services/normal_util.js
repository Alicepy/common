/**
 * normalUtil
 * @Author: zhangxuelian
 * @Date: 2017-09-19 10:33:24
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-11-26 09:56:23
 **/
define(['services/services'], function (services) {
    services.service('normalUtil', function (Models) {
        /**
         * 添加事件
         * 
         * @param  {} ele 要绑定事件的对象，及HTML节点
         * @param  {} event_name 事件名称,以on开头
         * @param  {} fun 要绑定的事件监听函数
         */
        this.addEvent = function(ele,event_name,fun){
            if (window.attachEvent)   
                ele.attachEvent(event_name, fun);  //IE浏览器  
            else  
            {  
                event_name = event_name.replace(/^on/, "");   //如果on开头，删除on，如onclick->click  
                ele.addEventListener(event_name, fun, false);  //非IE浏览器  
            }  
        }
        /**
         * 数组快速排序（数组对象为int型）
         *
         * @param {any} array
         * @returns
         */
        this.quickSort = function (array) {
            function sort(prev, numsize) {
                var nonius = prev;
                var j = numsize - 1;
                var flag = array[prev];
                if ((numsize - prev) > 1) {
                    while (nonius < j) {
                        for (; nonius < j; j--) {
                            if (array[j] < flag) {
                                array[nonius++] = array[j];　 //a[i] = a[j]; i += 1;
                                break;
                            };
                        }
                        for (; nonius < j; nonius++) {
                            if (array[nonius] > flag) {
                                array[j--] = array[nonius];
                                break;
                            }
                        }
                    }
                    array[nonius] = flag;
                    sort(0, nonius);
                    sort(nonius + 1, numsize);
                }
            }
            sort(0, array.length);
            return array;
        };
        /**
         * 快速排序（数组对象为json对象）,按该对象的长度进行排序
         *
         * @param {array} array [{a:'xxx'},{a:'xx'},{a:'x'}]
         * @param {string} key a
         * @param {string} type true:长度正序 false:长度倒序 默认正序
         * @returns [{a:'x'},{a:'xx'},{a:'xxx'}]
         */
        this.quickSortArr = function (array, key, type) {
            function sort(prev, numsize) {
                var nonius = prev;
                var j = numsize - 1;
                var flag = array[prev][key].length;
                if ((numsize - prev) > 1) {
                    while (nonius < j) {
                        for (; nonius < j; j--) {
                            if (array[j][key].length < flag) {
                                array[nonius++][key] = array[j][key];　 //a[i] = a[j]; i += 1;
                                break;
                            };
                        }
                        for (; nonius < j; nonius++) {
                            if (array[nonius][key].length > flag) {
                                array[j--][key] = array[nonius][key];
                                break;
                            }
                        }
                    }
                    array[nonius][key].length = flag;
                    sort(0, nonius);
                    sort(nonius + 1, numsize);
                }
            }
            sort(0, array.length);

            var theType = type || true;
            if (!theType) {
                for (var i = 0; i < parseInt((array.length - 1) / 2); i++) {
                    var temp = array[i];
                    array[i] = array[array.length - 1 - i];
                    array[ret.length - 1 - i] = temp;
                }
            }
            return array;
        };
        /**
         * 数组去重,数组元素为string
         *
         * @param {any} arr
         * @returns
         */
        this.uniqueArr = function (arr) {
            var res = [];
            var json = {};
            for (var i = 0; i < arr.length; i++) {
                if (!json[arr[i]]) {
                    res.push(arr[i]);
                    json[arr[i]] = 1;
                }
            }
            return res;
        };
        /**
         * 数组去重,数组元素为json
         *
         * @param {any} arr
         * @param {any} key
         * @returns
         */
        this.uniqueArrJson = function (arr, key) {
            var res = [];
            var json = {};
            $.each(arr, function (i, item) {
                if (!json[item[key]]) {
                    res.push(item);
                    json[item[key]] = 1;
                }
            });
            return res;
        };
        /**
         * 从数组中查找对象值，返回下标（同用于判断数组中是否存在某对象）
         * ps：数组对象为json
         * @param {any} arr
         * @param {any} key
         * @param {any} value
         * @returns
         */
        this.eleInArr = function (arr, key, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][key] == value) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * 从数组中查找对象值，返回下标（同用于判断数组中是否存在某对象）
         * ps:数组对象为string
         * @param {any} arr
         * @param {any} value
         * @returns
         */
        this.valInArr = function (arr, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == value) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * 判断是否为函数
         *
         * @param {any} fn
         * @returns
         */
        this.isFunction = function (fn) {
            return Object.prototype.toString.call(fn) === '[object Function]';
        };
        /**
         * json中把空对象移除
         *
         * @param {any} json
         * @returns
         */
        this.removeEmptyField = function (json) {
            var newJson = {};
            $.each(json, function (i, item) {
                if (item) {
                    newJson[i] = item;
                }
            });
            return newJson;
        };
        /**
         * json中把数组的对象中的空属性移除
         *
         * @param {any} json
         * @returns
         */
        this.removeEmptyParams = function (array) {
            var newArray = [];
            for (var i = 0; i < array.length; i++) {
                var newObj = {};
                for (j in array[i]) {
                    if (array[i][j]) {
                        newObj[j] = array[i][j];
                    }
                }
                newArray.push(newObj);
            }
            return newArray;
        };
        /**
         * 格式化文字
         *
         * @param {any} text
         * @param {any} len
         */
        this.formatterText = function (text, len) {
            var newText = $.trim(text);
            if (newText.length) {
                var length = len || 10;
                if (newText.length > length) {
                    return '<span title="' + newText + '">' + newText.substring(0, length) + '...</span>';
                } else {
                    return newText;
                }
            } else {
                return '';
            }
        };
        /**
         * 格式化长文字（中间省略）
         * 
         * @param {any} text 
         * @param {any} len 
         */
        this.formatLongText = function (text, len) {
            var newText = $.trim(text);
            if (newText.length) {
                var length = len || (parseInt(len) > 0 ? parseInt(len) : 5);
                if (newText.length > length*2) {
                    return '<span title="' + newText + '">' + newText.substring(0, length) + '...'+newText.substring(newText.length - length, newText.length)+'</span>';
                } else {
                    return newText;
                }
            } else {
                return '';
            }
        };
        /**
         * 删除指定数组
         *
         * @param {any} text
         */
        this.delArray = function () {
            var arrDel = function (indexList) {
                {
                    function isValidate(number) {
                        if (isNaN(number) && number > this.length) {
                            return false;
                        }
                    }

                    if (indexList instanceof Array) {
                        indexList.sort(function (x, y) {
                            if (x > y) {
                                return 1;
                            } else {
                                return -1;
                            }
                        });
                        var lastIndex = indexList[indexList.length - 1];
                        isValidate(lastIndex);
                        for (var i = 0; i < indexList.length; i++) {
                            var n = i;
                            if (n > 0) {
                                indexList[i] = indexList[i] - n;
                            }
                            this.splice(indexList[i], 1);
                            n++;
                        }
                    } else {
                        isValidate(indexList);
                        this.splice(indexList, 1);
                    }
                }
            }
            return Array.prototype.del = arrDel;
        };
        /**
         * 判断是否为IE
         */
        this.isIE = function () {
            if (!!window.ActiveXObject || "ActiveXObject" in window)
                return true;
            else
                return false;
        };
        /**
         * 判断是否为IE8
         */
        this.isIE8 = function () {
            var a = navigator.appVersion.split(";");
            //系统是32位时谷歌浏览器版本号没有';',长度为1,a[1]为undefined,replace方法报错
            if(a.length>1){
                var b = a[1].replace(/[ ]/g, "");    
            }else{
                return false;
            }
            if (navigator.appName == "Microsoft Internet Explorer" && b == "MSIE8.0")
                return true;
            else
                return false;
        };
        /**
         * 获取客户端URL
         * @param type 0:host 1:protocol+host+port 不传默认返回 protocol+host+port
         */
        this.getClientURL = function (type) {
            if (type) {
                return window.location.host;
            } else {
                return window.location.protocol + "//" + window.location.host;
            }
        };
        /**
         * 根据下标删除数组元素并返回新的数组
         */
        this.delArrayByIndex = function (array, index) {
            var temp = [];
            angular.forEach(array, function (item, i) {
                if (i != index) {
                    temp.push(item);
                }
            });
            return temp;
        };
        /**
         * 判断是否为Json
         */
        this.isJson = function (obj) {
            var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
            return isjson;
        };
        /**
         * 判断是否为Json
         */
        this.findIndexByKeyValue = function (arraytosearch, key, valuetosearch) {
            for (var i = 0; i < arraytosearch.length; i++) {
                if (arraytosearch[i][key] == valuetosearch) {
                    return i;
                }
            }
            return null;
        };
        /**
         * ie禁止删除后退
         */
        this.banBackSpace = function (e) {　　
                var ev = e || window.event; //获取event对象
                　　
                var obj = ev.target || ev.srcElement; //获取事件源
                　　
                var t = obj.type || obj.getAttribute('type'); //获取事件源类型
                　　 //获取作为判断条件的事件类型
                　　
                var vReadOnly = obj.getAttribute('readonly');　　
                var vEnabled = obj.getAttribute('enabled');　　 //处理null值情况
                　　
                vReadOnly = (vReadOnly == null) ? false : vReadOnly;　　
                vEnabled = (vEnabled == null) ? true : vEnabled;　　 //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
                　　 //并且readonly属性为true或enabled属性为false的，则退格键失效
                　　
                var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea")　　 && (vReadOnly == true || vEnabled != true)) ? true : false;　　 //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
                　　
                var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;　　 //判断
                　　
                if (flag2) {　　　　
                    return false;　　
                }　　
                if (flag1) {　　　　
                    return false;　　
                }
            };
            /**
             * 禁止点击默认事件
             */

            this.banClickDefault = function () {
                with(document.body) {
                    oncontextmenu = function () {
                        return false
                    }
                    ondragstart = function () {
                        return false
                    }
                    onselectstart = function () {
                        return false
                    }
                    onbeforecopy = function () {
                        return false
                    }
                    onselect = function () {
                        document.selection.empty()
                    }
                    oncopy = function () {
                        document.selection.empty()
                    }
                }
            };
            /**
             * 文字长度格式化
             *
             */
            this.formatTxt = function (txt, len) {
                if (!len) len = 15;
                if (txt && txt.length > len) {
                    return txt.substring(0, len) + '...';
                } else {
                    return txt;
                }
            };
            /**
             * ztree 处理节点名字过长，有checkbox
             */
            this.hideNodeC = function (treeId, treeNode) {
                var spaceWidth = 10;
                var switchObj = $("#" + treeNode.tId + "_switch"),
                    checkObj = $("#" + treeNode.tId + "_check"),
                    icoObj = $("#" + treeNode.tId + "_ico");
                switchObj.remove();
                checkObj.remove();
                icoObj.parent().before(switchObj);
                icoObj.parent().before(checkObj);

                var spantxt = $("#" + treeNode.tId + "_span").html();
                if (spantxt.length > spaceWidth) {
                    spantxt = spantxt.substring(0, spaceWidth) + "...";
                    $("#" + treeNode.tId + "_span").html(spantxt);
                }

            };
            /**
             * ztree 处理节点名字过长，无checkbox
             */
            this.hideNode = function (treeId, treeNode) {
                var spaceWidth = 10;
                var switchObj = $("#" + treeNode.tId + "_switch"),
                    icoObj = $("#" + treeNode.tId + "_ico");
                switchObj.remove();
                icoObj.parent().before(switchObj);
                var spantxt = $("#" + treeNode.tId + "_span").html();
                if (spantxt.length > spaceWidth) {
                    spantxt = spantxt.substring(0, spaceWidth) + "...";
                    $("#" + treeNode.tId + "_span").html(spantxt);
                }
            };
            /**
             * 校验正则
             */
            this.getPattern = function () {
                return {
                    digits: /^\d+$/,
                    letters: /^[a-z]+$/i, //"请填写字母"
                    date: /^\d{4}-\d{2}-\d{2}$/, //"请填写有效的日期，格式:yyyy-mm-dd"
                    time: /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, //"请填写有效的时间，00:00到23:59之间"
                    email: /^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i,// "请填写有效的邮箱"
                    url: /^(https?|s?ftp):\/\/\S+$/i, //"请填写有效的网址"
                    qq: /^[1-9]\d{4,}$/, //"请填写有效的QQ号"
                    IDcard: /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, //"请填写正确的身份证号码"
                    tel: /^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/,// "请填写有效的电话号码"
                    mobile: /^1[3-9]\d{9}$/,// "请填写有效的手机号"
                    zipcode: /^\d{6}$/,// "请检查邮政编码格式"
                    chinese: /^[\u0391-\uFFE5]+$/, //"请填写中文字符"
                    username: /^\w{3,12}$/,// "请填写3-12位数字、字母、下划线"
                    password: /^[\S]{6,16}$/, //请填写6-16位字符，不能包含空格
                    ip: /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]{0,1}|0)(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]{0,1}|0)){3}$/ //请填写有效的IP地址
                }
            };
            /**
             * 校验身份证
             */
            this.checkIdCard = function(IDCard){
                var _this = this;
                var iSum = 0;
                var info = "";
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(!reg.test(IDCard))
                    return {
                        status:false,
                        message:'你输入的身份证长度或格式错误!'
                    };
                IDCard = IDCard.replace(/x$/i,"a");
                if(_this.areaID[parseInt(IDCard.substr(0,2))] == null)
                    return {
                        status:false,
                        message:'你的身份证地区非法!'
                    };
                if(IDCard.length == 18){
                    var sBirthday = IDCard.substr(6,4) + "-" + Number(IDCard.substr(10,2)) + "-" + Number(IDCard.substr(12,2));
                    var d = new Date(sBirthday.replace(/-/g,"/"));
                    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
                        return {
                            status:false,
                            message:'身份证上的出生日期非法!'
                        };
                    for(var i = 17;i>=0;i --) 
                        iSum += (Math.pow(2,i) % 11) * parseInt(IDCard.charAt(17 - i),11);
                    if(iSum%11!=1) 
                        return {
                            status:false,
                            message:'你输入的身份证号非法!'
                        };
                }
                if(IDCard.length == 15){
                    var year =  IDCard.substring(6,8);     
                    var month = IDCard.substring(8,10);     
                    var day = IDCard.substring(10,12);     
                    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));     
                    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法     
                    if(temp_date.getYear()!=parseFloat(year)||temp_date.getMonth()!=parseFloat(month)-1||temp_date.getDate()!=parseFloat(day)){     
                        return {
                            status:false,
                            message:'身份证上的出生日期非法!'
                        };    
                    }
                }
                //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
                return {
                    status:true,
                    message:'校验成功！'
                };
            };
            /**
             * 根据身份证号获取身份证信息
             */
            this.getIDInfoByIdCard = function(idCard){
                var _this = this;
                return {
                    sex:_this.getSexByIdCard(idCard),
                    birth:_this.getBirthdayByIdCard(idCard),
                    area:_this.getAreaByIdCard(idCard),
                    age:_this.getAgeByIdCard(idCard)
                };
            };
            /**
             * 区域ID
             */
            this.areaID = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
            /**
             * 性别ID
             */
            this.sexMap = {0:"女",1:"男"};
            /**
             * 根据身份证号获取性别
             */
            this.getSexByIdCard = function(idCard){
                var _this = this;
                if (idCard.length == 15) {  
                    return _this.sexMap[idCard.substring(14, 15) % 2];  
                } else if (idCard.length == 18) {  
                    return _this.sexMap[idCard.substring(14, 17) % 2];  
                } else {  
                    //不是15或者18,null  
                    return '';  
                }
            };
            /**
             * 根据身份证号获取生日"yyyy-mm-dd"
             */
            this.getBirthdayByIdCard = function(idCard){
                var birthdayStr;  
                if(15 == idCard.length){  
                    birthdayStr = idCard.charAt(6) + idCard.charAt(7);  
                    if(parseInt(birthdayStr) < 10){
                        birthdayStr = '20' + birthdayStr;  
                    }else{  
                        birthdayStr = '19' + birthdayStr;  
                    }  
                    birthdayStr = birthdayStr + '-' + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11);  
                }else if(18 == idCard.length){  
                    birthdayStr = idCard.charAt(6) + idCard.charAt(7) + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11) + '-' + idCard.charAt(12) + idCard.charAt(13);  
                }  
                return birthdayStr;
            };
            /**
             * 根据身份证号获取出生地
             */
            this.getAreaByIdCard = function(idCard){
                return this.areaID[parseInt(idCard.substr(0, 2))];
            };
            /**
             * 根据身份证号获取年龄
             */
            this.getAgeByIdCard = function(idCard){
                var birthdayStr = this.getBirthdayByIdCard(idCard);
                var r = birthdayStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
                if(r==null) return '';  
                var d = new Date(r[1], r[3]-1, r[4]);     
                if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){   
                    var Y = new Date().getFullYear();   
                    return (Y-r[1]);   
                }else{
                    return '';
                }
            };
            /**
             * 根据身份证号获取住址
             */
            this.getAddress = function(idCard){
                return Models.PmPerson.one("resource/population").get({idcard:idCard});
            };
            /**
             *  判断手机号是否合理
             */
            this.checkPhoneNum = function (num) {
                var pattern = /^1[3|5|7|8][0-9]\d{8}$/;
                if(pattern.test(num)){
                    return {
                        status: true,
                        message: '校验成功'
                    }
                }else{
                    return {
                        status: false,
                        message: '手机号码不合法'
                    }
                }
            };
            /**
             * 判断联系方式是否合法，包括手机，固话，座机等
             * @param {string} num 输入的手机号码
             */
            this.checkContact = function (num) {
                var pattern = /^(\+\d{2})?0\d{2,3}-\d{7,8}|((\+\d{2})?(\d{2,3}-)?1[3,4,5,7,8][0-9]{9})$/;
                if(pattern.test(num)){
                    return true;
                }else{
                    return false;
                }
            }
            /**
             * 获取本机mac和Ip
             */
            this.getMacIp = function(){
                try{
                    var locator = new ActiveXObject("WbemScripting.SWbemLocator");
                    var service = locator.ConnectServer(".");
                    var properties = service.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration Where IPEnabled=TRUE");
                    var enumerator = new Enumerator(properties);
                    var item = enumerator.item();
                    return {
                        ip: item.IPAddress(0),
                        mac: item.MACAddress
                    }
                }catch(ex){
                    return {
                        ip: '',
                        mac: ''
                    }
                }
                
            };
            /**
             * 设置cookie(默认365天)
             */
            this.setCookie = function(name, value, days){
                var exp = new Date(), days = days || 365;
                exp.setTime(exp.getTime() +  days * 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";path=/";
            };
            /**
             * 获取cookie
             */
            this.getCookie = function(name){
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            };
            /**
             * 删除cookie
             */
            this.delCookie = function(name){
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = this.getCookie(name);
                if (cval != null){
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
                }
            };
            /** 
             *   获取本地操作系统版本
             */
           this.getLocalOS = function(){
                var sUserAgent = navigator.userAgent; 
                var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows"); 
                if (isWin) { 
                    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
                    if (isWinXP) 
                        return "winXP"; 
                    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1; 
                    if (isWin7) 
                        return "win7";    
                    var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
                    if (isWin10) 
                        return "win10";
                    return "其他";  
                }
           };
            /**
            * 全屏
            */
            this.fullScreen = function(){
                var element = document.documentElement;
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
           },
           /**
            * 判断是否为图片
            * @param path
            * @returns bool
            */
           this.isPicture = function(path){
                var fileReg = /(.*).(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/i;
                try{
                    return fileReg.test(path);
                }catch(e){
                    return false;
                }
           }
           /**
            * 获取上传图片的尺寸
            * @param target 元素对象
            * @returns callback : bool（是否可获取尺寸） width（宽） height（高）
            */
           this.getImgSize = function(target,callback){
                try{
                    //支持FileReader的浏览器
                    var reader = new FileReader();
                    reader.readAsDataURL(target.files[0]);
                    reader.onload = function(theFile) {
                    　　var image = new Image();
                        image.onload = function() {
                            callback(true,this.width,this.height);
                        };
                        image.src = theFile.target.result;
                    };
                }catch(e){
                    callback(false,0,0);
                }
           }
    })
})