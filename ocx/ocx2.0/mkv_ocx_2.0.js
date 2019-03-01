/**
 * mkv ocx
 * @Author: zhangxuelian 
 * @Date: 2018-01-07 22:53:08 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-01-10 14:06:26
 * 依赖peripheral_ocx_2.0.js初始化与释放
 **/
define(['jquery','common/utils/common_utils'], function ($,commonUtils) {
    
        var playOcx = {
            /**
             * 获取版本信息
             */
            getVersion:function(ocxObj){
                if(!commonUtils.isIE()) return;
                var jsonParam = {
                    action : 'GetOcxVersion',
                    arguments : {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            },
            /**
             * 获取设备列表
             */
            getUsbCamaraList:function(ocxObj){
                if(!commonUtils.isIE()) return;
                var jsonParam = {
                    action : 'GetUsbCamaraList',
                    arguments : {}
                };
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            },
            /**
             * 创建mkv视图
             */
            creatViewMKV:function(ocxObj,params){
                if(!commonUtils.isIE()) return;
                var defaultParams = {
                    nViewNo : 1,
                    nWndCount : 1,
                    stPlayWndPos : [{//可设置多个窗口对象
                        nWndNo : 1,//窗口编号
                        nX : 0,//左上角开始坐标X
                        nY : 0,//左上角开始坐标Y
                        nWidth : 1000,//千分比 1000相当于100%
                        nHeight : 1000,//千分比
                        bShow : 0//0:不显示 1:显示
                    }]
                }
                var jsonParam = {
                    action : 'CreateView'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            },
            /**
             * 开始播放usb视频
             */
            startPlayViedo:function(ocxObj,params){
                if(!commonUtils.isIE()) return;
                var defaultParams = {
                    nViewNo : 1,//视图号
                    nWndNo : 1,//视频播放的窗口号（当播放了外部源时，此值需填写负值）
                    bRend : 1,//是否初始化渲染显示，默认为1
                    ePlaySourceType : 1,//1是usb 2是文件，3是ocx外部源
                    szCameraName : '',//摄像头名称，ePlaySourceType为1时必填
                    nFrameRate : 10,//Usb摄像头视频帧率，ePlaySourceType为1时必填
                    nScale : 0.5,//USB时需填,编码缩放倍数
                    eFileType : 1,//1是MKV文件,文件播放时必填 文件类型（0-未知，1-mkv），ePlaySourceType为2时必填
                    szFilePath : "",//文件路径格式:"D:/MyMkvFile.mkv"，文件播放时必填
                    eOutSideType : "",//外部源类型（0-未知，1-视频监控平台）, ePlaySourceType为3时必填
                    szSSRC : ""//外部源唯一标志, ePlaySourceType为3时必填,当外部源为视频监控时，此值为播放窗口句柄
                }
                var jsonParam = {
                    action : 'StartPlayViedo'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            },
            /**
             * 抓图
             */
            capture:function(ocxObj,params){
                if(!commonUtils.isIE()) return;
                var defaultParams = {
                    nViewNo : 1,//视图号，由外部传入，外部需保证唯一
                    nWndNo : 1,//要关闭正在播放的视频窗口号
                    szFilePath : "",//图片文件绝对路径，可自己设置，可不设，默认C:\\MkvImage
                    bNeedBase64 : 1//是否需要返回base64编码
                }
                var jsonParam = {
                    action : 'Capture'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            },
            /**
             * 停止播放usb视频
             */
            stopPlayViedo:function(ocxObj,params){
                if(!commonUtils.isIE()) return;
                var defaultParams = {
                    nViewNo : 1,
                    nWndNo : 1,
                    bRend : 0,
                    ePlaySourceType : 1//1是usb 2是文件，3是ocx外部源
                }
                var jsonParam = {
                    action : 'StopPlayViedo'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            },
            /**
             * 销毁mkv视图
             */
            destoryViewMKV:function(ocxObj,params){
                if(!commonUtils.isIE()) return;
                var defaultParams = {
                    nViewNo : 1
                }
                var jsonParam = {
                    action : 'DestroyView'
                };
                jsonParam.arguments = $.extend(defaultParams,params || {});
                var ret = ocxObj.GS_SysFunc(JSON.stringify(jsonParam));
                return JSON.parse(ret);
            }
        }
    
        return playOcx;
    });