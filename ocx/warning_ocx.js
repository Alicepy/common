/**
 * 声光告警器OCX
 * @Author: zhangxuelian 
 * @Date: 2018-07-22 20:54:05 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-07-22 21:27:07
 **/
define(['jquery'], function($) {
    var warningOcx = {
        /**
         * 打开串口
         */
        openCom: function(ocxObj,commPort){
            try{
                ocxObj.commPort = commPort;
                ocxObj.openCom();
                return true;
            }catch(ex){
                return false;
            }
           
        },
        /**
         * 关闭串口
         */
        clossCom: function(ocxObj){
            try{
                ocxObj.clossCom();
                return true;
            }catch(ex){
                return false;
            }
        },
        /**
         * 发送消息
         *
         * @param {*} ocxObj
         * @param {*} type 0:关闭 1:闪光 2:闪光+声音1 3:闪光+声音2 4:声音1 5:声音2
         */
        inputMsg: function(ocxObj,type){
            var value = "0110001A0001000FD8";
            switch(type){
                case 0: value = "0110001A0001000FD8"; break;
                case 1: value = "0110001A0001028E19"; break;
                case 2: value = "0110001A000101CE18"; break;
                case 3: value = "0110001A0001040E1B"; break;
                case 4: value = "0110001A0001034FD9"; break;
                case 5: value = "0110001A000105CFDB"; break;
            }
            try{
                ocxObj.inputMsg(value);
                return true;
            }catch(ex){
                return false;
            }
            
        }
    }
    return warningOcx;
});