/**
 * option directives
 * @Author: quemanting
 * @Date: 2017-09-22 10:28:30
 * @Last Modified by: quemanting
 * @Last Modified time: 2017-09-26 10:48:10
 **/
/*用法
数据结构:
$scope.boxdata={
    config:{
        id:"k",//必须,且和页面其他id不同，与其他下拉框id也不能相同
        currentActivity: "",//必须
        boxWidth:220,
        boxHeight:28,
        liHeight:26
    },
    activities : [
        {name:"lqh",value:26},
        {name:"aacc",value:26},
        {name:"bb",value:26},
        {name:"dd",value:26},
        {name:"acd",value:26},
        {name:"asd",value:26},
        {name:"dfsa",value:26}
    ]
};
视图:  <span combobox info="boxdata" ></span> info为数据项
*/
define(['common/directives/directives'],function(directives){
    directives.directive("combobox", function() {
        return {
            restrict : "A",
            scope:{
                info: "="
            },
            templateUrl : "common/directives/combobox.html",
            link:function(scope,ele,attrs){
                var fatherDom="#"+scope.info.config.id;
                scope.changeText=function (item) {
                    scope.itemText=item.name;
                    $(fatherDom).find(".select-input").val(scope.itemText);
                    scope.info.config.currentActivity = scope.itemText;
                    $(fatherDom).find(".select-ul").hide();
                };
                scope.uiShowHide=function(){
                    if ($(fatherDom).find(".select-ul").is(":visible") !== false) {
                        $(fatherDom).find(".select-ul").hide();
                    } else {
                        $(fatherDom).find(".select-ul").show();
                    }
                };
                scope.ulFocus=function(){
                    $(fatherDom).find(".select-ul").show();
                };
                $(document).click(function(e) {
                    if(!$(e.target).closest(".select-block").length) {
                        $(".select-ul").hide();
                    }
                });
            }
        };
    });
});