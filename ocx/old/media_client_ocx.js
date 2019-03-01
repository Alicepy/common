/**
 * 播放/录制/刻录MKV OCX控件
 * 接口包括：
 * 1.获取USB设备列表
 * 2.初始化/释放/反初始化USB控件
 * 3.创建/销毁USB视图
 * 4.播放/关闭USB视频
 * 5.点流/关闭IPC设备
 * 6.创建MKV录制文件（1USB+2IPC），暂停录制MKV，结束录制MKV
 * 7.创建MP3录制文件（独立音频），暂停录制MP3，结束录制MP3
 * 8.点流/关闭IPC
 * 9.启动Exe程序（多媒体示证用到）
 * 10.执行shell命令（多媒体示证用到）
 * 11.检查本地文件是否存在（多媒体示证、刻录文件用到）
 * 12.刻录文件(2018-03-05 09:00版后的OCX)
 * 13.检测是否有可用盘符(2018-03-05 09:00版后的OCX)
 * @Author: binyixian
 * @Date: 2017-12-11 10:33:35
 * @Last Modified by: ranheng
 * @Last Modified time: 2018-06-15 10:28:17
 */
define(['common/utils/common_utils'], function (commonUtils) {
    window['OCX'] = {};
    var count = 0;
    var mediaOcx = {
        //显示Debugger信息框，默认不显示
        debugger: true,
        //默认参数
        defaultSetting: {
            index: 0,
            viewNo: 0,
            wndNo: 0,
            fileId: 0,
            playSourceType: 1,
            ip: window.location.hostname,
            port: '10002',
            userName: 'sysadmin',
            password: '90cfe39ede38a4deeb4f1750e8e01ba1',
            localPath: 'D:\\CMTCaseFile\\',
            streamType: '1'
        },
        /**
         * 创建OCX全局对象，以控件ID作为对象下标，退出或关闭时销毁
         * eg:
         * window['OCX']['usbOcx'] ={}
         * window['OCX']['ipcOcx'] = {}
         * window['OCX']['player'] = {}
         * @param options
         * @returns {*}
         */
        createOcx: function (options) {
            //播放源类型
            window['OCX'][options.id] = {
                //OCX TagID
                id: options.id,
                //OCX DOM对象
                object: document.getElementById(options.id),
                //数组索引
                index: ++this.defaultSetting.index,
                //视图号
                viewNo: this.defaultSetting.viewNo,
                //窗口号
                wndNo: ++this.defaultSetting.wndNo,
                //文件唯一ID
                fileId: ++this.defaultSetting.fileId,
                //播放源类型     1-播放USB（默认） 2-播放文件，3-OCX外部源
                playSourceType: options.playSourceType || 1,
                //外设IP
                ip: options.ip || window.location.host,
                //端口
                port: options.port || this.defaultSetting.port,
                //用户名
                userName: options.userName || this.defaultSetting.userName,
                //密码
                password: options.password || this.defaultSetting.password,
                //设备名称
                channelName: options.channelName || '',
                //本地路径
                localPath: options.localPath || this.defaultSetting.localPath,
                //文件名
                fileName: options.fileName || '',
                szNodeID: options.szNodeID || '',
                //码流类型
                streamType: options.streamType || this.defaultSetting.streamType,
                //状态
                status: [],
                //创建时间
                createTime: new Date().getTime()
            };
            //本地全路径
            window['OCX'][options.id].fullPath = window['OCX'][options.id].localPath + window['OCX'][options.id].fileName;
            return window['OCX'][options.id];
        },
        //销毁OCX全局对象并反初始化控件
        destroyOcx: function () {
            if (!window['OCX'])
                return;
            for (var item in window['OCX']) {
                -1 < item.indexOf('ipc') && this.xdelete(item);
                -1 < item.indexOf('usb') && this.unInitMKV(item);
            }
            window['OCX'] = [];
        },
        getDayTimeStr: function () {
            var date = new Date();
            return date.getFullYear().toString() + (10 > date.getMonth() + 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString() + (10 > date.getDate() ? '0' + date.getDate() : date.getDate()).toString() + (10 > date.getHours() ? '0' + date.getHours() : date.getHours()).toString() + (10 > date.getMinutes() ? '0' + date.getMinutes() : date.getMinutes()).toString() + (10 > date.getSeconds() ? '0' + date.getSeconds() : date.getSeconds()).toString();
        },
        getName: function (name) {
            return name + this.getDayTimeStr();  // name是本身犯人的姓名 命名有姓名加时间
        },
        /**
         * 获取已创建的OCX对象
         * @param id        OCX Element ID
         * @returns {*}
         */
        getGlobalOcx: function (id) {
            return window['OCX'] ? window['OCX'][id] : false;
        },
        /**
         * 获取Element对象
         * @param id    OCX Element ID
         */
        getOcxObject: function (id) {
            return window['OCX'][id].object;
        },
        /**
         * 更新OCX
         * @param id    父下标（OCX Element ID）
         * @param key   子下标
         * @param value 值
         * @returns {*}
         */
        updateOcxObject: function (id, key, value) {
            window['OCX'][id][key] = value;
            return window['OCX'][id];
        },
        xdelete: function () {
            var data = {'action': 'Delete', 'arguments': {}};
            this.getOcxObject(arguments[0]).GS_SysFunc(JSON.stringify(data));
            this._logout(arguments[0]);
        },
        /**
         * 检查状态码
         * 全0返回true，非0返回false
         * @param codeArr
         * @param callback
         */
        checkStatus: function (codeArr, callback) {
            if (!commonUtils.isIE() || !codeArr)
                return commonUtils.isIE();
            var pass = true;
            var errCount = 0;
            var errCode = [];
            for (var i = 0; i < codeArr.length; i++) {
                var val = codeArr[i];
                if (i === codeArr.length - 1)
                    'function' === typeof callback && callback(errCount, errCode);
                if (!val)
                    return;
                val = JSON.parse(val);
                if (0 !== val.code) {
                    errCode.push(val.code);
                    pass = false;
                    9 !== val.code && errCount++;
                }
            }
            return pass;
        },
        /**
         * 登录
         * @param ocx
         * @private
         */
        _login: function (ocx) {
            var data = "{\"action\":\"Login\",\"arguments\":{\"sIP\":\"" + ocx.ip + "\",\"nPort\":" + ocx.port + ",\"sUserName\":\"" + ocx.userName + "\",\"sPassword\":\"" + ocx.password + "\"}}";
            var ret = ocx.object.GS_SysFunc(data);
            ocx.status.push(ret);
            this.debuggerMessage(data, ret);

            data = "{\"action\":\"SetConfigParam\",\"arguments\":{\"nContinueCaptureType\":1,\"nContinueCaptureStop\":3000,\"nContinueCaptureInterval\":1000,\"bIsStartMousePTZ\":1,\"nEnableCPUWatch\":0,\"nMaxLocalRecordSize\":1024,\"nMaxLocalRecordTime\":8,\"captureSavePath\":\"C:\\GosunFiles\\Image\",\"isAccessKeyboard\":0,\"savePath\":\"C:\\GosunFiles\\VideoRecord\",\"isImmediateReplay\":\"off\",\"immediateBackSeconds\":15}}";
            ret = ocx.object.GS_SysFunc(data);
            // this.getGlobalOcx(ocx.id).status.push(ret);
            this.debuggerMessage(data, ret);

            data = "{\"action\":\"SetHttpParam\",\"arguments\":{\"szIP\":\"" + ocx.ip + "\"}}";
            ret = ocx.object.GS_SysFunc(data);
            ocx.status.push(ret);
            this.debuggerMessage(data, ret);
        },
        /**
         * 登出
         */
        _logout: function () {
            var data = "{\"action\":\"LogOut\"}";
            this.getOcxObject(arguments[0]).GS_SysFunc(data);
        },
        /**
         * 初始化videoOcx
         * @param param         配置项
         * @param callback      回调
         */
        regVideo: function (param, callback) {
            if (!commonUtils.isIE())
                return false;
            var ocx = this.createOcx(param);
            var that = this;
            var ret = {};
            ocx.object.style.display = "block";
            //注册回调
            ocx.object.RegJsFunctionCallback(function (data) {
                var usbOCX = window['OCX']['usbOcx'];
                if (!usbOCX)
                    return;
                if (0 <= ocx.id.indexOf('ipc1'))
                    that._onOcxEventProxy1(data, ocx, usbOCX.object);
                else
                    that._onOcxEventProxy2(data, ocx, usbOCX.object);
            });
            var data = "{\"action\":\"InitPara\",\"arguments\":{\"ocxID\":\"globalOcxCallback\"}}";
            ret = ocx.object.GS_SysFunc(data);
            ocx.status.push(ret);
            this.debuggerMessage(data, ret);

            this._login(ocx);

            data = "{\"arguments\":{\"ocxID\":\"" + ocx.id + "\"},\"action\":\"InitPara\"}";
            ret = ocx.object.GS_SysFunc(data);
            ocx.status.push(ret);
            this.debuggerMessage(data, ret);

            data = "{\"arguments\":{\"nDefaultSplit\":1,\"nMaxSplit\":1},\"action\":\"InitMonitorWnd\"}";
            ret = ocx.object.GS_SysFunc(data);
            ocx.status.push(ret);
            this.debuggerMessage(data, ret);

            data = "{\"arguments\":{\"showtool\":0,\"capture\":1,\"continuecapture\":1,\"localrecord\":1,\"streamtype\":1,\"srcrateplay\":1,\"digitalzoom\":1,\"alarmsend\":1,\"matrixvideo\":1,\"3doper\":1,\"matrixlinkvideo\":0,\"gotoliveview\":1,\"gotorecordview\":1,\"ar\":1,\"sound\":1,\"talk\":1,\"replay\":1},\"action\":\"SetLiveDispWndTool\"}";
            ret = ocx.object.GS_SysFunc(data);
            ocx.status.push(ret);
            this.debuggerMessage(data, ret);
            data = "{\"arguments\":{\"showmenu\":0},\"action\":\"SetLiveDispWndMenu\"}";
            ret = ocx.object.GS_SysFunc(data);
            ocx.status.push(ret);
            this.debuggerMessage(data, ret);
            return ocx;
        },
        /**
         * 初始化MKV
         * @returns {*}
         */
        initMKV: function (options) {
            var globalOcx = this.createOcx(options);
            var data = {};
            //console.log(options.id+':初始化');
            data.action = 'Init';
            data['arguments'] = {};
            var str = JSON.stringify(data);
            globalOcx.status.push(globalOcx.object.GS_SysFunc(str));
        },
        /**
         * 反初始化MKV并销毁全局OCX对象
         * @returns {*}
         */
        unInitMKV: function () {
            var data = {};
            data.action = 'UnInit';
            data['arguments'] = {};
            var str = JSON.stringify(data);
            ('string' === typeof arguments[0] ? document.getElementById(arguments[0]) : arguments[0].object).GS_SysFunc(str);
            this._logout(arguments[0]);
        },
        initStatus: function () {
            this.statusUSB = [];
        },
        /**
         * 初始化MkvOcx
         */
        regMKV: function (options, callback) {
            this.defaultSetting.viewNo++;
            var that = this;
            var globalOcx = this.getGlobalOcx(options.id) || this.createOcx(options);
            //注册回调
            globalOcx.object.GS_RegJsFunctionCallback(function (data) {
                globalOcx.status.push(that._onOcxEventProxyMkv(data, globalOcx, callback));
            });
            // this._login(globalOcx);
            //创建视图
            this.getGlobalOcx(options.id).status.push(this.createViewMKV(globalOcx));
            return globalOcx;
        },
        getVersion: function () {
            var data = {};
            data.action = 'GetOcxVersion';
            data['arguments'] = {};
            var str = JSON.stringify(data);
            var ret = this.getOcxObject(arguments[0]).GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            var versioninfo = eval('(' + ret + ')');
            var p = document.getElementById('version');
            p.innerHTML = versioninfo.version;
        },
        /**
         * 获取USB摄像头列表
         */
        getUsbCameraList: function () {
            var data = {};
            data.action = 'GetUsbCamaraList';
            data['arguments'] = {};
            var str = JSON.stringify(data);
            var ret = this.getOcxObject(arguments[0]).GS_SysFunc(str);
            var ret2 = eval('(' + ret + ')');
            this.debuggerMessage(data, ret);
            return ret2.cameralist;
        },
        /**
         * 创建视图
         * @returns {*}
         */
        createViewMKV: function () {
            var wnd = document.getElementById('wndStatus');
            var wndArr = [1, 1, 1];
            if (wnd) {
                var wndStatus = wnd.value;
                var wndCount = 0;
                wndArr = wndStatus.split('-');
                for (var i = 0; i < wndArr.length; i++) {
                    if ('1' === wndArr[i])
                        wndCount++;
                    wndArr[i] = parseInt(wndArr[i]);
                }
            }
            var data = {};
            data.action = 'CreateView';
            data['arguments'] = {};
            var onlyUSB = wndArr[0] && !wndArr[1] && !wndArr[2];
            var onlyIPC1 = !wndArr[0] && wndArr[1] && !wndArr[2];
            var onlyIPC2 = !wndArr[0] && !wndArr[1] && wndArr[2];
            data['arguments']['nViewNo'] = arguments[0].viewNo;
            data['arguments']['nWndCount'] = 2 === arguments[0].playSourceType ? wndCount : 1;
            var wndpos = [];
            var row = {};
            row.nWndNo = arguments[0].wndNo;
            row.nX = 0;
            row.nY = 0;
            row.nWidth = 1000;
            row.nHeight = 2 === arguments[0].playSourceType && !onlyUSB ? 600 : 1000;
            row.bShow = wndArr[0];
            wndpos.push(row);
            if (2 === arguments[0].playSourceType) {
                var row2 = {};
                row2.nWndNo = arguments[0].wndNo + 1;
                row2.nX = 0;
                row2.nY = onlyIPC1 ? 0 : 600;
                row2.nWidth = onlyIPC1 ? 1000 : 500;
                row2.nHeight = onlyIPC1 ? 1000 : 400;
                row2.bShow = wndArr[1];
                wndpos.push(row2);
                var row3 = {};
                row3.nWndNo = arguments[0].wndNo + 2;
                row3.nX = onlyIPC2 ? 0 : 500;
                row3.nY = onlyIPC2 ? 0 : 600;
                row3.nWidth = onlyIPC2 ? 1000 : 500;
                row3.nHeight = onlyIPC2 ? 1000 : 400;
                row3.bShow = wndArr[2];
                wndpos.push(row3);
            }
            data['arguments']['stPlayWndPos'] = wndpos;
            var str = JSON.stringify(data);
            var ret = arguments[0].object.GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            return ret;
        },
        /**
         * 销毁视图
         * @returns {*}
         */
        destoryViewMKV: function () {
			this.closeVideoUSB(arguments[0]);
            var data = {};
            data.action = 'DestroyView';
            data['arguments'] = {};
            data['arguments']['nViewNo'] = this.getGlobalOcx(arguments[0]).viewNo;
            var str = JSON.stringify(data);
            var ret = this.getOcxObject(arguments[0]).GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            this.defaultSetting.wndNo--;
            this.defaultSetting.viewNo--;
			delete window['OCX'][arguments[0]];
            return ret;
        },
        _onOcxEventProxyMkv: function (data, ocx, callback) {		//回调入口函数
            var ret = eval('(' + data + ')');
            /**
             * MKV录制完成的回调 || 实时视频中断回调
             */
            if ('MkvRecordOver' === ret.action || 'StreamInterrupt' === ret.action) {
                callback &&　callback(data, ret, ocx);
                this.debuggerMessage(data, ret);
            }
        },
        _onOcxEventProxy1: function (data, callback) {		        //回调入口函数
            var ret = eval('(' + data + ')');
            if ("CmtNetClose" === ret.action)
                console.log('已经断网');
            var retArr = {};
            if ("StopVideo" === ret.action) {
                //需要判断ocxid
                var param = "{\"arguments\":{\"nIndex\":" + ret.data.nIndex + "},\"action\":\"CloseRealVideo\"}";

                //调用mkv的视频关闭接口
                var hwnd = ret.data.hwnd;	//作为外部源的唯一标识
                var data = {};
                data.action = 'StopPlayViedo';
                data['arguments'] = {};
                data['arguments']['nViewNo'] = arguments[1].viewNo;
                data['arguments']['bRend'] = 0;
                data['arguments']['ePlaySourceType'] = 3;				//1是usb 2是文件，3是ocx外部源
                data['arguments']['eOutSideType'] = 1;				//外部源类型  1-视频监控平台
                data['arguments']['szSSRC'] = hwnd.toString();		//外部源唯一标识，必须以字符类型传入

                // this.getOcxObject(arguments[1].index).GS_SysFunc(param);
                if (ret.ocxID === arguments[1].id) {
                    data['arguments']['nWndNo'] = -1;					//外部源窗口号，虚拟窗口号，录制时用到
                    var str = JSON.stringify(data);
                    retArr = arguments[2].GS_SysFunc(str);
                    this.debuggerMessage(data, retArr);
                }

            }
            else if (ret.action == "FirstImageFrame") {
                //收到ipc的码流回调，可以开始录制视频了
            }
            else if (ret.action == "ReqVideo") {
            }
            else if (ret.action == "PreReqVideo")	//视频预请求
            {
                //这个回调是在播放视频之前给出的，这时候给mkvocx增加一个外部源，告诉mkvocx可以接收video的流了
                if (ret.code == 0) {
                    if (0 <= arguments[1].id.indexOf('ipc1') && 1 === count) {
                        return;
                    }
                    count++;
                    var hwnd = ret.data.hwnd;	//作为外部源的唯一标识
                    //调用mkv的视频打开接口
                    var data = {};
                    data.action = 'StartPlayViedo';
                    data['arguments'] = {};
                    data['arguments']['nViewNo'] = arguments[1].viewNo;
                    data['arguments']['bRend'] = 1;
                    data['arguments']['ePlaySourceType'] = 3;				//1是usb 2是文件，3是ocx外部源
                    data['arguments']['eOutSideType'] = 1;				//外部源类型  1-视频监控平台
                    data['arguments']['szSSRC'] = hwnd.toString();		//外部源唯一标识，必须以字符类型传入
                    var str = '';
                    if (ret.ocxID === arguments[1].id) {
                        data['arguments']['nWndNo'] = -1;					//外部源窗口号，虚拟窗口号，录制时用到 IPC1 -1, IPC2 -2
                        //如果先打开了文件，则这个ID与打开文件中的参数窗口列表序号一致，如果先打开视频，则打开文件时窗口序号填这个
                        str = JSON.stringify(data);
                        retArr = arguments[2].GS_SysFunc(str)
                        this.debuggerMessage(data, retArr);
                    }
                }
            }
            return retArr;
        },
        _onOcxEventProxy2: function (data) {		//回调入口函数
            var ret = eval('(' + data + ')');
            if ("CmtNetClose" === ret.action)
                console.log('已经断网');
            var retArr = {};
            if ("StopVideo" === ret.action) {
                //需要判断ocxid
                // var param = "{\"arguments\":{\"nIndex\":" + ret.data.nIndex + "},\"action\":\"CloseRealVideo\"}";

                //调用mkv的视频关闭接口
                var hwnd = ret.data.hwnd;	//作为外部源的唯一标识
                var data = {};
                data.action = 'StopPlayViedo';
                data['arguments'] = {};
                data['arguments']['nViewNo'] = arguments[1].viewNo;
                data['arguments']['bRend'] = 0;
                data['arguments']['ePlaySourceType'] = 3;				//1是usb 2是文件，3是ocx外部源
                data['arguments']['eOutSideType'] = 1;				//外部源类型  1-视频监控平台
                data['arguments']['szSSRC'] = hwnd.toString();		//外部源唯一标识，必须以字符类型传入

                // this.getOcxObject(arguments[1].index).GS_SysFunc(param);
                if (ret.ocxID === arguments[1].id) {
                    data['arguments']['nWndNo'] = -2;					//外部源窗口号，虚拟窗口号，录制时用到
                    var str = JSON.stringify(data);
                    retArr = arguments[2].GS_SysFunc(str);
                    this.debuggerMessage(data, retArr);
                }


            }
            else if (ret.action == "FirstImageFrame") {
                //收到ipc的码流回调，可以开始录制视频了
            }
            else if (ret.action == "ReqVideo") {
            }
            else if (ret.action == "PreReqVideo")	//视频预请求
            {
                //这个回调是在播放视频之前给出的，这时候给mkvocx增加一个外部源，告诉mkvocx可以接收video的流了
                if (ret.code == 0) {
                    if (0 <= arguments[1].id.indexOf('ipc1') && 1 === count) {
                        return;
                    }
                    count++;
                    var hwnd = ret.data.hwnd;	//作为外部源的唯一标识
                    //调用mkv的视频打开接口
                    var data = {};
                    data.action = 'StartPlayViedo';
                    data['arguments'] = {};
                    data['arguments']['nViewNo'] = arguments[1].viewNo;
                    data['arguments']['bRend'] = 1;
                    data['arguments']['ePlaySourceType'] = 3;				//1是usb 2是文件，3是ocx外部源
                    data['arguments']['eOutSideType'] = 1;				//外部源类型  1-视频监控平台
                    data['arguments']['szSSRC'] = hwnd.toString();		//外部源唯一标识，必须以字符类型传入
                    var str = '';
                    if (ret.ocxID === arguments[1].id) {
                        data['arguments']['nWndNo'] = -2;					//外部源窗口号，虚拟窗口号，录制时用到 IPC1 -1, IPC2 -2
                        //如果先打开了文件，则这个ID与打开文件中的参数窗口列表序号一致，如果先打开视频，则打开文件时窗口序号填这个
                        str = JSON.stringify(data);
                        retArr = arguments[2].GS_SysFunc(str);
                        this.debuggerMessage(data, retArr);
                    }
                }
            }
            return retArr;
        },
        /**
         *播放视频流
         */
        playExampleVideo: function () {
            var globalOcx = this.getGlobalOcx(arguments[0]);
            var data = "{\"arguments\":{\"szNodeID\":\"" + globalOcx.szNodeID + "\",\"nStreamType\":" + globalOcx.streamType + ",\"nIndex\":-1,\"nVideoReqType\":0,\"ability\":{\"chnAbility\":null},\"nControlType\":1},\"action\":\"PlayRealVideo\"}";
            var playRet = globalOcx.object.GS_SysFunc(data);
            this.debuggerMessage(data, playRet);
            data = "{\"arguments\":{\"channelName\":\"" + this.getGlobalOcx(arguments[0]).channelName + "\",\"stream\":1,\"controlType\":1,\"ability\":{\"chnAbility\":null},\"nIndex\":1},\"action\":\"SetWndAtturite\"}";
            var setRet = globalOcx.object.GS_SysFunc(data);
            this.debuggerMessage(data, setRet);
            return JSON.parse(playRet);
        },
        /**
         * 关闭视频流
         */
        closeExampleVideo: function () {
            var data = "{\"arguments\":{\"nIndex\":1},\"action\":\"CloseRealVideo\"}";
            var ret = this.getOcxObject(arguments[0]).GS_SysFunc(data);
            this.debuggerMessage(data, ret);
        },
        /**
         * 开始播放视频
         */
        playVideoUSB: function () {
            var ocx = this.getGlobalOcx(arguments[0]);
            var data = {};
            data.action = 'StartPlayViedo';
            data['arguments'] = {};
            data['arguments']['nViewNo'] = ocx.viewNo;
            data['arguments']['nWndNo'] = ocx.wndNo;
            data['arguments']['bRend'] = 1;
            data['arguments']['ePlaySourceType'] = ocx.playSourceType; //1是usb（默认） 2是文件，3是ocx外部源

            if (1 === ocx.playSourceType) {
                data['arguments']['szCameraName'] = ocx.cameraName;		//USB时需填
                data['arguments']['nFrameRate'] = 10;					            //USB时需填,帧率
                data['arguments']['nScale'] = 0.5;						            //USB时需填,编码缩放倍数
            }
            else if (2 === ocx.playSourceType) {
                data['arguments']['eFileType'] = 1;                                 //1是MKV文件,文件播放时必填
                data['arguments']['szFilePath'] = ocx.fullPath;	        //文件路径，文件播放时必填
            }
            else {

            }
            var str = JSON.stringify(data);
            var ret = ocx.object.GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            return ret;
        },
         /**
         * 结束播放视频 ----播放源MKV
         */
        stopPlay:function(){
            var ocx = this.getGlobalOcx(arguments[0]);
            var data = {};
            data.action = 'StopPlayViedo';
            data['arguments'] = {};
            data['arguments']['nViewNo'] = ocx.viewNo;
            data['arguments']['nWndNo'] = ocx.wndNo;
            data['arguments']['bRend'] = 0;
            data['arguments']['ePlaySourceType'] = 2;			
             var str = JSON.stringify(data);
            var ret = ocx.object.GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            return ret;
        },
        /**
         * 关闭USB摄像头设备
         */
        closeVideoUSB: function () {
            var ocx = this.getGlobalOcx(arguments[0]);
            var data = {};
            data.action = 'StopPlayViedo';
            data['arguments'] = {};
            data['arguments']['nViewNo'] = ocx.viewNo;
            data['arguments']['nWndNo'] = ocx.wndNo;
            data['arguments']['bRend'] = 0;
            data['arguments']['ePlaySourceType'] = 1;				//1是usb 2是文件，3是ocx外部源

            var str = JSON.stringify(data);
            var ret = ocx.object.GS_SysFunc(str);
            this.initStatus();
            return ret;
        },
        /**
         * 开始录制视频
         */
        startRecord: function () {
            //文件名
            // alert(JSON.stringify(arguments))
            var fileName = this.getName(arguments[3]);
            this.getGlobalOcx(arguments[0]).fileId++;
            this.getGlobalOcx(arguments[0])['fileName'] = fileName;
            this.getGlobalOcx(arguments[0])['fullPath'] = this.getGlobalOcx(arguments[0])['localPath'] + fileName;
            var ocx = this.getGlobalOcx(arguments[0]);
            var data = {};
            data.action = 'OpenMkvFile';
            data['arguments'] = {};
            data['arguments']['nFileID'] = ocx.fileId;	//文件ID，外部确定唯一标识
            data['arguments']['nViewNo'] = ocx.viewNo;	//录制窗口所属视图号
            var wndCount = 0;
            arguments[1].usb && (wndCount += 2);
            arguments[1].ipc1 && wndCount++;
            arguments[1].ipc2 && wndCount++;
            data['arguments']['nWndCount'] = wndCount;	//录制窗口个数
            var wndpos = [];
            arguments[1].usb && wndpos.push(ocx.wndNo);	//录制监控视频,usb播放窗口号为1。
            arguments[1].usb && wndpos.push(0);         //0 独立音频号
            arguments[1].ipc1 && wndpos.push(-1);		//外部源1的窗口号上面设置为-1了
            //如果先打开了文件，则这个ID与打开文件中的参数窗口列表序号一致，如果先打开视频，则打开文件时窗口序号填这个
            arguments[1].ipc2 && wndpos.push(-2);		//外部源2的窗口号上面设置为-2了
            data['arguments']['nWndNoList'] = wndpos;	//录制窗口列表
            data['arguments']['szFilePath'] = this.getGlobalOcx(ocx.id).fullPath + ".mkv";	//录制存放文件
            data['arguments']['nSize'] = 3072;	//MB,录制文件大小限制，0为无效

            var str = JSON.stringify(data);
            var ret = this.getOcxObject(ocx.id).GS_SysFunc(str);
            var retJSON = JSON.parse(ret);
            this.debuggerMessage(data, ret);
            angular.isFunction(arguments[2]) && arguments[2](retJSON);
            return ret;
        },
        /**
         * 暂停录制视频
         */
        pauseRecord: function () {
            var data = {};
            data.action = 'PauseMkvFile';
            data['arguments'] = {};
            data['arguments']['nFileID'] = this.getGlobalOcx(arguments[0]).fileId;	//文件ID，外部确定唯一标识
            var str = JSON.stringify(data);
            var ret = this.getOcxObject(arguments[0]).GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            return ret;
        }
        ,
        /**
         * 停止录制视频
         */
        stopRecord: function () {
            var data = {};
            data.action = 'CloseMkvFile';
            data['arguments'] = {};
            data['arguments']['nFileID'] = this.getGlobalOcx(arguments[0]).fileId;	//文件ID，外部确定唯一标识
            var str = JSON.stringify(data);
            var ret = this.getOcxObject(arguments[0]).GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            return ret;
        }
        ,
        /**
         * 开始录制音频
         */
        startRecordAudio: function () {
            var ocx = this.getGlobalOcx(arguments[0]);
            var data = {};
            data.action = 'StratRecordAudio';
            data['arguments'] = {};
            data['arguments']['szFilePath'] = ocx.fullPath + ".mp3";	//录制存放文件
            data['arguments']['nSize'] = 3072;	//MB,录制文件大小限制，0为无效
            var str = JSON.stringify(data);
            var ret = this.getOcxObject(ocx.id).GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            return ret;
        }
        ,
        /**
         * 暂停录制音频
         */
        pauseRecordAudio: function () {
            var data = {};
            data.action = 'PauseRecordAudio';
            data['arguments'] = {};

            var str = JSON.stringify(data);
            var ret = this.getOcxObject(arguments[0]).GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            return ret;
        }
        ,
        /**
         * 停止录制音频
         */
        stopRecordAudio: function () {
            var data = {};
            data.action = 'StopRecordAudio';
            data['arguments'] = {};
            var str = JSON.stringify(data);
            var ret = this.getOcxObject(arguments[0]).GS_SysFunc(str);
            this.debuggerMessage(data, ret);
            return ret;
        },
        /**
         *
         * @param action
         * @param result
         */
        debuggerMessage: function (action, result) {
            if (!mediaOcx.debugger)
                return;
            try {
                var debugEle = document.getElementById('debugger-list');
                action = 'string' === typeof action ? JSON.parse(action) : action;
                result = 'string' === typeof result ? JSON.parse(result) : action;
                if (!debugEle)
                    debugEle = document.createElement('div');
                var message = {Action: action, Result: result};
                var node = document.createElement('li');
                node.className = (0 === message.Result.code ? 'success' : 'error');
                var actionNode = document.createElement('span');
                actionNode.className = 'fa fa-share';
                actionNode.innerHTML = '【Action】' + message.Action.action + '<br>【ActionStringify】 ' + JSON.stringify(action);
                var resultNode = document.createElement('span');
                resultNode.className = 'fa fa-reply';
                resultNode.innerHTML = '【Result】 ' + (0 === message.Result.code ? 'Success' : 'Error, ErrCode:' + result.code) + '<br>【ResultStringify】 ' + JSON.stringify(result);
                node.appendChild(actionNode);
                node.appendChild(resultNode);
                debugEle.appendChild(node);
                // document.body.appendChild(debugEle);
            }
            catch (ex) {
            }

        },
        /**
         * 启动Exe（目前用于打开示证程序）
         * @param ocxId       OCXID
         * @param path      Exe路径
         * @param show      新进程是否显示（暂未实现）
         * @returns {*}     返回公共JSON
         */
        runExe: function (ocxId, path, show) {
            if (!path)
                return false;
            var data = {
                action: 'RunExe',
                arguments: {
                    szExePath: path,
                    szParam: '',
                    bShow: show || 1
                }
            };
            return JSON.parse(document.getElementById(ocxId).GS_SysFunc(JSON.stringify(data)) || '{}');
        },
        /**
         * 执行shell命令
         * @param ocxId     OCXID
         * @param shellCmd  CMD命令，可以是绝对路径，要加双引号，如："C:\\Users\\B.Jayden\\Desktop\\审讯一体机迭代一问题及风险点.doc"
         * @returns {*}
         */
        shellCmd: function (ocxId, shellCmd) {
            var data = {};
            data.action = 'ShellCmd';
            data['arguments'] = {};
            data['arguments']['szCmd'] = shellCmd;
            return JSON.parse(document.getElementById(ocxId).GS_SysFunc(JSON.stringify(data)) || '{}');
        },
        /**
         * 检查本地文件是否存在
         * @param ocxId     OCXID
         * @param filePath  本地文件绝对路径，如：C:\\Users\\B.Jayden\\Desktop\\审讯一体机迭代一问题及风险点.doc
         * @returns {*}
         */
        isFileExist: function (ocxId, filePath) {
            if (!filePath)
                return false;
            var data = {
                action: 'IsFileExist',
                arguments: {
                    szFilePath: filePath
                }
            };
            return JSON.parse(document.getElementById(ocxId).GS_SysFunc(JSON.stringify(data)) || '{}');
        },
        /**
         * 刻录文件
         * @param param 参数
         * eg:
         * param = {
         * title: 'Test1',
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
         *
         * 【同步返回】【JSON String】
         * 【说明】该返回为接口调用的返回，接下来还有异步返回
         * {
         * "action":"BurnFile"
         * 	"code":	0,                      //0表示成功，非零表示失败
         * 	"resultMessage":	"成功"      //描述信息
         * }
         *
         * 【异步返回】【JSON String】
         * 【说明】该返回为刻录接口的异步返回，因为刻录过程中可能还要下载文件。下载成功后即开始刻录。如果下载文件失败则返回[100021,下载失败]
         * {
         * "code":	0,                        //0表示成功，非零表示失败
         * "action":	"BrunFileNotify",     //刻录文件下载结果异步返回
         * "resultMessage":	"成功"            //描述信息
         * }
         * @returns {*}
         */
        startBurn: function (param) {
            var data = {
                action: 'BurnFile',
                nConnectTimeout: 3,     //连接超时时间，0表示一直等待，大于0表示等待的秒数
                nDownloadTimeout: 10,   //下载超时时间，0表示一直等待，大于0表示等待的秒数
                param: []
            };
            var disk = {};
            disk.title = param.title || '';                     //标题
            disk.filePath = param.filePath;                     //要刻录的本地文件路径
            param.downloadLink && (disk.downloadLink = param.downloadLink);             //要下载的文件URL
            data.param.push(disk);
            var str = JSON.stringify(data);
            var ret = this.burn.BurnManager(str);
            return ret;
        }
    };
    return mediaOcx;
});