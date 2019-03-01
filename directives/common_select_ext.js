/**
 * common select ext
 * @Author: zhangxuelian 
 * @Date: 2017-11-03 15:21:18 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-03-10 15:34:01
 **/
define(['common/directives/directives'],function(directives){
    directives.directive("commonSelectExt", function($compile,normalUtil,$timeout,modalExt,$http) {
        return {
            restrict : "E",
            replace : true,
            scope : {
                selectConfig : '=',
                setVal : '=',
                getVal : '=',
                ngDisabled: '=',
                ngItem:'='
            },
            templateUrl : "common/directives/common_select_ext.html",
            link:function(scope,ele,attrs){
                 var assistVar = {
                    unbindWatch1: null,
                    unbindWatch2: null,
                    unbindWatch3: null,
                    unbindWatch4: null,
                    unbindWatch5: null
                }
                //common select config
                var selectConfig = {
                    filter : true,//过滤器开关 为false时与select标签功能一致
                    separate : true,//输入与过滤分离 为false时输入与过滤合并为一体
                    checkbox : false,//多选开关
                    position : 'down',//面板显示位置,默认在下
                    data : [],//select数据源（数组）
                    remote : false,//是否实时请求数据,为true时filter必须为true
                    questType : 0,//0：普通请求方式、1：restful请求方式
                    url :"",//请求url
                    method :"get",//请求方式
                    isCustomParam: false,//是否自定义传参
                    customParam: {},//自定义post传参
                    paramName :'name',//请求参数名
                    isFormatter : false,//若返回结果符合标准则不需要开启，返回数据标准格式为：{data:[{label:a,value:0},{label:b,value:1}]}
                    formatter : function(){},//自行格式化处理结果,需设置isFormatter为true
                    valueField : 'value',//对应选项value值
                    textField : 'label',//显示在输入框中的字段名
                    height : '28px',//输入框高度
                    panelHeight : '250px',//面板高度
                    panelWidth : '180px',//面板以及输入框宽度
                    showLimit : 50,//匹配前n条记录
                    inputLabel : "",//输入框内容
                    myLabel : "",
                    setValue : '',//设置值
                    value : '',//值
                    label : '',//输入框的值
                    checkRows : [],//选中数组Row
                    checkLimit : null,//最多选n条记录
                    checkRowsMap : {},//选中记录map
                    onSelect : function(){},//选择回调
                    assign : function(){},//赋值回调
                    clearAll : function(){},//清空回调
                    disabled : false,//disabled开关
                    cancelWatch : function(){//取消监听（取消后重新设置data和setValue都不会监听到，慎用）
                        assistVar.unbindWatch2();
                    },
                    reset:function(){//重置
                        scope.selectConfig.value = '';
                        if(typeof(attrs.getVal) != 'undefined'){
                            scope.getVal = '';
                        }
                        scope.selectConfig.label = '';
                        scope.selectConfig.checkRows = [];
                        ele.find(".select-show").val('');
                        ele.find(".select-show").attr('title','');
                        angular.forEach(scope.selectConfig.data,function (item,index) {
                            item.$checked = false;
                        });
                    }
                };
                
                //extend
                scope.selectConfig = angular.extend(selectConfig,scope.selectConfig);
                if(scope.ngDisabled){
                    scope.selectConfig.disabled = true;
                }
                
                //filter
                scope.filterLabel = function(item){
                    if(item[scope.selectConfig.textField] && item[scope.selectConfig.textField].indexOf(scope.selectConfig.inputLabel) != -1){
                        return item;
                    }
                }
                scope.filterInnerLabel = function(item){
                    if(item[scope.selectConfig.textField] && item[scope.selectConfig.textField].indexOf(scope.selectConfig.myLabel) != -1){
                        return item;
                    }
                }
               
                //element
                var ele = $(attrs.$$element);

                //get label and value from checkRows
                scope.getData = function(){
                    var label = "", value = "";
                    if(scope.selectConfig.checkRows.length != 0){
                        $.each(scope.selectConfig.checkRows,function(i,item){
                            label += item[scope.selectConfig.textField]+",";
                            value += item[scope.selectConfig.valueField]+",";
                        });
                        if(label){
                            label = label.substring(0,label.length - 1);
                            value = value.substring(0,value.length - 1);
                        }
                    }
                    scope.selectConfig.label = label;
                    scope.selectConfig.value = value;
                    if(typeof(attrs.getVal) != 'undefined'){
                        scope.getVal = value;
                    }
                    ele.find(".select-show").val(label);
                    ele.find(".select-show").attr("title",label);
                    scope.selectConfig.inputLabel = label;
                }

                //assign
                assistVar.unbindWatch1 = scope.$watch("setVal",function(newValue,oldValue,scope){
                    if(typeof(newValue) != 'undefined'){
                        scope.selectConfig.setValue = newValue;
                    }
                });
                
                //监听数据变化以及赋值,实时请求过滤是用户输入停止500毫秒后开始查询数据
                if(scope.selectConfig.remote){
                    var params = {};
                    var remoteFlag = null;
                    if(scope.selectConfig.separate){
                        assistVar.unbindWatch2 = scope.$watch("selectConfig.myLabel",function(){
                            if(remoteFlag){
                                $timeout.cancel(remoteFlag);
                            }
                            remoteFlag = $timeout(function(){
                                if(remoteFlag){
                                    params[scope.selectConfig.paramName] = scope.selectConfig.myLabel;
                                    requestUrl(params,scope.selectConfig.myLabel);
                                }
                            },500);
                        })
                    }else{
                        assistVar.unbindWatch2 = scope.$watch("selectConfig.inputLabel",function(){
                            if(remoteFlag){
                                $timeout.cancel(remoteFlag);
                            }
                            remoteFlag = $timeout(function(){
                                if(remoteFlag){
                                    params[scope.selectConfig.paramName] = scope.selectConfig.inputLabel;
                                    requestUrl(params,scope.selectConfig.inputLabel);
                                }
                            },500);
                        })
                    }
                    function requestUrl(params,value){
                        var thePromise;
                        if(scope.selectConfig.questType){//restful请求方式
                            thePromise = $http({
                                method: scope.selectConfig.method,
                                url: scope.selectConfig.url+"/"+value,
                            });

                        }else{//普通请求方式
                            var finalParam = params;
                            if(scope.selectConfig.isCustomParam){
                                var customParam = scope.selectConfig.customParam;
                                customParam[scope.selectConfig.paramName] = value;
                                finalParam = customParam;
                            }
                            thePromise = $http({
                                method: scope.selectConfig.method,
                                url: scope.selectConfig.url,
                                params: finalParam
                            })
                        }
                        thePromise.then(function successCallback(response) {
                            if(scope.selectConfig.isFormatter){
                                scope.selectConfig.data = scope.selectConfig.formatter(response.data) || [];
                            }else{
                                scope.selectConfig.data = response.data.data || [];
                            }
                            /* if(scope.selectConfig.data && scope.selectConfig.data.length == 0){
                                var temp = {};
                                temp[scope.selectConfig.textField] = '无返回结果！';
                                scope.selectConfig.data = [];
                                scope.selectConfig.data.push(temp);
                            } */
                        }, function errorCallback(response) {
                            scope.selectConfig.data = [];
                            /* var temp = {};
                            temp[scope.selectConfig.textField] = '服务请求失败，请重试！';
                            scope.selectConfig.data = [];
                            scope.selectConfig.data.push(temp); */
                        });
                    }
                    
                    assistVar.unbindWatch5 = scope.$watch("selectConfig.setValue",function(newValue,oldValue){
                        watchSetValue();
                    })

                }else{
                    assistVar.unbindWatch2 = scope.$watch("selectConfig.data + selectConfig.setValue",function(newValue,oldValue){
                        watchSetValue();
                    },true);
                }
                function watchSetValue(){
                    if(typeof(scope.selectConfig.setValue) != 'undefined'){
                        if(scope.selectConfig.checkbox){//多选
                            var rows = [];
                            var valueArr = scope.selectConfig.setValue.split(",");
                            $.each(valueArr,function(i,item){
                                var index = normalUtil.eleInArr(scope.selectConfig.data,scope.selectConfig.valueField,item);
                                if(index != -1){
                                    scope.selectConfig.data[index].$checked = true;
                                    rows.push(scope.selectConfig.data[index]);
                                }
                            });
                            scope.selectConfig.checkRows = rows;
                            scope.getData();
                        }else{//单选
                            var index = normalUtil.eleInArr(scope.selectConfig.data,scope.selectConfig.valueField,scope.selectConfig.setValue);
                            if(index != -1){
                                scope.selectConfig.checkRows = [];
                                scope.selectConfig.checkRows.push(scope.selectConfig.data[index]);
                                scope.getData();
                            }
                        }
                    }
                }

                //assign
                assistVar.unbindWatch3 = scope.$watch("selectConfig.value",function(newValue,oldValue,scope){
                    if(normalUtil.isFunction(scope.selectConfig.assign)){
                        scope.selectConfig.assign(scope.selectConfig.checkRows);
                    }
                })

                //layout
               scope.selectClass = attrs.selectClass;
                scope.contentStyle = {
                    width:scope.selectConfig.panelWidth,
                    height:scope.selectConfig.panelHeight,
                    top:scope.selectConfig.height
                }
                scope.showStyle = {
                    width:scope.selectConfig.panelWidth,
                    height:scope.selectConfig.height
                }
                
                //listener
                assistVar.unbindWatch4 = scope.$watch("ngDisabled",function(newValue,oldValue){
                    if(newValue){
                        scope.selectConfig.disabled = true;
                    }else if(typeof(newValue) != 'undefined'){
                        scope.selectConfig.disabled = false;
                    }
                });
                
                scope.focus = function(){
                    $(".select-content").hide();
                    if(ele.find(".select-content").is(":hidden")){
                        ele.find(".select-content").show();
                        //单选可过滤且分离
                        if((!scope.selectConfig.checkbox && scope.selectConfig.filter && scope.selectConfig.separate) || scope.selectConfig.checkbox){
                            ele.find(".select-content input").focus();
                        }
                    }else{
                        //ele.find(".select-content").hide();
                    }
                }
                
                scope.clear = function(){
                    scope.selectConfig.value = '';
                    if(typeof(attrs.getVal) != 'undefined'){
                        scope.getVal = '';
                    }
                    scope.selectConfig.label = '';
                    scope.selectConfig.checkRows = [];
                    ele.find(".select-show").val('');
                    ele.find(".select-show").attr('title','');
                    scope.selectConfig.setValue = '';
                    scope.selectConfig.clearAll();
                }
                
                $(document).off("click");
                $(document).on("click",function(e){
                    if(e.target.className.indexOf("select-content") == -1
                            && e.target.className.indexOf("select-show") == -1 
                               && $(e.target).parents(".select-content").length == 0
                            ){
                       $(".select-content").hide();
                    }
                });
                scope.changeIpt = function(){
                    if(scope.selectConfig.inputLabel == ""){
                        if(normalUtil.isFunction(scope.selectConfig.clearAll)){
                            scope.selectConfig.value = '';
                            if(typeof(attrs.getVal) != 'undefined'){
                                scope.getVal = '';
                            }
                            scope.selectConfig.label = '';
                            scope.selectConfig.checkRows = [];
                            scope.selectConfig.clearAll();
                        }
                    }
                } 
 
                //单选
                scope.selectSingle = function(row,index){
                    if(row.$checked){
                        scope.checkOne(row);
                    }else{
                        scope.disCheck(row);
                    }
                }
                scope.disCheck = function(row){
                    var lastData = [];
                    var lastMapData = {};
                    angular.forEach(scope.selectConfig.checkRows,function(item,index) {
                        if(item[scope.selectConfig.valueField]===row[scope.selectConfig.valueField]){
                            //scope.selectConfig.checkRows.splice(index,1);
                        }else{
                            lastData.push(item);
                            lastMapData[item[scope.selectConfig.valueField]] = item.$checked;
                        }
                    });
                    scope.selectConfig.checkRows = lastData;
                    scope.selectConfig.checkRowsMap=lastMapData;
                    
                }
                scope.checkOne = function(row){
                    if(!scope.selectConfig.checkRowsMap[row[scope.selectConfig.valueField]]){
                        scope.selectConfig.checkRows.push(row);
                        scope.selectConfig.checkRowsMap[row[scope.selectConfig.valueField]] = row.$checked;
                    }
                }

                //onSelect
                scope.onSelect = function(item,event){
                    if(scope.selectConfig.checkbox){
                        if(!item.$checked){
                            if(scope.selectConfig.checkLimit){
                                if(scope.selectConfig.checkLimit == scope.selectConfig.checkRows.length){
                                    modalExt.modalTip({content:"最多只能选"+scope.selectConfig.checkLimit+"个选项！",type:"warning"});
                                    return;
                                }
                            }
                        }
                        item.$checked=!item.$checked;
                        scope.selectSingle(item);
                    }else{
                        ele.find(".select-content").hide();
                        scope.selectConfig.checkRows = [];
                        scope.selectConfig.checkRows.push(item);
                    }
                    scope.getData();
                    if(normalUtil.isFunction(scope.selectConfig.onSelect)){
                        scope.selectConfig.onSelect(item,scope.ngItem);
                    }
                }
                //selectLi
                scope.selectLi = function(item,event){
                    if($(event.target)[0].nodeName == "INPUT"){
                        return;
                    }
                    scope.onSelect(item,event);
                }

                //销毁
                scope.$on("$destroy", function() {
                    assistVar.unbindWatch1();
                    assistVar.unbindWatch2();
                    assistVar.unbindWatch3();
                    assistVar.unbindWatch4();
                    if(assistVar.unbindWatch5){
                        assistVar.unbindWatch5();
                    }
                    scope.selectConfig.data = null;
                    scope.selectConfig = null;
                    $(ele).remove();
                })
            }
        }
    })
})