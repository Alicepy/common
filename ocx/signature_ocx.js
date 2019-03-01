/**
 * 汉王签名板 ocx
 * @Author: zhangxuelian 
 * @Date: 2018-01-07 15:24:52 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-01-07 15:53:30
 * 
 * 页面插入object：<object id="HWPenSign" name="HWPenSign" classid="clsid:E8F5278C-0C72-4561-8F7E-CCBC3E48C2E3"></object>
 * 点签名板上的签名会进入全局回调signComplete
 **/
define(['jquery'], function ($) {
	
    var sign = {
		/**
		 * 签名板对象
		 */
		handWriter: null,
		/**
		 * 初始化
		 */
        init: function () { 
        	if(this.handWriter!=null){
        		if(typeof(this.handWriter.HWFinalize) == 'undefined')return;
        		this.handWriter.HWFinalize();
        		this.handWriter = null;
        	}
        	this.handWriter = document.getElementById("HWPenSign"); 
        	if(typeof(this.handWriter.HWSetBkColor) == 'undefined')return;
        	this.handWriter.HWSetBkColor(0xDDDDDD);  
        	this.handWriter.HWSetCtlFrame(2, 0x000000);
        	this.handWriter.HWInitialize();
        	this.handWriter.HWSetPenWidth(4);
		},
		/**
		 * 结束签名
		 */
        finish:function(){ 
        	if(this.handWriter!=null){
        		if(typeof(this.handWriter.HWClearPenSign) == 'undefined')return;
        		this.handWriter.HWClearPenSign();
        		this.handWriter.HWFinalize();
        	}
        	this.handWriter = null;
		},
		/**
		 * 重新签名
		 */
        resign:function(){  
        	if(this.handWriter!=null)
        		this.handWriter.HWClearPenSign();
		},
		/**
		 * 清空签名板
		 */
        clear:function(){
        	if(this.handWriter!=null)
        		this.handWriter.HWClearPenSign();
		},
		/**
		 * 获取base64
		 */
        getBase64Stream:function () {
            if(this.handWriter!=null){
            	 var stream;
            	 stream = this.handWriter.HWGetBase64Stream(2);
                return stream;
            }
            return "";
        }
    }

    return sign;
});