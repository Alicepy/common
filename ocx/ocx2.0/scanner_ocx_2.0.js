/**
 * 高速扫描仪OCX
 * @Author: zhangxuelian 
 * @Date: 2018-03-06 09:34:47 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-03-07 17:05:50
 * 
 *  页面插入
 *  <object id="scannerOcx" style="width:0; height:0" codebase= "joysail.cab#version=2,0,1,1" classid="clsid:a7290394-9716-4ac2-9848-cb3d6cd28ab4" >
        <param name="scanpixel" value="2"/>
        <param name="doubleside" value="1"/>
        <param name="resolution" value="300"/>
        <param name="brightness" value="100"/>
        <param name="contrast" value="0"/>
        <param name="invert" value="false"/>
        <param name="showui" value="false"/>
        <param name="showprogress" value="false"/>
        <param name="noiseremove" value="true"/>
        <param name="autodeskew" value="true"/>
        <param name="autosmoothing" value="1"/>
        <param name="autotestingblankpage" value="0"/>
        <param name="blankpagepercentage" value="100"/>
        <param name="autobandc" value="false"/>
        <param name="scannername" value=""/>
        <param name="edgefill" value="3"/>
        <param name="autoblackedge" value="true"/>  
        <param name="twaindecode" value="0"/>
        <param name="scanevenmode" value="1"/>
        <param name="doubledetected" value="2"/>
        <param name="doubledetectedafter" value="0"/>
        <param name="compress" value="1"/>
        <param name="suffix" value="8"/>
        <param name="jpegquiality" value="3"/>
        <param name="autoformat" value="0">
    </object>
    页面设置object回调
    <script language="javascript" FOR="scannerOcx" EVENT="EventScanEnd(path)">
        console.log(path);
        endScan(path);
    </script>
    <script language="javascript" FOR="scannerOcx" EVENT="EventScanError(path)">
        console.log(path);
        dealError(path);
    </script>
 * 
 **/
define(['jquery','common/utils/common_utils'], function ($,commonUtils) {
    var scanner = {
        /**
         * 开始扫描
         * 
         * @param {any} ocxObj
         * @param {any} params
         */
        startScan: function(objId,params){
        var theParams = {};
            if(!$("#scannerOcxId")){
                //$("#scannerOcxId").empty();
                var object = 
                '<OBJECT ID="scannerOcx" style="MARGIN-LEFT:5px; WIDTH: 0%; HEIGHT:0%" CODEBASE= "common/ocx/joysail/JoySail.CAB#version=2,0,1,1" classid="CLSID:A7290394-9716-4AC2-9848-CB3D6CD28AB4" >'+
                '<PARAM NAME="ScanPixel" VALUE="2"/>'+
                '<PARAM NAME="DoubleSide" VALUE="1"/>'+ 
                '<PARAM NAME="Resolution" VALUE="300"/>'+  
                '<PARAM NAME="Brightness" VALUE="100"/>'+  
                '<PARAM NAME="Contrast" VALUE="0"/>'+  
                '<PARAM NAME="Invert" VALUE="false"/>'+  
                '<PARAM NAME="ShowUI" VALUE="false"/>'+  
                '<PARAM NAME="ShowProgress" VALUE="false"/>'+  
                '<PARAM NAME="NoiseRemove" VALUE="true"/>'+  
                '<PARAM NAME="AutoDeskew" VALUE="true"/>'+  
                '<PARAM NAME="AutoSmoothing" VALUE="1"/>'+  
                '<PARAM NAME="AutoTestingBlankPage" VALUE="0"/>'+  
                '<PARAM NAME="BlankPagePercentage" VALUE="100"/>'+  
                '<PARAM NAME="AutoBAndC" VALUE="false"/>'+
                '<PARAM NAME="ScannerName" VALUE=""/>'+
                '<PARAM NAME="EdgeFill" VALUE="3"/>'+   
                '<PARAM NAME="AutoBlackEdge" VALUE="true"/>'+     
                '<PARAM NAME="TwainDeCode" VALUE="0"/>'+
                '<PARAM NAME="ScanEvenMode" VALUE="1"/>'+
                '</OBJECT>';
                $('#'+objId).empty();
                $('#'+objId).append(object);
            
                var defaultParams = {
                doubleSide: 0, //0(双面)、1(正面)、2(反面)
                scanPixel: 2, //0(黑)、1(灰)、2(彩)
                resolution: 300, //分辨率
                compress: 0, //压缩格式: 0(无)、1(jepg)、2(lzw)
                jpegQuiality: 1, //压缩质量: 1(低)、2(中)、3(高)
                saveType: 2, //保存格式: 1(jpg)、2(pdf)、3(tif)
                setScanLength: 500,
                savePath: 'C:\\SimpleScan\\scanner\\', //保存路径
                imageName: '' //文件名
                };
                theParams = $.extend(defaultParams,params || {});
                scannerOcx.DoubleSide = theParams.doubleSide;
                scannerOcx.ScanPixel = theParams.scanPixel;
                scannerOcx.Resolution = theParams.resolution;
                scannerOcx.Compress = theParams.compress;
                scannerOcx.JpegQuiality = theParams.jpegQuiality;
                scannerOcx.SetScanLength(theParams.setScanLength);
            }else{
                theParams = $.extend(defaultParams,params || {});
                theParams.savePath='C:\\SimpleScan\\scanner\\';
                theParams.imageName = '';
                theParams.saveType = 2;
                scannerOcx.DoubleSide = theParams.doubleSide;
            }
            
            scannerOcx.BeginScan(0,theParams.savePath,theParams.imageName,theParams.saveType);
            return scannerOcx;
        },
        /**
         * 获取是否缺纸
         * 
         * @param {any} ocxObj 
         */
        paperState: function(ocxObj){
            return ocxObj.ScannerState();
        },
        /**
         * 获取识别到的扫描仪名称数组
         * 
         * @param {any} ocxObj 
         */
        getScanners: function(ocxObj){
            var scanners = ocxObj.GetScanners();
            return scanners.split("|");
        },
        /**
         * 设置扫描仪
         * 
         * @param {any} ocxObj 
         * @param {any} scannerName 
         */
        SetScanner: function(ocxObj,scannerName){
            return ocxObj.SetScanner(scannerName);
        },
        /**
         * 获取当前扫描仪名称
         * 
         * @param {any} ocxObj 
         */
        getScannerName: function(ocxObj){
            return ocxObj.ScannerName;
        },
        /**
         * 合并到pdf
         * 
         * @param {any} ocxObj 
         * @param {any} SrcFile 
         * @param {any} NewPdfPath
         */
        toPdf: function(ocxObj,srcFile,newPdfPath){
            var newPdfPath = newPdfPath || "C:\\scanner\\pdf\\NewPdf.pdf";
			return ocxObj.SaveAsPdf(newPdfPath,srcFile);
        },
        /**
         * 合并pdf返回base64
         * 
         * @param {any} ocxObj 
         * @param {any} SrcFile 
         */
        toPdfBase64: function(ocxObj,srcFile){
            return ocxObj.SaveFilesToPdfBase64(srcFile);
        },
        /**
         * path转换成base64
         * 
         * @param {any} ocxObj 
         * @param {any} filePath 
         */
        getBase64: function(ocxObj,filePath){
            return ocxObj.GetBase64(filePath);
        },
        /**
         * 指定文件夹合并pdf
         * 
         * @param {any} ocxObj 
         * @param {any} srcFile 
         * @param {any} saveFile 
         */
        folderToPdfBase64: function(ocxObj,srcfolder,saveFile){
			return  ocxObj.FolderToPdfBase64(srcfolder,1,saveFile,false);
        },
        /**
         * 获取所有扫描文件组
         * 
         * @param {any} ocxObj 
         */
        getAllFile: function(ocxObj){
            var allfiles = ocxObj.GetAllFile();
            return allfiles.split("|");
        },
        /**
         * 删除全部
         * 
         * @param {any} ocxObj 
         */
        delALL: function(ocxObj){
            return ocxObj.DelImgAll();
        },
        /**
         * 删除某一页
         * 
         * @param {any} ocxObj 
         * @param {any} index 
         */
        delOne: function(ocxObj,index){
            return ocxObj.DelImgWithIndex(index || 1);
        },
        /**
         * 获取某一页
         * 
         * @param {any} ocxObj 
         */
        getOne: function(ocxObj,index){
            return ocxObj.GetImgWithIndex(index || 1);
        },
        /**
         * 重新扫描某一页
         * 
         * @param {any} ocxObj 
         */
        reScan: function(ocxObj,index){
            return ocxObj.ReScanWithIndex(index || 1);
        },
        /**
         * 获取总页数
         * 
         * @param {any} ocxObj 
         */
        getCount: function(ocxObj){
            return ocxObj.GetImgCount();
        },
        /**
         * 获取默认驱动名
         * 
         * @param {any} ocxObj 
         */
        getDefaultName: function(ocxObj){
            return ocxObj.GetDefaultName();
        }
    }
    return scanner;
});