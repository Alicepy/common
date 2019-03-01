/**
 * directives
 * @Author: zhangxuelian 
 * @Date: 2017-09-21 10:27:17 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-07-04 14:14:01
 **/
define([''], function () {
    var directives = angular.module('directives', ['services']);

    //switch开关
    directives.directive("commonToggle", function ($compile, normalUtil, $timeout, modalExt) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                ngDisabled: '=',
                toggleConfig: '='
            },
            template: "<div class='common-toggle-container' ng-class=\"{true:'active'}[toggleConfig.disabled]\"><div ng-click='switchToggle()'><div class='toggle-bar'></div><div class='toggle-button'></div></div></div>",
            link: function (scope, ele, attrs) {
                var toggleConfig = {
                    disabled: false,
                    onSelect: function () {}
                };
                scope.toggleConfig = angular.extend(toggleConfig, scope.toggleConfig);
                if (scope.ngDisabled) {
                    scope.toggleConfig.disabled = scope.ngDisabled;
                }
                scope.switchToggle = function () {
                    /* scope.toggleConfig.disabled = !scope.toggleConfig.disabled;
                    scope.ngDisabled = scope.toggleConfig.disabled; */
                    scope.toggleConfig.onSelect(scope.toggleConfig.disabled);
                }
                scope.$watch("ngDisabled", function (newVal, oldVal) {
                    scope.toggleConfig.disabled = newVal;
                });
            }
        }
    });

    //锁定
    directives.directive("lockedMask", function ($compile, normalUtil, $timeout, modalExt) {
        return {
            restrict: 'A',
            scope: {
                lockedMask: '=',
            },
            link: function (scope, ele, attrs) {
                function setMask() {
                    $(ele).attr("title", "当前操作已被锁定！");
                    $(ele).css({
                        "cursor": "help",
                        "position": "relative"
                    });
                    $(ele).find("#lockedMask").remove();
                    $(ele).append("<div id='lockedMask' style='width:100%;height:100%;position:absolute;border:solid 1px #F9FAFA;background:url(images/mask.png);top:0;left:0'></div>");
                    ele.bind("click", function (e) {
                        modalExt.modalTip({
                            content: "当前操作已被锁定！",
                            type: "warning",
                            height: 150
                        });
                        e.stopPropagation();
                        e.preventDefault();
                    });
                    /* ele.find("*").off("click").off("dblclick"); */
                }
                if (scope.lockedMask) {
                    setMask();
                }
                scope.$watch('lockedMask', function (newVal, oldVal) {
                    if (newVal) {
                        setMask();
                    }
                })


            }
        }
    });

    //等待repeat轮询完成
    directives.directive("repeatFinish", function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                if (scope.$last == true) {
                    scope.$eval(attr.repeatFinish);
                }
            }
        }
    });

    //等待图片加载完成
    directives.directive("loadImage", function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('load', function () {
                    scope.$apply(attrs.loadImage);
                });
            }
        }
    });

    //keyup监听删除非数字字符
    directives.directive("filterNumber", function () {
        return {
            link: function (scope, element) {
                var regex = /\D/g;
                element.bind('keyup', function () {
                    this.value = this.value.replace(regex, '');
                });
            }
        }
    });

    //error处理
    directives.directive("errSrc", function () {
        return {
            link: function (scope, element, attrs) {
                element.bind("error", function () {
                    if (attrs.src != attrs.errSrc) {
                        attrs.$set("src", attrs.errSrc);
                    }
                });
            }
        }
    });
    //鼠标移入显示，移出隐藏
    directives.directive('mouseOverLeave', function () {
        return {
            restrict: 'A',
            scope: {
                hover: "="
            },
            link: function (scope, elem, attr) {
                elem.bind('mouseover', function () {
                    elem.css("cursor", "pointer");
                    scope.$apply(function () {
                        scope.hover = true;
                    });
                });
                elem.bind('mouseleave', function () {
                    scope.$apply(function () {
                        scope.hover = false;
                    });
                });
            }
        }
    });

    return directives;
});