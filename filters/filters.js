/**
 * filters
 * @Author: zhangxuelian 
 * @Date: 2017-09-25 17:25:26 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-10-23 09:26:37
 **/
var filters = angular.module('filters',[]);

/**
 * html加入可信任非转义字符
 */
filters.filter('trusthtml', function($sce) {
    return function(text,defaultNull) {
        var showText = defaultNull || '';
        //过滤<script></script>
        if(text){
            var str = text.toString();
            text =  str.replace("<script>","");
            text =  text.replace("</script>","");
        }else{
            text = '';
        }
        if(typeof(text) == 'undefined'){
            return showText;
        }else{
            if(text && isNaN(text)){
                return $sce.trustAsHtml(text);
            }else{
                return $sce.trustAsHtml('<span>'+text+'</span>');
            }
        }
    }
});
/**
 * 过滤html标签
 */
filters.filter('filterhtml', function($sce) {
    return function(text) {
        var regx = /<[^>]*>|<\/[^>]*>/gm;
        if(text){
            var str = text.toString();
            return str.replace(regx,"");
        }else{
            return '';
        }
        
    }
});
/**
 * 字典翻译
 */
filters.filter('translate', function($sce,subject) {
    return function(text,dicType) {
        return subject[dicType][text];
    }
});
/**
 * 匹配文字高亮
 */
filters.filter('getKey',['$sce',function($sce){
    return function(content,match) {
        var reg = new　RegExp(match,'g');
        content.replace(reg,'<em>'+match+'</em>');
        return $sec.trustAsHtml(content);
    }
}]);
/**
 * 格式化文字
 */
filters.filter('formatterText',function($sce){
    return function(content,len) {
        if(content){
            var length = len || 10;
            var contentLen = content.length;
            if(contentLen < length){
                var showText = content.substring(0,length);
            }else{
                var showText = content.substring(0,length)+"...";
            }
            var ret = $sce.trustAsHtml("<span title='"+content+"'>"+showText+"</span>");
            return ret;
        }else{
            return '';
        }
    }
});
/**
 * 小数转换为百分比
 */
filters.filter('percentage', function() {
    return function(point) {
        return Number(point*100).toFixed(1)+'%';
    };
});
/**
 * url加入信任
 */
filters.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])