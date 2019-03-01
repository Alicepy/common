/**
 * common table
 * @Author: zhangxuelian 
 * @Date: 2017-09-25 14:36:59 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-05-03 16:33:44
 **/
define(['common/directives/directives','artDialog'],function(directives){
    directives.directive("commonTable", function($compile,normalUtil,$timeout,modalExt) {

        return {
            restrict : "E",
            replace : true,
            scope : {
                tableConfig : '='
            },
            templateUrl : "common/directives/common_table.html",
            link:function(scope,ele,attrs){
                
                //assist var
                var assistVar = {
                    resetPageFlag : 0,
                    unbindWatch1 : null,
                    unbindWatch2 : null,
                    unbindWatch3 : null,
                    unbindWatch4 : null
                }

                //common table config 
                var tableConfig = {
                    defaultNull:'无',//当data为undefined时默认显示文字
                    pagination : true,//显示分页
                    maxSize : 5,//分页最大选项数
                    page : 1,//当前页
                    pagesize : true,//显示分页信息
                    size : 10,//当前页记录数
                    pageList : [10, 25, 50],//设置分页size
                    total : 0,//总记录数
                    optConfig : [],//操作列配置
                    optConfigExt : [],//扩展操作列配置
                    colunms : [],//表头
                    uniqueId : 'id',//唯一标识字段名
                    noDataText : '暂无数据',//暂无数据显示文字
                    showIndex : false,//显示序号
                    indexTitle : '序号',//序号表头标题
                    rows : [],//表记录
                    checkbox : false,//多选
                    radio : false,//单选
                    selectAll : false,//是否全选
                    checkRows : [],//选中记录
                    checkRowsMap : {},//选中记录map
                    order : false,//排序
                    orderColumn : '',//默认排序列
                    desc : false,//排序规则
                    rowDbclick : function(){},//行双击回调
                    rowClick : function(){},//行单击回调
                    turnPage : function(){},//分页回调
                    tableHover : true,//是否显示划过变色效果
                    resetPage : function(){//重置page为1，并阻止turnPage回调
                        if(this.page != 1){
                            this.page = 1;
                            assistVar.resetPageFlag = 1;
                        }
                    },
                    toolbar : {//一般工具栏
                        show : false,
                        title : '列表',
                        tools : [
                            {
                                text : '刷新',
                                icon : 'fa fa-refresh',
                                permissionCode : '',
                                noPermission : true,
                                callback : function(){
                                    
                                }
                            },
                            {
                                text : '上传',
                                icon : 'fa fa-upload',
                                permissionCode : '',
                                callback : function(){
                                }
                            },
                            {
                                text : '下载',
                                icon : 'fa fa-download',
                                permissionCode : '',
                                callback : function(){
                                }
                            },
                            {
                                text : '导入',
                                icon : 'fa fa-sign-in',
                                permissionCode : '',
                                callback : function(){
                                }
                            },
                            {
                                text : '导出',
                                icon : 'fa fa-sign-out',
                                permissionCode : '',
                                callback : function(){
                                }
                            }
                        ]
                    },
                    showTableCol : false//是否显示选项
                };

                //初始化表头
                angular.forEach(scope.tableConfig.colunms,function(item,index){
                    if(typeof(item.show) == 'undefined'){
                        item.show = true;
                    }
                });
               
                //extend
                scope.tableConfig = angular.extend(tableConfig,scope.tableConfig);

                //布局样式 0：全表格 1：表格+分页 2:表格+toolbar 3：表格+toolbar+分页
                scope.layout = 0;
                if(scope.tableConfig.pagination || scope.tableConfig.toolbar.show){
                    scope.layout = scope.tableConfig.pagination ? 1:2;
                    if(scope.tableConfig.pagination && scope.tableConfig.toolbar.show){
                        scope.layout = 3;
                    }
                }

                //翻页监听
                assistVar.unbindWatch1 = scope.$watch('tableConfig.page + tableConfig.size',function(newValue,oldValue,scope){
                    scope.tableConfig.selectAll = false;
                    if(!assistVar.resetPageFlag){
                        if(normalUtil.isFunction(scope.tableConfig.turnPage)){
                            scope.tableConfig.turnPage(scope.tableConfig.page,scope.tableConfig.size);
                        }
                    }else{
                        assistVar.resetPageFlag = 0;
                    }
                });

                //格式化
                assistVar.unbindWatch2 = scope.$watch('tableConfig.rows',function(newValue,oldValue,scope){
                    //列格式化
                    angular.forEach(scope.tableConfig.colunms,function(item,index){
                        if(normalUtil.isFunction(item.formatter)){
                            angular.forEach(scope.tableConfig.rows,function(list,i){
                                var newName = item.formatter(list);
                                if(newName){
                                    list[item.name] = newName;
                                }
                            })
                        }
                        if(tableConfig.checkbox){
                            tableConfig.selectAll = true;
                            angular.forEach(scope.tableConfig.rows,function(list,i){
                                if(scope.tableConfig.checkRowsMap){
                                    list.$checked = scope.tableConfig.checkRowsMap[list[scope.tableConfig.uniqueId]];
                                }else{
                                    list.$checked = false;
                                }
                                tableConfig.selectAll = tableConfig.selectAll && list.$checked;
                            })
                        }
                    });
                    //操作列格式化
                    angular.forEach(scope.tableConfig.optConfigExt,function(item,index){
                        angular.forEach(item.optContent,function(list,i){
                            if(normalUtil.isFunction(list.formatter)){
                                angular.forEach(scope.tableConfig.rows,function(row,j){
                                    var show = list.formatter(row);
                                    row[list.id] = show;
                                });
                            }
                        });
                    });
                });

                //监听checkRows
                assistVar.unbindWatch3 = scope.$watch('tableConfig.checkRows',function(){
                    //同步map
                    scope.tableConfig.checkRowsMap = {};
                    angular.forEach(scope.tableConfig.checkRows,function(item,index){
                        scope.tableConfig.checkRowsMap[item[scope.tableConfig.uniqueId]] = item.$checked;
                    });
                    //同步选中状态
                    angular.forEach(scope.tableConfig.rows,function(item,index){
                        if(scope.tableConfig.checkRowsMap[item[scope.tableConfig.uniqueId]]){
                            item.$checked = true;
                        }else{
                            item.$checked = false;
                        }
                    });
                },true);
                
                //单选radio
                scope.selectRadio = function(row){
                    scope.tableConfig.checkRows = [];
                    scope.tableConfig.checkRows.push(row);
                }
                //单选
                scope.selectSingle = function(checkflag,row,index){
                    if(row.$checked){
                        scope.checkOne(row);
                    }else{
                        scope.disCheck(row);
                    }
                }
                //全选、取消全选
                scope.selectAll = function(checkflag,row,index){
                    angular.forEach(scope.tableConfig.rows,function(item,index) {
                        item.$checked = scope.tableConfig.selectAll;
                        if(item.$checked){
                            scope.checkOne(item);
                        }else{
                            scope.disCheck(item);
                        }
                    });
                }
                scope.disCheck = function(row){
                    var lastData = [];
                    angular.forEach(scope.tableConfig.checkRows,function(item,index) {
                        if(item[scope.tableConfig.uniqueId]===row[scope.tableConfig.uniqueId]){
                            //scope.tableConfig.checkRows.splice(index,1);
                        }else{
                            lastData.push(item);
                        }
                    });
                    scope.tableConfig.checkRows = lastData;
                    
                }
                scope.checkOne = function(row){
                    if(!scope.tableConfig.checkRowsMap[row[scope.tableConfig.uniqueId]]){
                        scope.tableConfig.checkRows.push(row);
                    }
                }
                //排序
                scope.order = function(item){
                    if(scope.tableConfig.order) {
                        scope.tableConfig.orderColumn = item.name;
                        scope.tableConfig.desc = !scope.tableConfig.desc;
                    }
                }
                //单击行
                scope.rowClick = function (row) {
                    if (scope.clicked) {
                        scope.cancelClick = true;
                        return;
                    }
                
                    scope.clicked = true;
                
                    $timeout(function () {
                        if (scope.cancelClick) {
                            scope.cancelClick = false;
                            scope.clicked = false;
                            return;
                        }
                
                        if(normalUtil.isFunction(scope.tableConfig.rowClick)){
                            scope.tableConfig.rowClick(row);
                        }
                
                        scope.cancelClick = false;
                        scope.clicked = false;
                    }, 200);
                };
                //双击行
                scope.rowDbclick = function (row) {
                    $timeout(function () {

                        if(normalUtil.isFunction(scope.tableConfig.rowDbclick)){
                            scope.tableConfig.rowDbclick(row);
                        }
                        
                    });
                };
                //单击列
                scope.colClick = function(row,$event,click){
                    if(normalUtil.isFunction(click)){
                        click(row);
                        $event.stopPropagation();
                    }
                }
                //单击无权限功能
                scope.noPermission = function(){
                    modalExt.modalTip({content:"暂无权限!",type:"warning",height:150});
                }

                /**
                 * 弹窗业务
                 */
                /* $("#tableColDialog").parents(".ui-popup").remove();
                var tableDialog = scope.tableDialog = {
                    //初始化
                    init:function(){
                        this.listener();
                    },
                    //弹窗对象
                    optionDialog:null,
                    //全选
                    selectOption:true,
                    //显示隐藏弹窗
                    showOption:function(){
                        if($("#tableColDialog").is(":hidden")){
                            var follow = document.getElementById('showTableCol');
                            tableDialog.optionDialog = dialog({
                                align: 'bottom right',
                                content: $("#tableColDialog")
                            });
                            tableDialog.optionDialog.show(follow);
                        }else{
                            tableDialog.optionDialog.close();
                        }
                    },
                    //监听器
                    listener:function(){
                        assistVar.unbindWatch4 = scope.$watch('tableDialog.selectOption',function(newValue,oldValue,scope){
                            angular.forEach(tableConfig.colunms,function(item,index){
                                item.show = newValue;
                            });
                        });
                        $(document).on('click',function(e){
                            if(e.target.id != "tableColDialog" && e.target.id != "showTableCol" && $(e.target).parents("#tableColDialog").length == 0){
                                if(tableDialog.optionDialog){
                                    tableDialog.optionDialog.close();
                                }
                            }
                        });
                    }
                }
                tableDialog.init(); */

                //销毁
                scope.$on("$destroy", function() {
                    assistVar.unbindWatch1();
                    assistVar.unbindWatch2();
                    assistVar.unbindWatch3();
                    $(ele).remove();    
                })
            }
        };
    });
})