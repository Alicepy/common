/**
 * 高速扫描仪ocx
 * @Author: caoyuanxing 
 * @Date: 2017-11-01 10:46:35 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-03-06 17:55:59
 **/
define(['common/utils/common_utils'],function(commonUtils){
	var m_models;
	var m_commonUtil;
	var m_pathList;	//需要上传的文件本地路径
	var m_callback;	//上传文件完成后的回调函数；成功返回m_retUrls，失败返回null
	var m_retUrls;	//上传文件成功后返回的rul路径
	var m_size; 	//-1 上传文件失败
	var m_id;
	 
	var joysailScan = {
		/**
		 * 初始化ocx控件
		 * @param eventScanEnd 扫描完成后的回调函数
		 */
	    init:function(Models, commonUtil, eventScanEnd) {
	    	m_models = Models;
	    	m_commonUtil = commonUtil;
	    	if(document.getElementById("scanOcx")){
				return;
			}
	    	
	    	var object = 
	    	'<OBJECT ID="scanOcx" style="MARGIN-LEFT:5px; WIDTH: 0%; HEIGHT:0%" CODEBASE= "common/ocx/joysail/JoySail.CAB#version=2,0,1,1" classid="CLSID:A7290394-9716-4AC2-9848-CB3D6CD28AB4" >'+
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
	    	$('#joysailScan').append(object);
	    	
	    	/* scanOcx.attachEvent("EventScanEnd", eventScanEnd); */
	    },
	    
	    /**
	     * 开始扫描
	     */
	    beginScan:function(){
	    	var path = "C:\\joysail";
			var fileNames = "scan";
	    	scanOcx.BeginScan(0, path, fileNames,1);
	    },
	    
	    /**
	     * 获取图片base64编码
	     * @param path 图片路径
	     */
	    getBase64:function(path){
	    	return scanOcx.GetBase64(path);
	    },
	    
	    /**
	     * 获取扫描仪是否有纸 0表示缺纸，1表示有纸
	     */
	    scanState:function(){
		   return scanOcx.ScannerState();
		},
	    
	    uploadData:function(){
	    	m_models.File.all('upload').post({
				"data": "data:image/jpeg;base64," + scanOcx.GetBase64(m_pathList[m_size])
				}).then(function(ret) {
					if(m_commonUtil.checkCode(ret.state)){
                        m_retUrls[m_size] = ret.data;
                        m_size = m_size + 1;
                        if(m_size == m_pathList.length){
                        	return;
                        }
                        
                        joysailScan.uploadData();
                    }else{
                    	m_size = -1;
                    }
				}, function(error){
					m_size = -1;
				});
	   },
	   /**
		 * @param doubleSide 设置双面扫描，0 表示双面扫描，1表示正面扫描 2 反面扫描
		 */
		setDoubleSide:function(doubleSide){
			scanOcx.DoubleSide = doubleSide;
		},
	    /**
	     * 本地文件文件上传
	     * @param pathList 本地路径数组
	     * @param callback(m_retUrls) 上传成功后的回调
	     */
	    upload:function(pathList, callback){
	    	if(0 == pathList.length){
	    		callback(null);
	    		return;
	    	}
	    	
	    	m_pathList = pathList;
	    	m_callback = callback;
	    	m_size = 0;
	    	m_retUrls = new Array();
	    	this.uploadData();
	    	
	    	m_id = setInterval(function(){
	    		if((0 <= m_size)&&(m_pathList.length>m_size)){
	    			//继续等待结果
	    			return;
	    		}else if(m_pathList.length == m_size){
					//执行成功
					clearInterval(m_id);
					callback(m_retUrls);
				}else if(0 > m_size){
					//执行失败
					clearInterval(m_id);
					callback(null);
				}
			},1000);
	    },
    };
    return joysailScan;
})
