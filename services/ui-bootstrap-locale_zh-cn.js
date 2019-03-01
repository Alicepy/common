/**
 * ui-bootstrap-locale_zh-cn
 * @Author: zhangxuelian 
 * @Date: 2017-09-25 10:11:36 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2017-09-25 10:13:15
 **/
define(['services/services'],function(services){
  services.config(function(paginationConfig, pagerConfig) {
      paginationConfig.firstText = "首页";
      paginationConfig.previousText = '上页';
      paginationConfig.nextText = '下页';
      paginationConfig.lastText = '尾页';

      pagerConfig.previousText = "« 上页";
      pagerConfig.nextText = "下页 »";
  });
})
