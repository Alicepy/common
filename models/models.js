/**
 * models
 * @Author: zhangxuelian
 * @Date: 2017-10-11 10:33:05
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-09-25 16:21:19
 **/
define(['restangular'], function () {
    var module = angular.module('models', ['restangular','constants']);

    module.factory('Models', function(Restangular,constant_models_url) {
        var  rest = Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(constant_models_url);
            RestangularConfigurer.setDefaultHeaders(
                {
                    'Access-Control-Allow-origin' : '*',
                    'Access-Control-Allow-Headers' : 'X-Requested-With',
                    'Access-Control-Allow-Methods' : 'GET',
                    'X-Requested-With' : 'XMLHttpRequest',
                    'If-Modified-Since':'0',
                    'Cache-Control':'no-cache'
                }
            );
        });

        /**
         * 公共模块
         */
        rest.File = rest.all('common/file');//指纹图片上传
        rest.ImgUploader = rest.all('image/upload');//图片上传
        rest.ImgSaveSize = rest.all('image/savesize');//保存图片像素大小
        rest.ImgSizeSave = rest.all('size_images');//保存图片像素大小
        rest.ImgDelfiles = rest.all('image/deletefiles');//删除图片
        rest.Attachments = rest.all('common/attachments');//系统附件
        rest.ImgDelAll = rest.all('materials/batch');//批量删除材料
        /**
         * 系统管理模块
         */
        rest.Group = rest.all('system/desktop/group');//菜单分组
        rest.Groups = rest.all('system/desktop/groups');
        rest.Link = rest.all('system/desktop/link');//快捷菜单
        rest.Links = rest.all('system/desktop/links');
        rest.Organize = rest.all('system/organize');//组织机构
        rest.Role = rest.all('system/role');//角色
        rest.Menu = rest.all('system/menu');//菜单
        rest.Func = rest.all('system/function');//菜单功能
        rest.User = rest.all('system/user');//用户
        rest.Archives = rest.all('system/archives');//案件考评
        rest.Finger = rest.all('system/finger');//指纹识别
        rest.UserSignatureInfo = rest.all("system/userSignatureInfo");//指纹
        rest.GatingConfig = rest.all('system/gating');//门禁配置
        rest.AppConfig = rest.all('system/config/app');//人脸app版本
        rest.Machine = rest.all('system/machine');//采集室配置
        rest.CaseMonitor = rest.all('system/backgroundconfig'); //办案区监控配置
        rest.CaseCamera = rest.all('system/backgroundpostion'); //查询某个机构可配置的摄像头列表
        rest.DelayConfig = rest.all('system/delay/config');//到期预警配置
        rest.RoomDevice = rest.all('system/roomdevice');//摄像机配置
        rest.Map = rest.all('system/map/point/info'); //地图信息
        rest.Center = rest.all('system/center'); //办案中心管理
        rest.DriversVersion = rest.all('system/drivers/version'); //安装包版本管理
        rest.Bracelet = rest.all('bracelet');   //手环
        rest.BraceletTag = rest.all('bracelet/tag'); 
        rest.BraceletSendRecord = rest.all('bracelet/send/record');   
        /**
         * 系统配置模块
         */
        rest.Dictionary = rest.all('config/dic');//字典
        rest.DicType = rest.all('config/dtype');//字典类型
        rest.Smark = rest.all('config/box');//柜子配置
        rest.Node = rest.all('config/node');//环节配置
        rest.IDCard = rest.all('idcard');//身份证查询
        rest.Room = rest.all('config/room');//功能室配置
        rest.Ipc = rest.all('config/ipc');//ipc配置
        rest.Machine1 = rest.all('config/machine');//采集器配置
        /**
         * 材料管理
         */
        rest.Archives = rest.all('archives');//卷宗模块
        rest.Materials = rest.all('materials');//材料模块
        rest.Before = rest.all('before');//案前模块
        rest.Appraisal = rest.all('appraisal');//审核模块

        /**
         * 案件管理模块
         */
        rest.Smart = rest.all('smart');//开柜
        rest.Mandatory = rest.all('controls/mandatory');//强制措施

        /**
         * 考评抽查
         */
        rest.Appraisal = rest.all('appraisal');
        rest.Supervise = rest.all('controls');//警情监督
        /**
         * 数据分析模块
         */
        rest.Report = rest.all('report');

        /**
         * 审讯一体系统配置模块
         */
        rest.Records = rest.all('records');
        rest.InterConfig = rest.all("system/terminal");
        rest.roomConfig = rest.all("config/room");
        rest.roomConfigMock = rest.all("mocks/config/room");
        rest.Online = rest.all("im/openfire");
        rest.Ofuser = rest.all("im/ofuser");
        rest.Encryption = rest.all("encryption");
        /**
         * 人员管理模块
         */
        rest.Pmcontrols = rest.all('pmcontrols');
        rest.GoodPosition = rest.all('position/goods');
        rest.PersonPosition = rest.all('position/person');
        rest.BoxUsed = rest.all('pmcontrols/boxused');
        rest.PmMonitor = rest.all('pmcontrols/caseareamonitor');
        rest.PmCase = rest.all('pmcontrols/case');
        rest.PmFace = rest.all('pmcontrols/face');
        rest.PmPerson = rest.all('pmcontrols/person');
        rest.PersonCollection = rest.all('pmcontrols/collection');
        rest.PmGoods = rest.all('pmcontrols/goods');
        rest.PmPersonInout = rest.all('pmcontrols/person/inout');
        rest.PmLeaveRequest = rest.all('pmcontrols/leave/request');

        /**
         * 办案中心
         */
        rest.PublicArea = rest.all("position/public/area");//公共区域
        rest.Faceapi = rest.all('faceapi');//人脸
        rest.Alarm = rest.all('alarm');//智能预警处理
        rest.Thirdapi = rest.all("thirdapi"); // 办案区工作台登记页面中的人员编号
        rest.Pfv = rest.all('system/record/pfv');
        /**
         * 国迈执法音视频
         */
        rest.Gmvcs = rest.all('gmvcs');
        
        /**
         * 数据统计
         */
        rest.Statistics = rest.all('statistics')
        rest.Statistics.Alarm = rest.all('statistics/alarm');//警情监督
        rest.Pmcontrols.Statistics = rest.all('pmcontrols/statistics');//办案中心
        rest.Statistics.ArchiveCenter = rest.all('statistics/archivecenter');//案管中心
        rest.Statistics.Appraisal = rest.all('statistics/appraisal');//执法考评
        rest.Statistics.Mandatory = rest.all('statistics/mandatory');//强制措施
        rest.Statistics.Mediation = rest.all('statistics/mediation');//治安调解
        return rest;
    });
});
