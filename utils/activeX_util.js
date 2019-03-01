/**
 * activeX操作类
 * @Author: zhangxuelian 
 * @Date: 2018-07-16 09:15:58 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-07-22 13:54:48
 **/
define(['jquery'],function($){
    /**
     * SAPI自动化语音转换（TTS）引擎功能
     */
    var SpVoice = {
        /**
         * 创建Automation对象
         */
        init: function(){
            var ret = {
                obj: null,
                code: 0
            }
            try{
                var obj = new ActiveXObject("Sapi.SpVoice");
                ret.obj = obj;
                ret.code = 1;
            }catch(ex){
                ret.code = 0;
            }
            return ret;
        },
        /**
         * 朗读文字
         */
        speak: function(obj,text){
            obj.Speak(text, 1);
        },
        /**
         * 取消朗读
         */
        cancel: function(obj){
            obj.Speak("", 2);
        },
        /**
         * 暂停朗读
         */
        pause: function(obj){
            obj.Pause();
        },
        /**
         * 继续朗读
         */
        resume: function(obj){
            obj.Resume();
        }
    };

    /**
     * FSO
     */
    var fileSystemObject = {
        /**
         * 创建Automation对象
         */
        init: function(){
            var ret = {
                obj: null,
                code: 0
            }
            try{
                var obj = new ActiveXObject("Scripting.FileSystemObject");
                ret.obj = obj;
                ret.code = 1;
            }catch(ex){
                ret.code = 0;
            }
            return ret;
        },
        /**
         * 打开一个文件流
         *
         * @param {*} obj Automation对象
         * @param {*} filename 文件名（含路径）
         * @param {*} iomode 1:以只读方式打开文件,不能写这个文件 2:以写方式打开文件 8:打开文件并从文件末尾开始写
         * @param {*} create true:filename 不存在时创建新文件 false:filename 不存在时不创建新文件
         * @param {*} format true:以 Unicode 格式打开文件 false:以 ASCII 格式打开文件 默认：使用系统默认值打开文件
         * @returns 文件流对象
         */
        openTextFile: function(obj,filename,iomode,create,format){
            var iomode = iomode||1, create = create||true,textStream = null;
            if(format){
                textStream = obj.OpenTextFile(filename,iomode,create,format);
            }else{
                textStream = obj.OpenTextFile(filename,iomode,create);
            }
            return textStream;
        },
        /**
         * 读取文件中指定数量的字符
         *
         * @param {*} textStream
         */
        read: function(textStream){
            try{
                return textStream.Read();
            }catch(ex){
                return false;
            }
        },
        /**
         * 读取一整行，但不包括换行符
         *
         * @param {*} textStream
         */
        readLine: function(textStream){
            try{
                return textStream.ReadLine();
            }catch(ex){
                return false;
            }
        },
        /**
         * 读取文本文件的整个内容
         *
         * @param {*} textStream
         * @returns
         */
        readAll: function(textStream){
            try{
                return textStream.ReadAll();
            }catch(ex){
                return false;
            }
        },
        /**
         * 关闭文件流
         *
         * @param {*} textStream
         */
        close: function(textStream){
            try{
                return textStream.Close();
            }catch(ex){
                return false;
            }
        }
    }

    return {
        SpVoice: SpVoice,
        fileSystemObject: fileSystemObject
    };
})