define(['common/security/retryQueue', 'common/security/login/login2'], function() {
    angular.module('security.service', [
        // 'security.retryQueue',    // Keeps track of failed requests that need to be retried once the user logs in
        // 'security.login'         // Contains the login form template and controller
    ])
    .factory('security', function($http, $q, $location, securityRetryQueue, $modal, $couchPotato, subject, authenticationResponseParser, 
        static_project_url,constant_login_url, constant_sso_enable, Models,constant_pseudo_login_url,constant_logout_url) {

        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }

        // Login form dialog stuff
        // var loginDialog = null;

        // function openLoginDialog() {
        //     if(loginDialog) {
        //         throw new Error('Trying to open a dialog that is already open!');
        //     }
        //     loginDialog = $modal.open({
        //         templateUrl: 'common/security/login/form.tpl.html',
        //         controller: 'LoginFormController',
        //         size: 'lg',
        //         resolve: {
        //             dummy: $couchPotato.resolveDependencies(['common/security/login/LoginFormController.js'])
        //         }
        //     });
        //     loginDialog.result.then(onLoginDialogClose);
        // }

        // function openSSOLoginDialog() {
        //     if(loginDialog) {
        //         throw new Error('Trying to open a dialog that is already open!');
        //     }
        //     loginDialog = $modal.open({
        //         templateUrl: 'common/security/sso/sso_login.tpl.html',
        //         controller: 'SSOLoginController',
        //         size: 'lg',
        //         resolve: {
        //             dummy: $couchPotato.resolveDependencies(['common/security/sso/sso_login.ctrl.js'])
        //         }
        //     });
        //     loginDialog.result.then(onLoginDialogClose);
        // }

        // function closeLoginDialog(success) {
        //     if(loginDialog) {
        //         loginDialog.close(success);
        //     }
        // }

        // function onLoginDialogClose(success) {
        //     loginDialog = null;
        //     if(success) {
        //         securityRetryQueue.retryAll();
        //     } else {
        //         securityRetryQueue.cancelAll();
        //         //redirect();
        //     }
        // }

        // Register a handler for when an item is added to the retry queue
        // securityRetryQueue.onItemAddedCallbacks.push(function(retryItem) {
        //     if(securityRetryQueue.hasMore()) {
        //         if(retryItem.reason == 'unauthenticated-client') {
        //             // todo 区分单点登录和本地登录
        //             if(constant_sso_enable) {
        //                 window.location.href = '../ssoclient/login?return_url=' + encodeURIComponent($location.absUrl());
        //             } else {
        //                 // window.location.href = '../view/login.html';
        //                 var href = window.location.href;
        //                 if(href.indexOf("interrogate") != -1){
        //                     $location.path("/login_interrogate");
        //                 }else{
        //                     $location.path("/login");
        //                 }
        //             }
        //         } else if(retryItem.reason == 'unauthorized-server') {
        //             if(constant_sso_enable) {
        //                 service.showSSOLogin();
        //             } else {
        //                 service.showLogin();
        //             }
        //         }
        //     }
        // });
        // // The public API of the service
        // var service = {
        //     // Get the first reason for needing a login
        //     getLoginReason: function() {
        //         return securityRetryQueue.retryReason();
        //     },
        //     // Show the modal login dialog
        //     showLogin: function() {
        //         openLoginDialog();
        //     },
        //     showSSOLogin: function() {
        //         openSSOLoginDialog();
        //     },
        //     // Attempt to authenticate a user by the given email and password
        //     login: function(account, password) {
        //         var loginUser = {
        //             "account": account,
        //             "password": password
        //         }
        //         var request = $http.post(constant_login_url, loginUser);
        //         return request.then(function(response) {
        //             var data = response.data;
        //             return service.handleUserData(data);
        //         });
        //     },
        //     //pseudoLogin
        //     pseudoLogin: function(timestamp){
        //         var request = $http.get(constant_pseudo_login_url+"/"+timestamp);
        //         return request.then(function(response) {
        //             var data = response.data;
        //             return service.handleUserData(data);
        //         });
        //     },
        //     successLogin: function() {
        //         closeLoginDialog(true);
        //         //redirect();
        //     },
        //     cancelLogin: function() {
        //         closeLoginDialog(false);
        //         //redirect();
        //     },
        //     // Logout the current user and redirect
        //     logout: function(redirectTo) {
        //         if(constant_sso_enable) {
        //             window.location.href = '../ssoclient/logout?return_url=' + encodeURIComponent($location.absUrl());
        //         } else {
        //             $http.post(constant_logout_url).then(function() {
        //                 service.currentUser = null;
        //                 var href = window.location.href;
        //                 if(href.indexOf("interrogate") != -1){
        //                     $location.path("/login_interrogate");
        //                 }else{
        //                     $location.path("/login");
        //                 }
        //             }, function() {
        //                 service.currentUser = null;
        //                 var href = window.location.href;
        //                 if(href.indexOf("interrogate") != -1){
        //                     $location.path("/login_interrogate");
        //                 }else{
        //                     $location.path("/login");
        //                 }
        //             });
        //         }
        //     },
        //     // Ask the backend to see if a user is already authenticated - this may be from a previous session.
        //     requestCurrentUser: function() {
        //         if(service.isAuthenticated()) {
        //             return $q.when(service.currentUser);
        //         } else {
        //             var loginUser = {
        //                 "account": "admin",
        //                 "password": "admin"
        //             }
        //             var request = $http.post(constant_login_url, {});
        //             return request.then(function(response) {
        //                 var data = response.data;
        //                 return service.handleUserData(data);
        //             });
        //         }
        //     },
        //     // handle user request respond
        //     handleUserData: function(data) {
        //         if(data.state.code === 200) {
        //             data = data.data;
        //             if(data && data.menus && data.roleList) {
        //                 //var result = { info: { authz: { roles: data.func, permissions: data.func }, authc: { principal: { id: data.user.id, user: data.user }, credentials: data.user } }, success: true };
        //                 var result = {
        //                     info: {
        //                         authz: {
        //                             roles: data.roleList,
        //                             permissions: data.permissions || []
        //                         },
        //                         authc: {
        //                             principal: {
        //                                 id: data.id,
        //                                 user: data
        //                             },
        //                             credentials: data
        //                         }
        //                     },
        //                     success: true
        //                 };
        //                 var infos = authenticationResponseParser.parse(result);
        //                 subject.authenticationInfo = infos.authc;
        //                 subject.authorizer.setAuthorizationInfo(infos.authz);
        //                 subject.authenticated = true;
        //                 subject.currentMenu = data.menus;
        //                 subject.magicId = data.magicId;
        //                 subject.account = data.account;
        //                 subject.userName = data.userName;
        //                 subject.headImg = data.headImg;
        //                 subject.permissions = data.permissions;
        //                 subject.currentCaseCenter = data.centerMagicId;
        //                 subject.currentCenterCode = data.centerCode;
        //                 subject.userCode = data.userCode;
        //                 subject.currentOrgInfo = {
        //                     organizeCode: data.organizeCode,
        //                     organizeMagicId: data.organizeMagicId,
        //                     organizeName: data.organizeName
        //                 };
        //                 subject.orgs = data.orgs;
        //                 service.currentUser = subject.authenticationInfo.principal;
        //                 closeLoginDialog(true);
        //                 data = result;
        //             }
        //             //获取字典
        //             Models.Dictionary.one('dicmap').post().then(function(ret) {
        //                 if(ret.state.code == 200 && ret.data) {
        //                     subject.dicType = ret.data.dicType;//字典类型
        //                     subject.orgInfo = ret.data.orgInfo;//机构
        //                     subject.centerNameMap = ret.data.centerNameMap;//办案区
        //                     subject.policeTypeInfo = ret.data.policeTypeInfo;//角色类型
        //                     subject.userInfo = ret.data.userInfo;//用户
        //                     subject.evalLink = ret.data.evalLink;//考评环节
        //                     subject.pointsWay = ret.data.pointsWay;//扣分方式
        //                     subject.videoAppr = ret.data.videoAppr;///视频...
        //                     subject.archiveState = ret.data.archiveState;//案卷状态
        //                     subject.beforeMaterialCategory = ret.data.beforeMaterialCategory;//案前材料类型
        //                     subject.criminalMaterialCategory = ret.data.criminalMaterialCategory;//案卷刑事材料类型
        //                     subject.govMaterialCategory = ret.data.govMaterialCategory;//案卷行政材料类型
        //                     subject.archivingAlertType = ret.data.archivingAlertType;//材料...
        //                     subject.videType = ret.data.videoType;//视频类型 todo
        //                     subject.enterType = ret.data.enterType;//进区原由
        //                     subject.caseReason = ret.data.caseReason;//涉案案由
        //                     subject.lawsuitReason = ret.data.lawsuitReason;//诉讼原因
        //                     subject.lawsuitResult = ret.data.lawsuitResult;//诉讼结果
        //                     subject.roomType = ret.data.roomType;//功能室类型
        //                     subject.collectionType = ret.data.collectionType;//信息采集类型
        //                     var allLeaveReason = {};
        //                     allLeaveReason = $.extend(allLeaveReason, ret.data.leaveReason);
        //                     allLeaveReason = $.extend(allLeaveReason, ret.data.tempLeaveReason);
        //                     subject.leaveReasonAll = allLeaveReason;//离区原由（离开+临时离开）
        //                     subject.leaveReason = ret.data.leaveReason;//离区原由
        //                     subject.tempLeaveReason = ret.data.tempLeaveReason;//临时带出原由
        //                     subject.lawReconsiderationReason = ret.data.lawReconsiderationReason;//行政复议原由
        //                     subject.category = ret.data.category;//案别、案由
        //                     subject.lawOfficialType = ret.data.lawOfficialType;//文书类型
        //                     subject.reportMandatoryOrgCode = ret.data.reportMandatoryOrgCode;
        //                     subject.personTypeMap = ret.data.personTypeMap;//人员类型
        //                     subject.prisonType = ret.data.prisonType;//监所类型
        //                 }
        //             });
        //             //获取用户管辖机构
        //             subject.ruleOrgData = [];//用户管辖机构源数据
        //             subject.ruleOrgCombox = [];//用户管辖机构用于common-select的源数据
        //             Models.Organize.one("user/"+subject.magicId).get().then(function(ret){
        //                 if(ret.state.code == 200 && ret.data) {
        //                     subject.ruleOrgData = ret.data;
        //                     var tempData = [];
        //                     angular.forEach(ret.data,function(item,i){
        //                         var temp = {};
        //                         temp.value = item.magicId;
        //                         temp.label = item.organizeName;
        //                         temp.code = item.organizeCode;
        //                         tempData.push(temp);
        //                     });
        //                     subject.ruleOrgCombox = tempData;
        //                 }
        //             });
        //             //获取当前用户的管辖用户
        //             subject.ruleUserData = [];//当前用户的管辖用户源数据
        //             subject.ruleUserCombox = [];//当前用户的管辖用户用于common-select的源数据
        //             Models.User.one("combox").get().then(function(ret){
        //                 if(ret.state.code == 200 && ret.data) {
        //                     subject.ruleUserData = ret.data;
        //                     var tempData = [];
        //                     angular.forEach(ret.data,function(item,i){
        //                         var temp = {};
        //                         temp.value = item.magicId;
        //                         temp.label = item.userName;
        //                         temp.code = item.userCode;
        //                         tempData.push(temp);
        //                     })
        //                     subject.ruleUserCombox = tempData;
        //                 }
        //             });
        //             //获取所有用户
        //             subject.allUserData = [];//所有用户源数据
        //             subject.allUserCombox = [];//所有用户用于common-select的源数据
        //             Models.User.one("all/user").get().then(function(ret){
        //                 if(ret.state.code == 200 && ret.data) {
        //                     subject.allUserData = ret.data;
        //                     var tempData = [];
        //                     angular.forEach(ret.data,function(item,i){
        //                         var temp = {};
        //                         temp.value = item.magicId;
        //                         temp.label = item.userName;
        //                         temp.code = item.userCode;
        //                         tempData.push(temp);
        //                     })
        //                     subject.allUserCombox = tempData;
        //                 }
        //             });
        //             // 获取用户办案区翻译对象
        //             subject.ruleCenterCombox = []; //当前用户的可用办案区用于common-select的源数据
        //             Models.User.one('centers/'+subject.magicId).get().then(function(ret){
        //                 if(ret.state.code == 200 && ret.data) {
        //                     var tempCaseCenter = {};
        //                     var tempData = [];
        //                     angular.forEach(ret.data,function(item,i){
        //                     	tempCaseCenter[ret.data[i].magicId] = ret.data[i].centerName;
        //                         var temp = {};
        //                         temp.value = item.magicId;
        //                         temp.label = item.centerName;
        //                         temp.code = item.centerCode;
        //                         tempData.push(temp);
        //                     })
        //                     subject.caseCenterDic = tempCaseCenter;
        //                     subject.ruleCenterCombox = tempData;
        //                 }
        //             })
        //             //获取是否为预审员
        //             Models.Appraisal.one('error/is/pretrial').get().then(function (ret) {
        //                 if (ret.state.code == 200) {
        //                     subject.pretrial = ret.data;
        //                 }
        //             })
        //         } else {
        //             return data;
        //         }
        //         return data;
        //     },
        //     // Information about the current user
        //     currentUser: null,
        //     // Is the current user authenticated?
        //     isAuthenticated: function() {
        //         return !!service.currentUser;
        //     },
        //     // Is the current user an adminstrator?
        //     isAdmin: function() {
        //         return !!(service.currentUser && service.currentUser.admin);
        //     }
        // };
        // return service;
    });
});
